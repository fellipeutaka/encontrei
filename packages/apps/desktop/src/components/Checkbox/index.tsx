import { AiOutlineCheck } from "react-icons/ai";

import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { twMerge } from "tailwind-merge";

export function Checkbox(props: CheckboxPrimitive.CheckboxProps) {
  return (
    <CheckboxPrimitive.Root
      {...props}
      className={twMerge(
        "flex items-center justify-center w-5 h-5 dark:bg-zinc-900 bg-white border border-zinc-400 dark:border-transparent ring-violet-600 outline-none rounded transition duration-300 hover:opacity-70 focus-visible:ring-2",
        props.className
      )}
      aria-label={props.checked ? "Checked" : "Unchecked"}
    >
      <CheckboxPrimitive.Indicator className="text-violet-600">
        <AiOutlineCheck size={16} />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}
