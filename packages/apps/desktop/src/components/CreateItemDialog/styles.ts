import * as Dialog from "@radix-ui/react-dialog";
import styled from "styled-components";

export const DialogRoot = styled(Dialog.Root)``;
export const Portal = styled(Dialog.Portal)``;

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
  display: flex;
  align-items: center;
  gap: 0.6rem;
  background-color: ${({ theme }) => theme.colors.violet9};
  color: white;
  font-weight: 500;
  padding: 0.8rem;
  border-radius: 0.4rem;
  transition: all 400ms ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.violet10};
  }

  &:focus-visible {
    box-shadow: 0 0 0 0.2rem ${({ theme }) => theme.colors.mauve1},
      0 0 0 0.4rem ${({ theme }) => theme.colors.violet9};
  }
`;

export const DetailsContent = styled(Dialog.Content)`
  width: 50vw;
  padding: 3.2rem 4rem;
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
  overflow-y: scroll;

  h1 {
    font-size: 2.4rem;
    margin: 0;
    width: max-content;
    margin-bottom: 2.4rem;
  }

  select {
    padding: 1.2rem 1.6rem;

    border: none;
    outline: none;
    border-radius: 6px;
    transition: all 400ms ease;
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

export const ErrorText = styled.span`
  color: red;
  align-self: flex-start;
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

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  align-items: center;
  width: 384px;
`;

export const FormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  align-items: center;
  width: 384px;
`;

export const FormLabel = styled.label`
  align-self: flex-start;
`;

interface UploadContainerProps {
  error?: boolean;
  hasImage: boolean;
}

export const UploadContainer = styled.div<UploadContainerProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.6rem;
  width: 320px;
  aspect-ratio: 1/1;
  border-width: ${({ hasImage }) => (hasImage ? 0 : 1)}px;
  border-style: dashed;
  border-color: ${({ error, theme }) => (error ? "red" : theme.colors.violet9)};
  position: relative;
  transition: border-color 400ms ease;

  p {
    font-size: 1.4rem;
  }

  div.image-item img {
    width: 320px;
    height: 320px;
    position: absolute;
    inset: 0;
    object-fit: cover;
    cursor: pointer;
  }
`;

interface UploadButtonProps {
  isDragging: boolean;
}

export const UploadButton = styled.button<UploadButtonProps>`
  width: 12.8rem;
  height: 12.8rem;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.mauve2};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: background-color 400ms ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.mauve3};
  }

  div#triangle {
    border-left: 16px solid transparent;
    border-right: 16px solid transparent;
    border-bottom: 16px solid ${({ theme }) => theme.colors.mauve10};
  }

  div#arrow-line {
    width: 0.8rem;
    height: 2rem;
    background-color: ${({ theme }) => theme.colors.mauve10};
    animation: ${({ isDragging }) =>
        isDragging ? "dragging-in-arrow-line" : "dragging-out-arrow-line"}
      200ms ease forwards alternate;

    @keyframes dragging-in-arrow-line {
      100% {
        width: 1.8rem;
        height: 0.6rem;
      }
    }

    @keyframes dragging-out-arrow-line {
      0% {
        width: 1.8rem;
        height: 0.6rem;
      }
      100% {
        width: 0.8rem;
        height: 2rem;
      }
    }
  }

  div#line {
    width: 3.6rem;
    height: 0.6rem;
    background-color: ${({ theme }) => theme.colors.mauve10};
    margin-top: 0.8rem;
  }
`;
