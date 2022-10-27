import {
  Provider,
  Root as Container,
  Trigger,
  Content,
  Arrow,
} from "@radix-ui/react-tooltip";
import styled from "styled-components";

export { Provider };
export const Tooltip = Container;
export const TooltipTrigger = Trigger;
export const TooltipContent = styled(Content)`
  border-radius: 0.4rem;
  padding: 1.2rem;
  font-size: 1.4rem;
  line-height: 0.1rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.mauve4};
  background-color: ${({ theme }) => theme.colors.mauve12};
  box-shadow: ${({ theme }) => theme.colors.blackA2} 0px 10px 38px -10px,
    ${({ theme }) => theme.colors.blackA5} 0px 10px 20px 15px;
  user-select: none;
  animation: slideRightAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1) forwards;

  @keyframes slideRightAndFade {
    from {
      opacity: 0;
      transform: translateX(-2px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
export const StyledArrow = styled(Arrow)`
  fill: ${({ theme }) => theme.colors.mauve12};
`;
