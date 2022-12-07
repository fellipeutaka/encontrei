import Picker from "react-native-picker-select";

import { useColorScheme } from "nativewind";

import { colors } from "@encontrei/tailwind-config";

type SelectProps<T> = {
  value: T;
  onValueChange: (value: T, index: number) => void;
  options: readonly string[];
};

export function Select<T>({ value, onValueChange, options }: SelectProps<T>) {
  const { colorScheme } = useColorScheme();

  return (
    <Picker
      value={value}
      placeholder={{ label: "Selecione um item", value: null }}
      doneText="OK"
      style={{
        inputIOS: {
          color: colorScheme === "dark" ? colors.zinc[50] : colors.zinc[900],
          backgroundColor:
            colorScheme === "dark" ? colors.zinc[100] : colors.zinc[800],
          padding: 12,
          borderRadius: 4,
          marginVertical: 4,
        },
        modalViewMiddle: {
          backgroundColor:
            colorScheme === "dark" ? colors.zinc[900] : colors.zinc[50],
          borderTopColor:
            colorScheme === "dark" ? colors.zinc[100] : colors.zinc[800],
        },
        placeholder: {
          marginVertical: 6,
        },
        viewContainer: {
          borderColor: colors.zinc[500],
          borderWidth: 2,
          borderRadius: 6,
          backgroundColor: colors.zinc[800],
        },
      }}
      pickerProps={{
        mode: "dropdown",
        dropdownIconColor:
          colorScheme === "dark" ? colors.zinc[500] : colors.zinc[900],
        style: {
          color: colorScheme === "dark" ? colors.zinc[500] : colors.zinc[900],
          backgroundColor: colors.zinc[800],
          marginVertical: 2,
        },
        itemStyle: {
          color: colorScheme === "dark" ? colors.zinc[500] : colors.zinc[900],
        },
      }}
      onValueChange={onValueChange}
      items={options.map((option) => ({
        label: option,
        value: option,
      }))}
    />
  );
}
