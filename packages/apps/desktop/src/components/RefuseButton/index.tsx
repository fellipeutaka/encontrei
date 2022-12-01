import { ButtonHTMLAttributes } from "react";
import { AiOutlineClose } from "react-icons/ai";

import { Button } from "../Button";

type DownloadButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function RefuseButton(props: DownloadButtonProps) {
  return (
    <Button
      className="bg-red-600 hover:bg-red-700 focus-visible:ring-red-800 h-11"
      {...props}
    >
      <AiOutlineClose />
      Recusar
    </Button>
  );
}
