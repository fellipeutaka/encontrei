import type { HTMLAttributes, ReactNode } from "react";

import { Content, Root } from "./styles";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
  content: number;
  max?: number;
}

export function Badge(props: BadgeProps) {
  if (props.content < 1) {
    return <>{props.children}</>;
  }

  return (
    <Root {...props}>
      {props.children}
      <Content>
        {props.max && props.content > props.max
          ? `${props.max}+`
          : props.content}
      </Content>
    </Root>
  );
}
