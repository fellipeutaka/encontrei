import {
  Root as DropdownMenuPrimitiveRoot,
  Trigger as DropdownMenuPrimitiveTrigger,
  Content as DropdownMenuPrimitiveContent,
  Item as DropdownMenuPrimitiveItem,
  Arrow as DropdownMenuPrimitiveArrow,
} from "@radix-ui/react-dropdown-menu";
import styled from "styled-components";

export const DropdownMenu = DropdownMenuPrimitiveRoot;

export const DropdownMenuTrigger = styled(DropdownMenuPrimitiveTrigger)`
  color: ${({ theme }) => theme.colors.gray12};
  transition: all 0.3s ease;

  tbody tr:nth-child(even) &:focus-visible {
    box-shadow: 0 0 0 0.2rem ${({ theme }) => theme.colors.mauve6},
      0 0 0 0.4rem ${({ theme }) => theme.colors.violet9};
  }

  tbody tr:nth-child(odd) &:focus-visible {
    box-shadow: 0 0 0 0.2rem ${({ theme }) => theme.colors.mauve3},
      0 0 0 0.4rem ${({ theme }) => theme.colors.violet9};
  }

  &:hover {
    opacity: 0.7;
  }
`;

export const DropdownMenuContent = styled(DropdownMenuPrimitiveContent)`
  min-width: 8.4rem;
  background-color: ${({ theme }) => theme.colors.mauve12};
  color: ${({ theme }) => theme.colors.mauve4};
  border-radius: 6px;
  padding: 6px;
  box-shadow: 10px 20px 20px 2px rgba(20, 20, 20, 0.4);

  &[data-state="open"] {
    animation: slideUpAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1);
  }

  @keyframes slideUpAndFade {
    from {
      opacity: 0;
      transform: translateY(2px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const DropdownMenuItem = styled(DropdownMenuPrimitiveItem)`
  all: unset;
  user-select: none;
  display: flex;
  justify-content: space-between;
  height: 2.4rem;
  align-items: center;
  line-height: 0.1rem;
  font-size: 1.2rem;
  border-radius: 0.4rem;
  gap: 0.8rem;
  padding: 0 0.6rem;
  border: none;
  outline: none;

  &[data-highlighted] {
    background-color: ${({ theme }) => theme.colors.violet9};
    color: white;
  }
`;

export const DropdownMenuArrow = styled(DropdownMenuPrimitiveArrow)`
  fill: ${({ theme }) => theme.colors.mauve12};
`;
