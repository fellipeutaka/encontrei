import { ButtonHTMLAttributes, forwardRef } from "react";
import { AiOutlineLoading } from "react-icons/ai";

import { twMerge } from "tailwind-merge";

export type ButtonProps = {
  isLoading?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ isLoading, ...props }, ref) => {
    return (
      <button
        {...props}
        disabled={isLoading || props.disabled}
        ref={ref}
        className={twMerge(
          "flex justify-center items-center bg-violet-600 text-white font-semibold py-4 px-3 gap-2 rounded outline-none ring-2 ring-transparent transition hover:bg-violet-700 focus-visible:ring-violet-700 disabled:opacity-30 disabled:cursor-not-allowed",
          props.className
        )}
      >
        {isLoading ? (
          <AiOutlineLoading size={20} className="animate-spin" />
        ) : (
          props.children
        )}
      </button>
    );
  }
);
