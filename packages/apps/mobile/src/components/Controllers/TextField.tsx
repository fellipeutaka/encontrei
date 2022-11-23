import { useState, forwardRef } from "react";
import {
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
  ViewProps,
} from "react-native";

import { Feather, Fontisto } from "@expo/vector-icons";
import { clsx } from "clsx";

import { colors } from "@encontrei/tailwind-config";

export function Root(props: ViewProps) {
  return <View className="flex-row items-center" {...props} />;
}

type InputProps = {
  error?: boolean;
} & TextInputProps;

export const Input = forwardRef<TextInput, InputProps>((props, ref) => {
  return (
    <TextInput
      {...props}
      ref={ref}
      placeholderTextColor={colors.zinc[500]}
      className={clsx(
        "bg-zinc-800 text-white py-3 px-4 border border-zinc-500 rounded w-full focus:border-violet-600",
        { "border-red-600": props.error }
      )}
    />
  );
});

export function Icon(props: ViewProps) {
  return <View className="absolute left-3 z-10" {...props} />;
}

export const EmailField = forwardRef<TextInput, InputProps>((props, ref) => {
  return (
    <Root>
      <Icon>
        <Fontisto name="email" size={18} color={colors.zinc[500]} />
      </Icon>
      <Input
        autoCapitalize="none"
        textContentType="emailAddress"
        keyboardType="email-address"
        autoComplete="email"
        placeholder="E-mail"
        ref={ref}
        className="px-10"
        {...props}
      />
    </Root>
  );
});

export const PasswordField = forwardRef<TextInput, InputProps>((props, ref) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <Root>
      <Icon>
        <Feather name="lock" size={18} color={colors.zinc[500]} />
      </Icon>
      <Input
        autoCapitalize="none"
        textContentType="password"
        keyboardType={isPasswordVisible ? "visible-password" : "default"}
        autoComplete="password"
        placeholder="Senha"
        ref={ref}
        secureTextEntry={!isPasswordVisible}
        className="px-10"
        {...props}
      />
      <TouchableOpacity
        className="absolute right-3 z-10"
        onPress={() => setIsPasswordVisible((state) => !state)}
      >
        <Feather
          name={isPasswordVisible ? "eye" : "eye-off"}
          size={18}
          color={colors.zinc[500]}
        />
      </TouchableOpacity>
    </Root>
  );
});

export const UserField = forwardRef<TextInput, InputProps>((props, ref) => {
  return (
    <Root>
      <Icon>
        <Feather name="user" size={18} color={colors.zinc[500]} />
      </Icon>
      <Input
        autoCapitalize="none"
        textContentType="username"
        autoComplete="username"
        placeholder="Usuário"
        ref={ref}
        className="px-10"
        {...props}
      />
    </Root>
  );
});
