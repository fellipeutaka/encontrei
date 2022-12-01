import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

import {
  createColumnHelper,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import type { Inventory } from "@encontrei/@types/Inventory";
import type { InventoryWithdraw } from "@encontrei/@types/InventoryWithdraw";
import type { User } from "@encontrei/@types/User";
import { Checkbox } from "@encontrei/components/Checkbox";
import { ImagePreview } from "@encontrei/components/ImagePreview";
import { supabase } from "@encontrei/lib/supabase";
import { downloadCSV } from "@encontrei/utils/downloadCSV";
import { getItems } from "@encontrei/utils/getItems";
import { getPublicUrl } from "@encontrei/utils/getPublicUrl";

type Items = InventoryWithdraw[] | null;

export function useWithdraw() {
  const columnHelper = createColumnHelper<InventoryWithdraw>();
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
    getItems("inventoryWithdraw")
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
        const userResponse = await supabase
          .from<User>("users")
          .select("id, email, raw_user_meta_data->name")
          .match({ id: payload.new.userId });
        const inventoryResponse = await supabase
          .from<Inventory>("inventory")
          .select()
          .match({ id: payload.new.inventoryId });

        if (userResponse.error || inventoryResponse.error) {
          return console.error(userResponse.error, inventoryResponse.error);
        }

        const newItem = {
          id: payload.new.id,
          inventory: inventoryResponse.data[0],
          user: userResponse.data[0],
          requestedAt: payload.new.requestedAt,
        };

        setItems((state) => (state ? [...state, newItem] : state));
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
      const response = await window.Main.showMessageBox({
        options: {
          buttons: ["Não", "Sim"],
          title: "Encontrei",
          message: messageBoxMessage,
        },
      });
      if (response === 1) {
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

        await Promise.all([
          addAcceptedItemsToWithdrawAccepted,
          removeAllItemsFromWithdraw,
          removeAllItemsFromInventory,
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
      const response = await window.Main.showMessageBox({
        options: {
          buttons: ["Não", "Sim"],
          title: "Encontrei",
          message: messageBoxMessage,
        },
      });
      if (response === 1) {
        const addRefusedItemsToWithdrawRefused = supabase
          .from("inventoryWithdrawAccepted")
          .insert(inventoryWithdrawAcceptedItems)
          .throwOnError();

        const removeAllItemsFromWithdraw = supabase
          .from("inventoryWithdraw")
          .delete()
          .in("inventoryId", selectedRowsInventoryIds)
          .throwOnError();

        await Promise.all([
          addRefusedItemsToWithdrawRefused,
          removeAllItemsFromWithdraw,
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
        items.map(({ inventory, requestedAt, user }) => ({
          Nome: inventory.name,
          Descrição: inventory.description,
          Categoria: inventory.category,
          Local: inventory.local,
          Data: new Date(requestedAt).toLocaleString("pt-BR", {
            dateStyle: "short",
            timeStyle: "short",
          }),
          Foto: getPublicUrl(inventory.photoFilename),
          Usuário: user.name,
          "E-mail": user.email,
        })),
        "solicitados"
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
