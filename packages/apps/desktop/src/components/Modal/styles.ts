import * as Dialog from "@radix-ui/react-dialog";
import styled from "styled-components";

export const DialogRoot = styled(Dialog.Root)``;

export const DialogOverlay = styled(Dialog.Overlay)`
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

export const DetailsTrigger = styled(Dialog.Trigger)`
  color: ${({ theme }) => theme.colors.gray12};
  border: none;
  outline: none;
  transition: all 0.3s ease;

  &:hover {
    opacity: 0.7;
  }
`;

export const DetailsContent = styled(Dialog.Content)`
  aspect-ratio: 4 / 3;
  width: 50vw;
  border-radius: 1.6rem;
  background-color: ${({ theme }) => theme.colors.mauve1};
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  outline: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.8rem;

  h1 {
    font-size: 2.4rem;
    margin: 0;
    width: max-content;
  }

  h2 {
    font-size: 2rem;
    font-weight: 500;
  }

  img {
    width: 25.6rem;
    height: 25.6rem;
    border-radius: 8px;
  }

  div {
    display: flex;
    align-items: center;
    gap: 0.4rem;

    &.buttons {
      gap: 0.8rem;

      button {
        color: white;
        font-weight: 600;
        padding: 1.2rem 2.4rem;
        border-radius: 0.8rem;
        background-color: #282828;
        transition: opacity 400ms ease;

        &:last-child {
          background-color: #8257e5;
        }

        &:hover,
        &:focus {
          opacity: 0.7;
        }
      }
    }
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
export const DialogClose = styled(Dialog.Close)`
  position: absolute;
  top: 2rem;
  right: 2rem;
  width: 3.2rem;
  height: 3.2rem;
  border-radius: 1.6rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.colors.gray12};
  transition: background-color 0.4s ease;

  &:hover,
  &:focus {
    background-color: rgba(40, 40, 40, 0.7);
  }
`;
