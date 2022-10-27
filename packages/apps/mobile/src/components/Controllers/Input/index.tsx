import { useEffect, useMemo, useRef, useState } from "react";
import { TextInput, TextInputProps } from "react-native";

import { Feather, Fontisto, MaterialIcons } from "@expo/vector-icons";
import { useField } from "@unform/core";
import { useTheme } from "styled-components/native";

import {
  Container,
  Error,
  ErrorText,
  EyeContainer,
  IconContainer,
  StyledInput,
} from "./styles";

type InputReference = TextInput & {
  value: string;
};

type InputProps = TextInputProps & {
  name: string;
  type?: "user" | "password" | "email";
  leftIcon?: JSX.Element;
};

export default function Input({
  name,
  type,
  leftIcon,
  style,
  onChangeText,
  ...rest
}: InputProps) {
  const theme = useTheme();
  const inputRef = useRef<InputReference>(null);
  const { fieldName, registerField, defaultValue = "", error } = useField(name);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = defaultValue;
    }
  }, [defaultValue]);

  useEffect(() => {
    registerField<string>({
      name: fieldName,
      ref: inputRef.current,
      path: "value",
    });
  }, [fieldName, registerField]);

  useEffect(() => {
    if (error) {
      inputRef.current?.focus();
    }
  }, [error]);

  function handleChangeText(text: string) {
    if (inputRef.current) {
      inputRef.current.value = text;
    }
  }

  if (type === "password") {
    const [currentBorderColor, setCurrentBorderColor] = useState(
      theme.colors.mauve10
    );
    const borderColor = useMemo(
      () => (error ? "red" : currentBorderColor),
      [currentBorderColor, error]
    );
    const [hide, setHide] = useState(true);
    const eyeName = useMemo(() => (hide ? "eye" : "eye-off"), [hide]);
    const toggleHide = () => setHide((state) => !state);

    return (
      <>
        <Container>
          <IconContainer>
            {leftIcon || (
              <Feather name="lock" size={20} color={theme.colors.mauve10} />
            )}
          </IconContainer>
          <StyledInput
            autoCapitalize="none"
            textContentType="password"
            autoComplete="password"
            secureTextEntry={hide}
            placeholderTextColor={theme.colors.mauve10}
            style={{
              paddingHorizontal: 48,
              borderWidth: 1,
              borderStyle: "solid",
              borderColor,
            }}
            ref={inputRef}
            defaultValue={defaultValue}
            onChangeText={handleChangeText}
            onFocus={() => setCurrentBorderColor(theme.colors.violet9)}
            onBlur={() => setCurrentBorderColor(theme.colors.mauve10)}
            {...rest}
          />
          <EyeContainer onPress={toggleHide}>
            <Feather name={eyeName} size={20} color={theme.colors.mauve10} />
          </EyeContainer>
        </Container>
        {error && (
          <Error>
            <MaterialIcons name="error-outline" size={16} color="red" />
            <ErrorText>{error}</ErrorText>
          </Error>
        )}
      </>
    );
  }

  if (type === "email") {
    const [currentBorderColor, setCurrentBorderColor] = useState(
      theme.colors.mauve10
    );
    const borderColor = error ? "red" : currentBorderColor;
    return (
      <>
        <Container>
          <IconContainer>
            {leftIcon || (
              <Fontisto name="email" size={20} color={theme.colors.mauve10} />
            )}
          </IconContainer>
          <StyledInput
            autoCapitalize="none"
            keyboardType="email-address"
            textContentType="emailAddress"
            autoComplete="email"
            placeholderTextColor={theme.colors.mauve10}
            style={{
              paddingHorizontal: 48,
              borderWidth: 1,
              borderStyle: "solid",
              borderColor,
            }}
            ref={inputRef}
            defaultValue={defaultValue}
            onChangeText={handleChangeText}
            onFocus={() => setCurrentBorderColor(theme.colors.violet9)}
            onBlur={() => setCurrentBorderColor(theme.colors.mauve10)}
            {...rest}
          />
        </Container>
        {error && (
          <Error>
            <MaterialIcons name="error-outline" size={16} color="red" />
            <ErrorText>{error}</ErrorText>
          </Error>
        )}
      </>
    );
  }

  if (type === "user") {
    const [currentBorderColor, setCurrentBorderColor] = useState(
      theme.colors.mauve10
    );
    const borderColor = error ? "red" : currentBorderColor;
    return (
      <>
        <Container>
          <IconContainer>
            {leftIcon || (
              <Feather name="user" size={20} color={theme.colors.mauve10} />
            )}
          </IconContainer>
          <StyledInput
            autoCapitalize="none"
            textContentType="username"
            autoComplete="username"
            placeholderTextColor={theme.colors.mauve10}
            style={{
              paddingHorizontal: 48,
              borderWidth: 1,
              borderStyle: "solid",
              borderColor,
            }}
            ref={inputRef}
            defaultValue={defaultValue}
            onChangeText={handleChangeText}
            onFocus={() => setCurrentBorderColor(theme.colors.violet9)}
            onBlur={() => setCurrentBorderColor(theme.colors.mauve10)}
            {...rest}
          />
        </Container>
        {error && (
          <Error>
            <MaterialIcons name="error-outline" size={16} color="red" />
            <ErrorText>{error}</ErrorText>
          </Error>
        )}
      </>
    );
  }

  const [currentBorderColor, setCurrentBorderColor] = useState(
    theme.colors.mauve10
  );
  const borderColor = error ? "red" : currentBorderColor;
  return (
    <>
      <Container>
        {leftIcon && <IconContainer>{leftIcon}</IconContainer>}
        <StyledInput
          placeholderTextColor={theme.colors.mauve10}
          style={[
            {
              paddingHorizontal: 16,
              borderWidth: 1,
              borderStyle: "solid",
              borderColor,
            },
            style,
          ]}
          ref={inputRef}
          defaultValue={defaultValue}
          onChangeText={handleChangeText}
          onFocus={() => setCurrentBorderColor(theme.colors.violet9)}
          onBlur={() => setCurrentBorderColor(theme.colors.mauve10)}
          {...rest}
        />
      </Container>
      {error && (
        <Error>
          <MaterialIcons name="error-outline" size={16} color="red" />
          <ErrorText>{error}</ErrorText>
        </Error>
      )}
    </>
  );
}
