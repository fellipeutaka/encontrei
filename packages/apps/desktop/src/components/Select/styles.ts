import * as SelectPrimitive from "@radix-ui/react-select";
import styled from "styled-components";

export const Root = styled(SelectPrimitive.Root)``;

export const Container = styled(SelectPrimitive.Portal)``;

export const Content = styled(SelectPrimitive.Content)`
  background-color: ${({ theme }) => theme.colors.mauve3};
  border-radius: 0.6rem;
  overflow: hidden;
`;

export const ScrollUp = styled(SelectPrimitive.ScrollUpButton)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 2.4rem;
`;

export const ScrollDown = styled(SelectPrimitive.ScrollDownButton)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 2.4rem;
`;

export const Viewport = styled(SelectPrimitive.Viewport)`
  padding: 0.8rem;
`;

export const Item = styled(SelectPrimitive.Item)`
  all: unset;
  font-size: 1.4rem;
  border-radius: 0.4rem;
  display: flex;
  align-items: center;
  position: relative;
  height: 2.4rem;
  padding: 0 2.4rem;
  user-select: none;

  &:hover {
    background-color: ${({ theme }) => theme.colors.violet9};
  }
`;

export const ItemText = styled(SelectPrimitive.ItemText)``;

export const ItemIndicator = styled(SelectPrimitive.ItemIndicator)`
  position: absolute;
  left: 0;
  width: 2.4rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Icon = styled(SelectPrimitive.Icon)`
  color: ${({ theme }) => theme.colors.mauve10};
`;

export const Placeholder = styled(SelectPrimitive.Value)`
  color: ${({ theme }) => theme.colors.mauve10};
`;

export const Trigger = styled(SelectPrimitive.Trigger)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.2rem 1.6rem;
  border: none;
  outline: none;
  background-color: ${({ theme }) => theme.colors.mauve3};
  color: ${({ theme }) => theme.colors.mauve12};
  border-radius: 0.4rem;
  width: 100%;
  height: 44px;
  transition: border 400ms ease;

  span#placeholder {
    color: ${({ theme }) => theme.colors.mauve10};
  }

  &[aria-invalid="true"] {
    border: 2px solid red;
  }
`;
