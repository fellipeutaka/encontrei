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
import type { InventoryWithdrawAccepted } from "@encontrei/shared-constants";
import { getPublicUrl } from "@encontrei/shared-utils";
import { downloadCSV } from "@encontrei/utils/downloadCSV";
import { getItems } from "@encontrei/utils/getItems";

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
        src={getPublicUrl(supabase, info.getValue())}
        name={info.getValue()}
      />
    ),
  }),
];

export function useDelivered() {
  const inventoryQuery = getItems<InventoryWithdrawAccepted>(
    "inventoryWithdrawAccepted"
  );
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

  const handleDownload = useCallback(() => {
    if (response) {
      downloadCSV(
        response.data.map(({ user, ...inventory }) => ({
          Nome: inventory.name,
          Descrição: inventory.description,
          Categoria: inventory.category,
          Local: inventory.local,
          Data: new Date(inventory.acceptedAt).toLocaleString("pt-BR", {
            dateStyle: "short",
            timeStyle: "short",
          }),
          Foto: getPublicUrl(supabase, inventory.photoFilename),
          Usuário: user.name,
          "E-mail": user.email,
        })),
        "entregues"
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
    handleDownload,
  };
}
