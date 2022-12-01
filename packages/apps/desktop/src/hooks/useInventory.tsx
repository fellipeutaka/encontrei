import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

import {
  createColumnHelper,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import type { Inventory } from "@encontrei/@types/Inventory";
import { Checkbox } from "@encontrei/components/Checkbox";
import { ImagePreview } from "@encontrei/components/ImagePreview";
import { supabase } from "@encontrei/lib/supabase";
import { downloadCSV } from "@encontrei/utils/downloadCSV";
import { getItems } from "@encontrei/utils/getItems";
import { getPublicUrl } from "@encontrei/utils/getPublicUrl";

type Items = Inventory[] | null;

export function useInventory() {
  const columnHelper = createColumnHelper<Inventory>();
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
          src={getPublicUrl(info.getValue())}
          name={info.getValue()}
        />
      ),
    }),
  ];

  const [items, setItems] = useState<Items>(null);
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
    getItems("inventory")
      .then((data) => setItems(data as Items))
      .catch((err) => {
        console.error(err);
        toast.error("Ocorreu um erro ao buscar os itens");
      });
  }, []);

  useEffect(() => {
    const subscription = supabase
      .from("inventory")
      .on("INSERT", async (payload) => {
        setItems((state) => (state ? [...state, payload.new] : state));
      })
      .on("DELETE", async (payload) => {
        setItems((state) =>
          state ? state.filter((item) => item.id !== payload.old.id) : state
        );
      })
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
          .remove(selectedRows.map((row) => row.photoFilename));

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
          Foto: getPublicUrl(item.photoFilename),
        })),
        "inventario"
      );
    }
  }, [items]);

  return {
    items,
    setItems,
    table,
    handleDeleteItem,
    handleDownload,
  };
}
