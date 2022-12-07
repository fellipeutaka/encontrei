import { useCallback, useState } from "react";
import { toast } from "react-toastify";

import {
  createColumnHelper,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { ImagePreview } from "@encontrei/components/ImagePreview";
import { useFetch } from "@encontrei/hooks/useFetch";
import { supabase } from "@encontrei/lib/supabase";
import type { Inventory } from "@encontrei/shared-constants";
import { getPublicUrl } from "@encontrei/shared-utils";
import { downloadCSV } from "@encontrei/utils/downloadCSV";
import { getItems } from "@encontrei/utils/getItems";
import { tableSelectColumn } from "@encontrei/utils/tableSelectColumn";

const columnHelper = createColumnHelper<Inventory>();
const columns = [
  tableSelectColumn<Inventory>(),
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
        src={getPublicUrl(supabase, info.getValue())}
        name={info.getValue()}
      />
    ),
  }),
];

export function useInventory() {
  const inventoryQuery = getItems<Inventory>("inventory");
  const { response, error, isLoading, mutate } = useFetch(inventoryQuery);
  const [rowSelection, setRowSelection] = useState({});
  const table = useReactTable({
    data: response?.data ?? [],
    columns,
    state: {
      rowSelection,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

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
      const messageBoxResponse = await window.Main.showMessageBox({
        options: {
          buttons: ["Não", "Sim"],
          title: "Encontrei",
          message: messageBoxMessage,
        },
      });
      if (messageBoxResponse === 1) {
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
        await deleteAllWithdrawRequests;
        await deleteAllItemsInInventory;
        await deleteAllItemsPhotoInInventory;
        await mutate(response);
        setRowSelection({});
        toast.success("Item excluído com sucesso");
      }
    } catch (err) {
      console.error(err);
      toast.error("Ocorreu um erro ao excluir o item do inventário");
    }
  }, []);

  const handleDownload = useCallback(() => {
    if (response) {
      downloadCSV(
        response.data.map((item) => ({
          Nome: item.name,
          Descrição: item.description,
          Categoria: item.category,
          Local: item.local,
          Data: new Date(item.includedAt).toLocaleString("pt-BR", {
            dateStyle: "short",
            timeStyle: "short",
          }),
          Foto: getPublicUrl(supabase, item.photoFilename),
        })),
        "inventario"
      );
    }
  }, [response]);

  if (error) {
    toast.error(error.message);
  }

  return {
    response,
    isLoading,
    mutate,
    table,
    handleDeleteItem,
    handleDownload,
  };
}
