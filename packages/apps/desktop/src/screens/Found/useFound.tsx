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
import type { InventoryFound } from "@encontrei/shared-constants";
import { getPublicUrl } from "@encontrei/shared-utils";
import { downloadCSV } from "@encontrei/utils/downloadCSV";
import { getItems } from "@encontrei/utils/getItems";
import { tableSelectColumn } from "@encontrei/utils/tableSelectColumn";

const columnHelper = createColumnHelper<InventoryFound>();
const columns = [
  tableSelectColumn<InventoryFound>(),
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
  columnHelper.accessor("foundAt", {
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
        src={getPublicUrl(supabase, info.getValue())}
        name={info.getValue()}
      />
    ),
  }),
];

export function useFound() {
  const inventoryQuery = getItems<InventoryFound>("inventoryFound");
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

  const handleAcceptItem = useCallback(async () => {
    const selectedRows = table
      .getSelectedRowModel()
      .flatRows.map((row) => row.original);

    const inventoryWithdrawAcceptedItems = selectedRows.map((row) => ({
      name: row.name,
      description: row.description,
      category: row.category,
      local: row.local,
      photoFilename: row.photoFilename,
    }));

    const selectedRowsIds = selectedRows.map((row) => row.id);

    try {
      const messageBoxMessage =
        selectedRows.length > 1
          ? "Você realmente deseja aceitar esses itens?"
          : "Você realmente deseja aceitar esse item?";
      const messageBoxResponse = await window.Main.showMessageBox({
        options: {
          buttons: ["Não", "Sim"],
          title: "Encontrei",
          message: messageBoxMessage,
        },
      });
      if (messageBoxResponse === 1) {
        const addAcceptedItemsToInventory = supabase
          .from("inventory")
          .insert(inventoryWithdrawAcceptedItems)
          .throwOnError();

        const removeAllItemsFromFound = supabase
          .from("inventoryFound")
          .delete()
          .in("id", selectedRowsIds)
          .throwOnError();
        await addAcceptedItemsToInventory;
        await removeAllItemsFromFound;
        await mutate(response);
        setRowSelection({});
        toast.success("Solicitação aceita com sucesso");
      }
    } catch (err) {
      toast.error("Ocorreu um erro ao aceitar a solicitação");
      console.error(err);
    }
  }, []);

  const handleRefuseItem = useCallback(async () => {
    const selectedRows = table
      .getSelectedRowModel()
      .flatRows.map((row) => row.original);

    const inventoryWithdrawAcceptedItems = selectedRows.map((row) => ({
      name: row.name,
      description: row.description,
      category: row.category,
      local: row.local,
      photoFilename: row.photoFilename,
    }));

    const selectedRowsIds = selectedRows.map((row) => row.id);

    try {
      const messageBoxMessage =
        selectedRows.length > 1
          ? "Você realmente deseja recusar esses itens?"
          : "Você realmente deseja recusar esse item?";
      const messageBoxResponse = await window.Main.showMessageBox({
        options: {
          buttons: ["Não", "Sim"],
          title: "Encontrei",
          message: messageBoxMessage,
        },
      });
      if (messageBoxResponse === 1) {
        const removeAllItemsFromFound = supabase
          .from("inventoryFound")
          .delete()
          .in("id", selectedRowsIds)
          .throwOnError();

        const removeAllItemsPhotoFromFound = supabase.storage
          .from("item-photo")
          .remove(
            inventoryWithdrawAcceptedItems.map((item) => item.photoFilename)
          );
        await removeAllItemsFromFound;
        await removeAllItemsPhotoFromFound;
        await mutate(response);

        toast.success("Solicitação recusada com sucesso");
      }
    } catch (err) {
      toast.error("Ocorreu um erro ao recusar a solicitação");
      console.error(err);
    }
  }, []);

  const handleDownload = useCallback(() => {
    if (response) {
      downloadCSV(
        response.data.map(({ user, ...inventory }) => ({
          Nome: inventory.name,
          Descrição: inventory.description,
          Categoria: inventory.category,
          Local: inventory.local,
          Data: new Date(inventory.foundAt).toLocaleString("pt-BR", {
            dateStyle: "short",
            timeStyle: "short",
          }),
          Foto: getPublicUrl(supabase, inventory.photoFilename),
          Usuário: user.name,
          "E-mail": user.email,
        })),
        "encontrados"
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
    handleAcceptItem,
    handleRefuseItem,
    handleDownload,
  };
}
