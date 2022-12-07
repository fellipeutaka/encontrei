import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigation } from "@react-navigation/native";
import { z } from "zod";

import { useToast } from "@encontrei/hooks/useToast";
import { supabase } from "@encontrei/lib/supabase";
import { vibrate } from "@encontrei/utils/vibrate";
import { name, email, password } from "@encontrei/utils/zodSchemas";

const signUpSchema = z.object({
  name,
  email,
  password,
});

type FormData = z.output<typeof signUpSchema>;

export function useSignUp() {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(signUpSchema),
  });
  const { goBack } = useNavigation();
  const toast = useToast();

  async function signUp({ name, email, password }: FormData) {
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
      return toast({
        type: "error",
        message: error.message,
      });
    }
    toast({
      type: "success",
      message: "Conta criada com sucesso! Por favor, confirme seu e-mail",
    });
  }

  const handleSignUp = handleSubmit(signUp, () => vibrate());

  return { control, errors, isSubmitting, goBack, handleSignUp };
}
