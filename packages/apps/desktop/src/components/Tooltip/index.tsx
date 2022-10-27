import { ReactNode } from "react";

import {
  Provider,
  Tooltip as Container,
  TooltipTrigger,
  TooltipContent,
  StyledArrow,
} from "./styles";
interface TooltipProps {
  children: ReactNode;
  tooltipContent: string;
}

export function Tooltip({ children, tooltipContent }: TooltipProps) {
  return (
    <Provider>
      <Container delayDuration={100}>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent sideOffset={4} side="right">
          {tooltipContent}
          <StyledArrow />
        </TooltipContent>
      </Container>
    </Provider>
  );
}
