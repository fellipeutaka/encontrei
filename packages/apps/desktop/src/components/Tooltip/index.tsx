import * as TooltipPrimitive from "@radix-ui/react-tooltip";
type TooltipProps = {
  children: React.ReactNode;
  content: string;
}

export function Tooltip({ children, content }: TooltipProps) {
  return (
    <TooltipPrimitive.Provider>
      <TooltipPrimitive.Root delayDuration={100}>
        <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
        <TooltipPrimitive.Content
          className="px-3 py-2 rounded text-sm leading-3 font-semibold text-zinc-900 dark:text-zinc-100 bg-zinc-100 dark:bg-zinc-900 shadow-lg select-none animate-slideRightAndFade"
          sideOffset={4}
          side="right"
        >
          {content}
          <TooltipPrimitive.Arrow className="fill-zinc-100 dark:fill-zinc-900" />
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
}
