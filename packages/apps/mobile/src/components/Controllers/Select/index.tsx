import Picker from "react-native-picker-select";

import { useTheme } from "styled-components/native";

import { capitalizeFirstLetter } from "@encontrei/utils/capitalizeFirstLetter";

type SelectProps<T> = {
  value: T;
  onValueChange: (value: T, index: number) => void;
  options: readonly string[];
}

export default function Select<T>({
  value,
  onValueChange,
  options,
}: SelectProps<T>) {
  const theme = useTheme();

  return (
    <Picker
      value={value}
      placeholder={{ label: "Selecione um item", value: null }}
      doneText="OK"
      style={{
        inputIOS: {
          color: theme.colors.mauve12,
          backgroundColor: theme.colors.mauve11,
          padding: 12,
          borderRadius: 6,
          marginVertical: 6,
        },
        modalViewMiddle: {
          backgroundColor: theme.colors.mauve1,
          borderTopColor: theme.colors.mauve11,
        },
        placeholder: {
          marginVertical: 6,
        },
      }}
      pickerProps={{
        mode: "dropdown",
        dropdownIconColor: theme.colors.mauve12,
        style: {
          color: theme.colors.mauve12,
          backgroundColor: theme.colors.mauve1,
          marginVertical: 6,
        },
        itemStyle: {
          color: theme.colors.mauve12,
        },
      }}
      onValueChange={onValueChange}
      items={options.map((option) => ({
        label: capitalizeFirstLetter(option),
        value: option,
      }))}
    />
  );
}
