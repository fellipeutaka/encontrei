import { useEffect, useState, useCallback } from "react";
import { BsDownload, BsArrowUp } from "react-icons/bs";
import { toast } from "react-toastify";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { clsx } from "clsx";
import { Reorder, motion } from "framer-motion";

import type { InventoryWithdrawAccepted } from "@encontrei/@types/InventoryWithdrawAccepted";
import { Button } from "@encontrei/components/Button";
import { Arrow } from "@encontrei/components/Icons/Arrow";
import { ImagePreview } from "@encontrei/components/ImagePreview";
import { SpinnerLoader } from "@encontrei/components/SpinnerLoader";
import { downloadCSV } from "@encontrei/utils/downloadCSV";
import { getItems } from "@encontrei/utils/getItems";
import { getPublicUrl } from "@encontrei/utils/getPublicUrl";

async function fetchItems() {
  const data = await getItems<InventoryWithdrawAccepted>(
    "inventoryWithdrawAccepted",
    `
  *,
  user:userId ( email, raw_user_meta_data->name )
`
  );

  return data;
}

const columnHelper = createColumnHelper<InventoryWithdrawAccepted>();
const columns = [
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
  columnHelper.accessor("acceptedAt", {
    header: () => "Data",
    cell: (info) =>
      new Date(info.getValue()).toLocaleString("pt-BR", {
        dateStyle: "short",
        timeStyle: "short",
      }),
  }),
  columnHelper.accessor("user.name", {
    header: () => "Usuário",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("user.email", {
    header: () => "E-mail",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("photoFilename", {
    enableSorting: false,
    header: () => "Foto",
    cell: (info) => (
      <ImagePreview
        src={getPublicUrl("inventoryWithdrawAccepted/" + info.getValue())}
        name={info.getValue()}
      />
    ),
  }),
];

const BsArrowDown = motion(Arrow);

export function Delivered() {
  const [items, setItems] = useState<InventoryWithdrawAccepted[] | null>(null);
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

  const handleDownload = useCallback(() => {
    if (items) {
      downloadCSV(
        items.map(({ user, ...inventory }) => ({
          Nome: inventory.name,
          Descrição: inventory.description,
          Categoria: inventory.category,
          Local: inventory.local,
          Data: new Date(inventory.acceptedAt).toLocaleString("pt-BR", {
            dateStyle: "short",
            timeStyle: "short",
          }),
          Foto: getPublicUrl("inventory/" + inventory.photoFilename),
          Usuário: user.name,
          "E-mail": user.email,
        })),
        "entregues"
      );
    }
  }, [items]);

  return (
    <main className="flex flex-col justify-center items-center h-screen">
      <header className="flex min-w-[64rem] w-full max-w-7xl justify-between items-center opacity-0 animate-fade">
        <h1 className="text-6xl font-semibold">Entregues</h1>
        <div className="flex items-center gap-2">
          <Button
            className="bg-green-600 hover:bg-green-700 focus-visible:ring-green-600 h-11"
            disabled={items?.length === 0}
            onClick={handleDownload}
          >
            <BsDownload />
            <span>Download</span>
          </Button>
        </div>
      </header>
      {!items ? (
        <SpinnerLoader size={48} />
      ) : items.length === 0 ? (
        <motion.div
          className="min-w-[64rem] w-full max-w-7xl animate-fade"
          animate={{ y: 64 }}
        >
          <span className="text-2xl font-semibold">
            Não há nenhum item entregue
          </span>
        </motion.div>
      ) : (
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
                      className={clsx(
                        "border border-zinc-600 dark:bg-zinc-800 bg-zinc-400 transition duration-300",
                        {
                          "h-[4.5rem] w-16": cell.column.id === "photoFilename",
                        },
                        {
                          "p-2 min-w-[64px] max-w-md":
                            cell.column.id !== "photoFilename",
                        }
                      )}
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
      )}
    </main>
  );
}
