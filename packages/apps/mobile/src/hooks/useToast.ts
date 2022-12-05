import Toast from "react-native-toast-message";

type ToastParams = {
  message: string;
  type: "success" | "error" | "info";
};

export function useToast() {
  return ({ message, type }: ToastParams) =>
    Toast.show({
      text1: message,
      type,
    });
}
