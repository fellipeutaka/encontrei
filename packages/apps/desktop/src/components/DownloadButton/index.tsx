import type { ButtonHTMLAttributes } from "react";
import { FiDownload } from "react-icons/fi";

import { Container } from "./styles";

interface DownloadButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export function DownloadButton(props: DownloadButtonProps) {
  return (
    <Container aria-label="Download" {...props}>
      <FiDownload />
      <span>Download</span>
    </Container>
  );
}
