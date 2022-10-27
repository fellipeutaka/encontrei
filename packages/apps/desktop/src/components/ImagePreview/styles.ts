import {
  Root as ContextMenuPrimitiveRoot,
  Trigger as ContextMenuPrimitiveTrigger,
  Content as ContextMenuPrimitiveContent,
  Item as ContextMenuPrimitiveItem,
} from "@radix-ui/react-context-menu";
import {
  Content as DialogPrimitiveContent,
  Overlay as DialogPrimitiveOverlay,
  Root as DialogRoot,
  Trigger as DialogPrimitiveTrigger,
} from "@radix-ui/react-dialog";
import styled from "styled-components";

export const Container = styled(DialogRoot)``;

export const DialogContent = styled(DialogPrimitiveContent)`
  width: 25vw;
  height: 25vw;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  outline: none;

  img {
    width: 100%;
    height: 100%;
    border-radius: 8px;
  }

  @keyframes showContent {
    from {
      opacity: 0;
      scale: 0.5;
    }
    to {
      opacity: 1;
      scale: 1;
    }
  }

  animation: showContent 300ms ease-in-out;
`;

export const DialogOverlay = styled(DialogPrimitiveOverlay)`
  background-color: ${({ theme }) => theme.colors.blackA11};
  position: fixed;
  inset: 0;

  @keyframes showOverlay {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  animation: showOverlay 300ms ease-out;
`;

export const DialogTrigger = styled(DialogPrimitiveTrigger)`
  width: 4.8rem;
  height: 4.8rem;
  border: none;
  outline: none;
  cursor: pointer;
  transition: all 0.3s ease;

  img {
    width: 100%;
    height: 100%;
  }

  &:hover {
    opacity: 0.7;
  }

  tbody tr:nth-child(even) &:focus-visible {
    box-shadow: 0 0 0 0.2rem ${({ theme }) => theme.colors.mauve6},
      0 0 0 0.4rem ${({ theme }) => theme.colors.violet9};
  }

  tbody tr:nth-child(odd) &:focus-visible {
    box-shadow: 0 0 0 0.2rem ${({ theme }) => theme.colors.mauve3},
      0 0 0 0.4rem ${({ theme }) => theme.colors.violet9};
  }
`;

export const ContextMenuContent = styled(ContextMenuPrimitiveContent)`
  min-width: 16rem;
  background-color: ${({ theme }) => theme.colors.mauve12};
  color: ${({ theme }) => theme.colors.mauve4};
  border-radius: 0.6rem;
  padding: 0.6rem;
  box-shadow: 1rem 2rem 2rem 2rem rgba(20, 20, 20, 0.4);
  animation: contextMenuContentEntrance 640ms cubic-bezier(0.16, 1, 0.3, 1);

  @keyframes contextMenuContentEntrance {
    from {
      transform: translateY(4px);
    }
    to {
      transform: translateY(0);
    }
  }
`;

export const ContextMenuItem = styled(ContextMenuPrimitiveItem)`
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

export const ContextMenu = ContextMenuPrimitiveRoot;
export const ContextMenuTrigger = ContextMenuPrimitiveTrigger;
