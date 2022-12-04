import { createColumnHelper } from "@tanstack/react-table";

import { Checkbox } from "@encontrei/components/Checkbox";

export function tableSelectColumn<T>() {
  const columnHelper = createColumnHelper<T>();
  return columnHelper.display({
    id: "select",
    enableSorting: false,
    header: ({ table }) => (
      <div className="flex justify-center items-center">
        <Checkbox
          checked={table.getIsAllRowsSelected()}
          onCheckedChange={(e) => table.toggleAllRowsSelected(Boolean(e))}
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex justify-center items-center">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={row.getToggleSelectedHandler()}
        />
      </div>
    ),
  });
}
