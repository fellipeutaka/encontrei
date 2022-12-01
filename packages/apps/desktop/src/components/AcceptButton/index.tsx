import { ButtonHTMLAttributes } from "react";
import { AiOutlineCheck } from "react-icons/ai";

import { Button } from "../Button";

type DownloadButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function AcceptButton(props: DownloadButtonProps) {
  return (
    <Button className="h-11" {...props}>
      <AiOutlineCheck />
      <span>Aceitar</span>
    </Button>
  );
}
