import { ReactNode } from "react";
import { AiOutlineClose, AiOutlineEye } from "react-icons/ai";

import {
  DetailsContent,
  DetailsTrigger,
  DialogClose,
  DialogOverlay,
  DialogRoot,
} from "./styles";

interface ModalProps {
  content: ReactNode;
}

export function Modal({ content }: ModalProps) {
  return (
    <DialogRoot>
      <td>
        <DetailsTrigger asChild>
          <button aria-label="See more">
            <AiOutlineEye size={20} />
          </button>
        </DetailsTrigger>
        <DialogOverlay />
        <DetailsContent>
          {content}
          <DialogClose aria-label="Close">
            <AiOutlineClose size={20} />
          </DialogClose>
        </DetailsContent>
      </td>
    </DialogRoot>
  );
}
