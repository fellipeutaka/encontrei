import { Feather } from "@expo/vector-icons";
import { useTheme } from "styled-components/native";

import { Container, OptionInfo, OptionTitle, Touchable } from "./styles";

interface SettingsOptionProps {
  icon: JSX.Element;
  title: string;
  rightElement?: JSX.Element;
  isTouchable?: boolean;
  onPress?: () => void;
}

export default function SettingsOption({
  icon,
  title,
  rightElement,
  isTouchable = true,
  onPress,
}: SettingsOptionProps) {
  const theme = useTheme();

  const Option = (
    <>
      <OptionInfo>
        {icon}
        <OptionTitle>{title}</OptionTitle>
      </OptionInfo>
      {rightElement || (
        <Feather name="chevron-right" size={20} color={theme.colors.mauve11} />
      )}
    </>
  );

  return (
    <Container>
      {isTouchable ? <Touchable onPress={onPress}>{Option}</Touchable> : Option}
    </Container>
  );
}
