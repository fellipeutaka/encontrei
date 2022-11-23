import { useForm, Controller } from "react-hook-form";
import { View, Text, TouchableOpacity } from "react-native";

import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigation } from "@react-navigation/native";
import { z } from "zod";

import { AuthStackNavigationProps } from "@encontrei/@types/routes/NavigationProps/Auth";
import * as Button from "@encontrei/components/Controllers/Button";
import {
  EmailField,
  PasswordField,
} from "@encontrei/components/Controllers/TextField";
import { KeyboardAvoidingView } from "@encontrei/components/General/KeyboardAvoidingView";
import { Label } from "@encontrei/components/General/Label";
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

export function SignIn() {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(signInSchema),
  });
  const navigation = useNavigation<AuthStackNavigationProps>();

  async function signIn({ email, password }: FormData) {
    try {
      const { error } = await supabase.auth.signIn({
        email,
        password,
      });
      if (error) throw new Error(error.message);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <KeyboardAvoidingView>
      <View className="flex-1 justify-center items-center bg-zinc-50 dark:bg-zinc-900 p-8">
        <Text className="text-4xl font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
          Login
        </Text>
        <View className="w-full">
          <Label className="my-4">E-mail</Label>
          <Controller
            control={control}
            name="email"
            render={({
              field: { onChange, ...field },
              fieldState: { error },
            }) => (
              <EmailField
                error={Boolean(error)}
                onChangeText={onChange}
                {...field}
              />
            )}
          />
          {errors.email && (
            <Text className="text-red-600 font-semibold my-1">
              {errors.email.message}
            </Text>
          )}
          <Label className="my-4">Senha</Label>
          <Controller
            control={control}
            name="password"
            render={({
              field: { onChange, ...field },
              fieldState: { error },
            }) => (
              <PasswordField
                error={Boolean(error)}
                onChangeText={onChange}
                {...field}
              />
            )}
          />
          {errors.password && (
            <Text className="text-red-600 font-semibold mt-1 -mb-4">
              {errors.password.message}
            </Text>
          )}
        </View>
        <TouchableOpacity
          className="mt-4 self-end"
          onPress={() => navigation.navigate("Forget")}
        >
          <Text className="text-base font-medium text-zinc-900 dark:text-zinc-50">
            Esqueci minha senha
          </Text>
        </TouchableOpacity>
        <Button.Root
          className="mt-12 mb-4 h-16 rounded-full"
          onPress={handleSubmit(signIn, () => vibrate())}
          isLoading={isSubmitting}
        >
          <Button.Text>Entrar</Button.Text>
        </Button.Root>
        <TouchableOpacity
          className="mt-4"
          onPress={() => navigation.navigate("SignUp")}
        >
          <Text className="font-medium text-zinc-900 dark:text-zinc-50">
            Não tem uma conta? Crie sua conta
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
