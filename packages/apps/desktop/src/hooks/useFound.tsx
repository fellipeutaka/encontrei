import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

import {
  createColumnHelper,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import type { InventoryFound } from "@encontrei/@types/InventoryFound";
import { Checkbox } from "@encontrei/components/Checkbox";
import { ImagePreview } from "@encontrei/components/ImagePreview";
import { supabase } from "@encontrei/lib/supabase";
import { downloadCSV } from "@encontrei/utils/downloadCSV";
import { getItems } from "@encontrei/utils/getItems";
import { getPublicUrl } from "@encontrei/utils/getPublicUrl";

const columnHelper = createColumnHelper<InventoryFound>();
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
        src={getPublicUrl(info.getValue())}
        name={info.getValue()}
      />
    ),
  }),
];

type Items = InventoryFound[] | null;

export function useFound() {
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
    getItems("inventoryFound")
      .then((data) => setItems(data as Items))
      .catch((err) => {
        console.error(err);
        toast.error("Ocorreu um erro ao buscar os itens");
      });
  }, []);

  useEffect(() => {
    const subscription = supabase
      .from<InventoryFound>("inventoryFound")
      .on("INSERT", async (payload) => {
        try {
          const { data } = await supabase
            .from("users")
            .select("email, raw_user_meta_data->name")
            .match({ id: payload.new.userId })
            .throwOnError();
          if (data) {
            setItems((state) => {
              const newItem = {
                ...payload.new,
                user: data[0],
              };
              return state ? [...state, newItem] : state;
            });
          }
        } catch (err) {
          console.error(err);
        }
      })
      .on("DELETE", (payload) => {
        setItems((state) =>
          state ? state.filter((item) => item.id !== payload.old.id) : state
        );
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

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
      const response = await window.Main.showMessageBox({
        options: {
          buttons: ["Não", "Sim"],
          title: "Encontrei",
          message: messageBoxMessage,
        },
      });
      if (response === 1) {
        const addAcceptedItemsToInventory = supabase
          .from("inventory")
          .insert(inventoryWithdrawAcceptedItems)
          .throwOnError();

        const removeAllItemsFromFound = supabase
          .from("inventoryFound")
          .delete()
          .in("id", selectedRowsIds)
          .throwOnError();

        await Promise.all([
          addAcceptedItemsToInventory,
          removeAllItemsFromFound,
        ]);
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
      const response = await window.Main.showMessageBox({
        options: {
          buttons: ["Não", "Sim"],
          title: "Encontrei",
          message: messageBoxMessage,
        },
      });
      if (response === 1) {
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

        await Promise.all([
          removeAllItemsFromFound,
          removeAllItemsPhotoFromFound,
        ]);

        toast.success("Solicitação recusada com sucesso");
      }
    } catch (err) {
      toast.error("Ocorreu um erro ao recusar a solicitação");
      console.error(err);
    }
  }, []);

  const handleDownload = useCallback(() => {
    if (items) {
      downloadCSV(
        items.map(({ user, ...inventory }) => ({
          Nome: inventory.name,
          Descrição: inventory.description,
          Categoria: inventory.category,
          Local: inventory.local,
          Data: new Date(inventory.foundAt).toLocaleString("pt-BR", {
            dateStyle: "short",
            timeStyle: "short",
          }),
          Foto: getPublicUrl(inventory.photoFilename),
          Usuário: user.name,
          "E-mail": user.email,
        })),
        "encontrados"
      );
    }
  }, [items]);

  return {
    items,
    setItems,
    table,
    handleAcceptItem,
    handleRefuseItem,
    handleDownload,
  };
}
