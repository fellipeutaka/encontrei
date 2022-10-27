import { InputHTMLAttributes, forwardRef } from "react";

import { Container } from "./styles";

export const Input = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement>
>((props, ref) => {
  return <Container ref={ref} {...props} />;
});
