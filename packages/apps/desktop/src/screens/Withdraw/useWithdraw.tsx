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
import type { InventoryWithdraw } from "@encontrei/shared-constants";
import { getPublicUrl } from "@encontrei/shared-utils";
import { downloadCSV } from "@encontrei/utils/downloadCSV";
import { getItems } from "@encontrei/utils/getItems";
import { tableSelectColumn } from "@encontrei/utils/tableSelectColumn";

const columnHelper = createColumnHelper<InventoryWithdraw>();
const columns = [
  tableSelectColumn<InventoryWithdraw>(),
  columnHelper.accessor("inventory.name", {
    header: "Nome",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("inventory.description", {
    header: "Descrição",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("inventory.category", {
    header: () => "Categoria",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("inventory.local", {
    header: () => "Local",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("requestedAt", {
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
  columnHelper.accessor("inventory.photoFilename", {
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

export function useWithdraw() {
  const inventoryWithdrawQuery =
    getItems<InventoryWithdraw>("inventoryWithdraw");
  const { response, error, isLoading, mutate } = useFetch(
    inventoryWithdrawQuery
  );
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
      name: row.inventory.name,
      description: row.inventory.description,
      category: row.inventory.category,
      local: row.inventory.local,
      photoFilename: row.inventory.photoFilename,
      userId: row.user.id,
    }));

    const selectedRowsInventoryIds = selectedRows.map(
      (row) => row.inventory.id
    );

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
        const addAcceptedItemsToWithdrawAccepted = supabase
          .from("inventoryWithdrawAccepted")
          .insert(inventoryWithdrawAcceptedItems)
          .throwOnError();

        const removeAllItemsFromWithdraw = supabase
          .from("inventoryWithdraw")
          .delete()
          .in("inventoryId", selectedRowsInventoryIds)
          .throwOnError();

        const removeAllItemsFromInventory = supabase
          .from("inventory")
          .delete()
          .in("id", selectedRowsInventoryIds)
          .throwOnError();

        await addAcceptedItemsToWithdrawAccepted;
        await removeAllItemsFromWithdraw;
        await removeAllItemsFromInventory;
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
      name: row.inventory.name,
      description: row.inventory.description,
      category: row.inventory.category,
      local: row.inventory.local,
      photoFilename: row.inventory.photoFilename,
      userId: row.user.id,
    }));

    const selectedRowsInventoryIds = selectedRows.map(
      (row) => row.inventory.id
    );

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
        const addRefusedItemsToWithdrawRefused = supabase
          .from("inventoryWithdrawRefused")
          .insert(inventoryWithdrawAcceptedItems)
          .throwOnError();

        const removeAllItemsFromWithdraw = supabase
          .from("inventoryWithdraw")
          .delete()
          .in("inventoryId", selectedRowsInventoryIds)
          .throwOnError();
        await addRefusedItemsToWithdrawRefused;
        await removeAllItemsFromWithdraw;
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
        response.data.map(({ inventory, requestedAt, user }) => ({
          Nome: inventory.name,
          Descrição: inventory.description,
          Categoria: inventory.category,
          Local: inventory.local,
          Data: new Date(requestedAt).toLocaleString("pt-BR", {
            dateStyle: "short",
            timeStyle: "short",
          }),
          Foto: getPublicUrl(supabase, inventory.photoFilename),
          Usuário: user.name,
          "E-mail": user.email,
        })),
        "solicitados"
      );
    }
  }, [response]);

  return {
    response,
    error,
    isLoading,
    mutate,
    table,
    handleAcceptItem,
    handleRefuseItem,
    handleDownload,
  };
}
