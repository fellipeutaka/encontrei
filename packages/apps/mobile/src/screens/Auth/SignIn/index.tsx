import { useRef, useState } from "react";

import { useNavigation } from "@react-navigation/native";
import { FormHandles } from "@unform/core";
import * as Yup from "yup";

import Form from "@encontrei/components/Controllers/Form";
import Input from "@encontrei/components/Controllers/Input";
import LinkButton from "@encontrei/components/Controllers/LinkButton";
import KeyboardAvoidingView from "@encontrei/components/General/KeyboardAvoidingView";
import { supabase } from "@encontrei/lib/supabase";
import { AuthStackNavigationProps } from "@encontrei/types/routes/NavigationProps/Auth";
import Toast from "@encontrei/utils/toast";
import { vibrate } from "@encontrei/utils/vibrate";
import { signInSchema } from "@encontrei/utils/yupSchemas";

import {
  Button,
  Container,
  ForgotButton,
  ForgotText,
  Label,
  Title,
} from "./styles";

interface FormData {
  email: string;
  password: string;
}

export function SignIn() {
  const formRef = useRef<FormHandles>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation<AuthStackNavigationProps>();

  async function handleSignIn({ email, password }: FormData) {
    try {
      formRef.current?.setErrors({});
      await signInSchema.validate({ email, password });
      setIsLoading(true);
      const { error } = await supabase.auth.signIn({
        email,
        password,
      });
      if (error) {
        setIsLoading(false);
        throw new Error(error.message);
      }
    } catch (err: any) {
      if (err instanceof Yup.ValidationError) {
        const { message, path } = err;
        formRef.current?.setFieldError(path || "", message);
        vibrate();
        Toast("Erro", err.message);
      } else if (err.message && err.status) {
        vibrate();
        Toast("Erro", err.message);
      } else {
        vibrate();
        Toast("Erro", "Ocorreu um erro inesperado");
      }
    }
  }

  return (
    <KeyboardAvoidingView>
      <Container>
        <Title>Login</Title>
        <Form ref={formRef} onSubmit={handleSignIn}>
          <Label>E-mail</Label>
          <Input name="email" type="email" />
          <Label>Senha</Label>
          <Input name="password" type="password" />
        </Form>
        <ForgotButton onPress={() => console.log("Forgot")}>
          <ForgotText>Esqueci minha senha</ForgotText>
        </ForgotButton>
        <Button
          onPress={() => formRef.current?.submitForm()}
          isLoading={isLoading}
        >
          Entrar
        </Button>
        <LinkButton onPress={() => navigation.navigate("SignUp")}>
          Não tem uma conta? Crie sua conta
        </LinkButton>
      </Container>
    </KeyboardAvoidingView>
  );
}
