import type { ButtonHTMLAttributes } from "react";
import { AiOutlineLoading } from "react-icons/ai";

import { Container } from "./styles";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
}

export function Button(props: ButtonProps) {
  return (
    <Container disabled={props.isLoading || props.disabled} {...props}>
      {props.isLoading ? <AiOutlineLoading size={20} /> : props.children}
    </Container>
  );
}
