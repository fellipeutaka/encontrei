import { ButtonHTMLAttributes } from "react";
import { BsDownload } from "react-icons/bs";

import { Button } from "../Button";

type DownloadButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function DownloadButton(props: DownloadButtonProps) {
  return (
    <Button
      className="bg-green-600 hover:bg-green-700 focus-visible:ring-green-600 h-11"
      {...props}
    >
      <BsDownload />
      <span>Download</span>
    </Button>
  );
}
