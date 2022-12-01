import { BsArrowUp } from "react-icons/bs";

import { flexRender, Table as ITable } from "@tanstack/react-table";
import clsx from "clsx";
import { motion, Reorder } from "framer-motion";

import { Arrow } from "@encontrei/components/Icons/Arrow";

type TableProps<T> = {
  table: ITable<T>;
  items: T[];
  setItems: React.Dispatch<React.SetStateAction<T[] | null>>;
};

const BsArrowDown = motion(Arrow);

export function Table<T>({ table, items, setItems }: TableProps<T>) {
  return (
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
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </Reorder.Item>
          ))}
        </tbody>
      </Reorder.Group>
    </motion.div>
  );
}
