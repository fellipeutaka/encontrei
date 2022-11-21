import { useEffect, useState, useCallback } from "react";
import { BsTrash, BsDownload, BsArrowUp } from "react-icons/bs";
import { toast } from "react-toastify";

import type { SupabaseRealtimePayload } from "@supabase/supabase-js";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Reorder, motion } from "framer-motion";

import type { Inventory as IInventory } from "@encontrei/@types/Inventory";
import { Button } from "@encontrei/components/Button";
import { Checkbox } from "@encontrei/components/Checkbox";
import { CreateItemDialog } from "@encontrei/components/CreateItemDialog";
import { Arrow } from "@encontrei/components/Icons/Arrow";
import { ImagePreview } from "@encontrei/components/ImagePreview";
import { SpinnerLoader } from "@encontrei/components/SpinnerLoader";
import { supabase } from "@encontrei/lib/supabase";
import { downloadCSV } from "@encontrei/utils/downloadCSV";
import { getItems } from "@encontrei/utils/getItems";
import { getPublicUrl } from "@encontrei/utils/getPublicUrl";

type RealtimePayload = SupabaseRealtimePayload<IInventory>;

async function fetchItems() {
  return await getItems<IInventory>("inventory");
}

const columnHelper = createColumnHelper<IInventory>();
const columns = [
  columnHelper.display({
    id: "select",
    enableSorting: false,
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllRowsSelected()}
        onCheckedChange={(e) => table.toggleAllRowsSelected(Boolean(e))}
        className="mx-auto"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={row.getToggleSelectedHandler()}
        className="mx-auto"
      />
    ),
  }),
  columnHelper.accessor("name", {
    header: "Nome",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("description", {
    header: "Descrição",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("category", {
    header: () => "Categoria",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("local", {
    header: () => "Local",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("includedAt", {
    header: () => "Data",
    cell: (info) =>
      new Date(info.getValue()).toLocaleString("pt-BR", {
        dateStyle: "short",
        timeStyle: "short",
      }),
  }),
  columnHelper.accessor("photoFilename", {
    enableSorting: false,
    header: () => "Foto",
    cell: (info) => (
      <ImagePreview
        src={getPublicUrl("inventory/" + info.getValue())}
        name={info.getValue()}
      />
    ),
  }),
];

const BsArrowDown = motion(Arrow);

export function Inventory() {
  const [items, setItems] = useState<IInventory[] | null>(null);
  const [rowSelection, setRowSelection] = useState({});
  const table = useReactTable({
    data: items ?? [],
    columns,
    state: {
      rowSelection,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  useEffect(() => {
    fetchItems()
      .then((data) => setItems(data))
      .catch((err) => {
        console.error(err);
        toast.error("Ocorreu um erro ao buscar os itens");
      });
  }, []);

  const realtimeOnInsert = useCallback((payload: RealtimePayload) => {
    setItems((state) => (state ? [...state, payload.new] : state));
  }, []);

  const realtimeOnDelete = useCallback((payload: RealtimePayload) => {
    setItems((state) =>
      state ? state.filter((item) => item.id !== payload.old.id) : state
    );
  }, []);

  useEffect(() => {
    const subscription = supabase
      .from("inventory")
      .on("INSERT", realtimeOnInsert)
      .on("DELETE", realtimeOnDelete)
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleDeleteItem = useCallback(async () => {
    const selectedRows = table
      .getSelectedRowModel()
      .flatRows.map((row) => row.original);
    const selectedRowsIds = selectedRows.map((row) => row.id);
    try {
      const messageBoxMessage =
        selectedRows.length > 1
          ? "Você realmente deseja excluir esses itens?"
          : "Você realmente deseja excluir esse item?";
      const response = await window.Main.showMessageBox({
        options: {
          buttons: ["Não", "Sim"],
          title: "Encontrei",
          message: messageBoxMessage,
        },
      });
      if (response === 1) {
        const deleteAllWithdrawRequests = supabase
          .from("inventoryWithdraw")
          .delete()
          .in("inventoryId", selectedRowsIds)
          .throwOnError();

        const deleteAllItemsInInventory = supabase
          .from("inventory")
          .delete()
          .in("id", selectedRowsIds)
          .throwOnError();

        const deleteAllItemsPhotoInInventory = supabase.storage
          .from("item-photo")
          .remove(selectedRows.map((row) => `inventory/${row.photoFilename}`));

        await Promise.all([
          deleteAllWithdrawRequests,
          deleteAllItemsInInventory,
          deleteAllItemsPhotoInInventory,
        ]);
        setRowSelection({});
        toast.success("Item excluído com sucesso");
      }
    } catch (err) {
      console.error(err);
      toast.error("Ocorreu um erro ao excluir o item do inventário");
    }
  }, []);

  const handleDownload = useCallback(() => {
    if (items) {
      downloadCSV(
        items.map((item) => ({
          Nome: item.name,
          Descrição: item.description,
          Categoria: item.category,
          Local: item.local,
          Data: new Date(item.includedAt).toLocaleString("pt-BR", {
            dateStyle: "short",
            timeStyle: "short",
          }),
          Foto: getPublicUrl("inventory/" + item.photoFilename),
        })),
        "inventario"
      );
    }
  }, [items]);

  return (
    <main className="flex flex-col justify-center items-center h-screen">
      <header className="flex min-w-[64rem] w-full max-w-7xl justify-between items-center opacity-0 animate-fade">
        <h1 className="text-6xl font-semibold">Inventário</h1>
        <div className="flex items-center gap-2">
          <Button
            className="bg-green-600 hover:bg-green-700 focus-visible:ring-green-600 h-11"
            disabled={items?.length === 0}
            onClick={handleDownload}
          >
            <BsDownload />
            <span>Download</span>
          </Button>
          <CreateItemDialog />
          <Button
            className="bg-red-600 hover:bg-red-700 focus-visible:ring-red-800 h-11"
            disabled={table.getSelectedRowModel().flatRows.length === 0}
            onClick={handleDeleteItem}
          >
            Excluir
            <BsTrash />
          </Button>
        </div>
      </header>
      {items ? (
        <motion.div
          className="min-w-[64rem] w-full max-w-7xl overflow-y-scroll overflow-x-hidden animate-fade"
          animate={{ y: 64 }}
        >
          <Reorder.Group
            as="table"
            className="rounded-xl min-w-[64rem] w-full max-w-7xl border border-transparent overflow-hidden"
            values={items}
            onReorder={setItems}
          >
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      colSpan={header.colSpan}
                      className="border border-zinc-600 dark:bg-zinc-700 bg-zinc-200 transition duration-300 select-none"
                    >
                      {header.column.getCanSort() ? (
                        <button
                          className="flex w-full justify-between items-center text-left p-2 outline-none focus-visible:ring-2 ring-violet-600"
                          type="button"
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {{
                            asc: (
                              <BsArrowUp className="w-4 h-4 ml-2 inline-block opacity-0 animate-fade" />
                            ),
                            desc: (
                              <BsArrowDown
                                animate={{
                                  rotate: 180,
                                  transition: { ease: "linear" },
                                }}
                                className="w-4 h-4 ml-2 inline-block"
                              />
                            ),
                          }[header.column.getIsSorted() as string] ?? (
                            <BsArrowDown
                              initial={{ opacity: 0 }}
                              animate={{
                                rotate: 180,
                                opacity: 0,
                                transition: { ease: "linear" },
                              }}
                              className="w-4 h-4 ml-2 inline-block"
                            />
                          )}
                        </button>
                      ) : (
                        flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <Reorder.Item as="tr" value={row} key={row.id} drag={false}>
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="border border-zinc-600 dark:bg-zinc-800 bg-zinc-400 p-2 min-w-[64px] max-w-md transition duration-300"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </Reorder.Item>
              ))}
            </tbody>
          </Reorder.Group>
        </motion.div>
      ) : (
        <SpinnerLoader size={48} />
      )}
    </main>
  );
}
