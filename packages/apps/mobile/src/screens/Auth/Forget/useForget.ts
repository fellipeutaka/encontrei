import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigation } from "@react-navigation/native";
import { z } from "zod";

import { useToast } from "@encontrei/hooks/useToast";
import { supabase } from "@encontrei/lib/supabase";
import { vibrate } from "@encontrei/utils/vibrate";
import { email } from "@encontrei/utils/zodSchemas";

const forgetSchema = z.object({
  email,
});

type FormData = z.output<typeof forgetSchema>;

export function useForget() {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(forgetSchema),
  });
  const { goBack } = useNavigation();
  const toast = useToast();

  async function recoverPassword({ email }: FormData) {
    const { error } = await supabase.auth.api.resetPasswordForEmail(email);
    if (error) {
      return toast({
        type: "error",
        message: error.message,
      });
    }
    toast({
      type: "success",
      message: "Sucesso! Por favor, verifique seu e-mail",
    });
  }

  const handleRecoverPassword = handleSubmit(recoverPassword, () => vibrate());

  return { control, errors, isSubmitting, goBack, handleRecoverPassword };
}
