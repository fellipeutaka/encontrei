import type { HTMLAttributes, ReactNode } from "react";
interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
  content: number;
  max?: number;
}

export function Badge(props: BadgeProps) {
  if (props.content < 1) {
    return <>{props.children}</>;
  }

  return (
    <span
      className="relative inline-flex align-middle flex-shrink-0"
      {...props}
    >
      {props.children}
      <span className="flex justify-center items-center absolute top-0 right-0 min-w-[16px] min-h-[16px] text-xs font-medium py-0.5 px-1.5 rounded-3xl translate-x-4 -translate-y-4 text-white bg-violet-600 z-10 select-none">
        {props.max && props.content > props.max
          ? `${props.max}+`
          : props.content}
      </span>
    </span>
  );
}
