import { useRef, useState } from "react";

import { useNavigation } from "@react-navigation/native";
import { FormHandles } from "@unform/core";
import { ValidationError } from "yup";

import Form from "@encontrei/components/Controllers/Form";
import Input from "@encontrei/components/Controllers/Input";
import LinkButton from "@encontrei/components/Controllers/LinkButton";
import KeyboardAvoidingView from "@encontrei/components/General/KeyboardAvoidingView";
import { supabase } from "@encontrei/lib/supabase";
import { AuthStackNavigationProps } from "@encontrei/types/routes/NavigationProps/Auth";
import Toast from "@encontrei/utils/toast";
import { vibrate } from "@encontrei/utils/vibrate";
import { signUpSchema } from "@encontrei/utils/yupSchemas";

import { Button, Container, Label, Title } from "./styles";

interface FormData {
  name: string;
  email: string;
  password: string;
}

export function SignUp() {
  const formRef = useRef<FormHandles>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation<AuthStackNavigationProps>();

  async function handleSignUp({ name, email, password }: FormData) {
    try {
      formRef.current?.setErrors({});
      await signUpSchema.validate({ name, email, password });
      setIsLoading(true);
      const { error } = await supabase.auth.signUp(
        {
          email,
          password,
        },
        {
          data: {
            name: name.trim(),
          },
        }
      );
      if (error) {
        throw new Error(error.message);
      }

      Toast("Sucesso", "Por favor, confirme o seu e-mail");
    } catch (err) {
      if (err instanceof ValidationError) {
        const { message, path } = err;
        formRef.current?.setFieldError(path || "", message);
        vibrate();
        Toast("Error", err.message);
      } else {
        console.error(err);
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView>
      <Container>
        <Title>Crie sua conta</Title>
        <Form ref={formRef} onSubmit={handleSignUp}>
          <Label>Nome</Label>
          <Input type="user" name="name" />
          <Label>E-mail</Label>
          <Input type="email" name="email" />
          <Label>Senha</Label>
          <Input type="password" name="password" />
        </Form>
        <Button
          onPress={() => formRef.current?.submitForm()}
          isLoading={isLoading}
        >
          Criar
        </Button>
        <LinkButton onPress={() => navigation.navigate("SignIn")}>
          Já tem uma conta? Entre agora
        </LinkButton>
      </Container>
    </KeyboardAvoidingView>
  );
}
