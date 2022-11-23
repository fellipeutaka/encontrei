import {
  TouchableOpacity,
  TouchableWithoutFeedbackProps,
  Text as RNText,
  TextProps,
} from "react-native";

import { clsx } from "clsx";

import { Spinner } from "../General/Spinner";

type ButtonProps = {
  isLoading?: boolean;
} & TouchableWithoutFeedbackProps;

export function Root({ isLoading, disabled, children, ...props }: ButtonProps) {
  const isDisabled = disabled || isLoading;

  return (
    <TouchableOpacity
      className={clsx(
        "bg-violet-600 h-14 w-full flex-row justify-center items-center rounded",
        {
          "opacity-30": isDisabled,
        }
      )}
      disabled={isDisabled}
      {...props}
    >
      {isLoading ? <Spinner color="white" /> : children}
    </TouchableOpacity>
  );
}

export function Text(props: TextProps) {
  return <RNText {...props} className="text-zinc-50 text-2xl font-semibold" />;
}
