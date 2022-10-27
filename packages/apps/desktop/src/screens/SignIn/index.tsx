import { FormEvent, useRef, useState } from "react";
import { BiLockAlt } from "react-icons/bi";
import { BsEnvelope } from "react-icons/bs";

import Lottie from "lottie-react";

import research from "@encontrei/assets/research.json";
import { SpinnerLoader } from "@encontrei/components/SpinnerLoader";
import { supabase } from "@encontrei/lib/supabase";

import {
  Button,
  Container,
  Form,
  Input,
  InputContainer,
  Label,
  Title,
} from "./styles";

export default function SignIn() {
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);

  async function handleSignIn(e: FormEvent) {
    e.preventDefault();
    const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;

    if (!emailInputRef.current?.value.trim()) {
      window.Main.showError("O e-mail é obrigatório!");
      emailInputRef.current?.focus();
    } else if (!emailRegex.test(emailInputRef.current.value)) {
      window.Main.showError("E-mail inválido!");
      emailInputRef.current?.focus();
    } else if (!passwordInputRef.current?.value.trim()) {
      window.Main.showError("A senha é obrigatória!");
      passwordInputRef.current?.focus();
    } else {
      setLoading(true);
      const { error } = await supabase.auth.signIn({
        email: emailInputRef.current.value,
        password: passwordInputRef.current.value,
      });
      if (error) {
        setLoading(false);
        window.Main.showError(error.message);
      }
    }
  }

  return (
    <Container>
      <Title>Achados e Perdidos</Title>
      <Lottie
        animationData={research}
        loop
        style={{ width: "25vw", height: "25vh" }}
      />
      <Form onSubmit={handleSignIn}>
        <Label htmlFor="email">E-mail</Label>
        <InputContainer>
          <Input name="email" id="email" ref={emailInputRef} />
          <BsEnvelope size={24} />
        </InputContainer>
        <Label htmlFor="senha">Senha</Label>
        <InputContainer>
          <Input
            name="senha"
            id="senha"
            type="password"
            ref={passwordInputRef}
          />
          <BiLockAlt size={24} />
        </InputContainer>
        <Button type="submit" disabled={loading}>
          {loading ? <SpinnerLoader /> : "Entrar"}
        </Button>
      </Form>
    </Container>
  );
}
