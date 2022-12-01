import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

import {
  createColumnHelper,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import type { InventoryWithdrawAccepted } from "@encontrei/@types/InventoryWithdrawAccepted";
import { ImagePreview } from "@encontrei/components/ImagePreview";
import { downloadCSV } from "@encontrei/utils/downloadCSV";
import { getItems } from "@encontrei/utils/getItems";
import { getPublicUrl } from "@encontrei/utils/getPublicUrl";

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
        src={getPublicUrl(info.getValue())}
        name={info.getValue()}
      />
    ),
  }),
];

type Items = InventoryWithdrawAccepted[] | null;

export function useDelivered() {
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
    getItems("inventoryWithdrawAccepted")
      .then((data) => setItems(data as Items))
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
          Foto: getPublicUrl(inventory.photoFilename),
          Usuário: user.name,
          "E-mail": user.email,
        })),
        "entregues"
      );
    }
  }, [items]);

  return {
    items,
    setItems,
    table,
    handleDownload,
  };
}
