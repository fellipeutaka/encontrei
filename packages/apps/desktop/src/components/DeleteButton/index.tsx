import { ButtonHTMLAttributes } from "react";
import { BsTrash } from "react-icons/bs";

import { Button } from "../Button";

type DownloadButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function DeleteButton(props: DownloadButtonProps) {
  return (
    <Button
      className="bg-red-600 hover:bg-red-700 focus-visible:ring-red-800 h-11"
      {...props}
    >
      Excluir
      <BsTrash />
    </Button>
  );
}
