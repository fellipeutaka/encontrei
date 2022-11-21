import { InputHTMLAttributes, forwardRef, HTMLAttributes } from "react";

import { twMerge } from "tailwind-merge";

interface IRootProps extends HTMLAttributes<HTMLDivElement> {}

export function Root(props: IRootProps) {
  return (
    <div
      {...props}
      className={twMerge(
        "flex items-center gap-2 dark:bg-zinc-700 bg-zinc-300 dark:text-white py-3 px-4 rounded h-12 transition outline-none select-none ring-2 ring-transparent aria-[invalid='true']:ring-red-600 aria-[invalid]:focus-within:ring-violet-600 focus-within:ring-violet-600",
        props.className
      )}
    >
      {props.children}
    </div>
  );
}

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const Input = forwardRef<HTMLInputElement, IInputProps>((props, ref) => {
  return (
    <input
      ref={ref}
      {...props}
      className={twMerge(
        "flex-1 bg-transparent max-w-full outline-none",
        props.className
      )}
    />
  );
});
