import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigation } from "@react-navigation/native";
import { z } from "zod";

import { AuthStackNavigationProps } from "@encontrei/@types/routes/NavigationProps/Auth";
import { useToast } from "@encontrei/hooks/useToast";
import { supabase } from "@encontrei/lib/supabase";
import { vibrate } from "@encontrei/utils/vibrate";
import { email, password } from "@encontrei/utils/zodSchemas";

type FormData = {
  email: string;
  password: string;
};

const signInSchema = z.object({
  email,
  password,
});

export function useSignIn() {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(signInSchema),
  });
  const { navigate } = useNavigation<AuthStackNavigationProps>();
  const toast = useToast();

  async function signIn({ email, password }: FormData) {
    const { error } = await supabase.auth.signIn({
      email,
      password,
    });
    if (error) {
      toast({
        message: error.message,
        type: "error",
      });
    }
  }

  const handleSignIn = handleSubmit(signIn, () => vibrate());

  return {
    control,
    handleSubmit,
    errors,
    isSubmitting,
    navigate,
    handleSignIn,
  };
}
