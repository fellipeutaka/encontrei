import { Text } from "react-native";

type FormErrorProps = {
  message?: string;
};

export function FormError({ message }: FormErrorProps) {
  if (!message) {
    return null;
  }

  return <Text className="text-red-600 font-semibold my-1">{message}</Text>;
}
