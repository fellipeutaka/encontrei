import { forwardRef } from "react";
import {
  MdOutlineCheck,
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";

import * as SelectPrimitive from "@radix-ui/react-select";
import { twMerge } from "tailwind-merge";

type SelectProps = {
  rootProps: SelectPrimitive.SelectProps;
  triggerProps: SelectPrimitive.SelectTriggerProps;
  placeholder: string;
  items: string[];
}

export const Select = forwardRef<HTMLButtonElement, SelectProps>(
  ({ rootProps, triggerProps, placeholder, items }, ref) => (
    <SelectPrimitive.Root {...rootProps}>
      <SelectPrimitive.Trigger
        {...triggerProps}
        className={twMerge(
          "flex justify-between items-center py-3 px-4 h-11 outline-none bg-zinc-300 dark:bg-zinc-700 focus:ring-2 aria-[invalid='true']:ring-red-600 focus:ring-violet-600 aria-[invalid='true']:focus:ring-violet-600 aria-[invalid='true']:ring-2 rounded transition",
          triggerProps.className
        )}
        ref={ref}
      >
        <SelectPrimitive.Value
          placeholder={<span className="text-gray-400">{placeholder}</span>}
        />
        <SelectPrimitive.Icon className="text-gray-400">
          <MdOutlineKeyboardArrowDown size={24} />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>
      <SelectPrimitive.Portal>
        <SelectPrimitive.Content className="bg-zinc-300 dark:bg-zinc-800 rounded-md overflow-hidden shadow-lg">
          <SelectPrimitive.ScrollUpButton className="flex justify-center items-center h-6">
            <MdOutlineKeyboardArrowUp />
          </SelectPrimitive.ScrollUpButton>
          <SelectPrimitive.Viewport className="p-2">
            {items.map((item) => (
              <SelectPrimitive.Item
                key={item}
                value={item}
                className="text-sm rounded relative flex items-center h-6 px-6 text-zinc-900 dark:text-zinc-100 select-none outline-none data-[highlighted]:bg-violet-600 transition"
              >
                <SelectPrimitive.ItemText>{item}</SelectPrimitive.ItemText>
                <SelectPrimitive.ItemIndicator className="absolute left-0 w-6 flex justify-center items-center">
                  <MdOutlineCheck />
                </SelectPrimitive.ItemIndicator>
              </SelectPrimitive.Item>
            ))}
          </SelectPrimitive.Viewport>
          <SelectPrimitive.ScrollDownButton className="flex justify-center items-center h-6">
            <MdOutlineKeyboardArrowDown />
          </SelectPrimitive.ScrollDownButton>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  )
);
