import { forwardRef } from "react";
import {
  MdOutlineCheck,
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";

import type { SelectProps, SelectTriggerProps } from "@radix-ui/react-select";

import {
  Root as StyledRoot,
  Container,
  Content as StyledContent,
  Icon as StyledIcon,
  Item,
  ItemIndicator,
  ItemText,
  ScrollDown,
  ScrollUp,
  Viewport,
  Trigger as StyledTrigger,
  Placeholder as StyledPlaceholder,
} from "./styles";

interface ContentProps {
  items: Array<{
    text: string;
    value: string;
  }>;
}

export function Root(props: SelectProps) {
  return <StyledRoot {...props} />;
}

export function Content({ items }: ContentProps) {
  return (
    <Container>
      <StyledContent>
        <ScrollUp>
          <MdOutlineKeyboardArrowUp />
        </ScrollUp>
        <Viewport>
          {items.map((item, index) => (
            <Item key={index} value={item.value}>
              <ItemText>{item.text}</ItemText>
              <ItemIndicator>
                <MdOutlineCheck />
              </ItemIndicator>
            </Item>
          ))}
        </Viewport>
        <ScrollDown>
          <MdOutlineKeyboardArrowDown />
        </ScrollDown>
      </StyledContent>
    </Container>
  );
}

export const Trigger = forwardRef<HTMLButtonElement, SelectTriggerProps>(
  (props, ref) => {
    return <StyledTrigger ref={ref} {...props} />;
  }
);

export function Icon() {
  return (
    <StyledIcon>
      <MdOutlineKeyboardArrowDown size={24} />
    </StyledIcon>
  );
}

interface PlaceholderProps {
  text: string;
}

export function Placeholder({ text }: PlaceholderProps) {
  return (
    <StyledPlaceholder placeholder={<span id="placeholder">{text}</span>} />
  );
}
