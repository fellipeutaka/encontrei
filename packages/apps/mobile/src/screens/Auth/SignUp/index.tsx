import { useForm, Controller } from "react-hook-form";
import { View, Text, TouchableOpacity } from "react-native";

import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigation } from "@react-navigation/native";
import { z } from "zod";

import * as Button from "@encontrei/components/Controllers/Button";
import {
  UserField,
  EmailField,
  PasswordField,
} from "@encontrei/components/Controllers/TextField";
import { KeyboardAvoidingView } from "@encontrei/components/General/KeyboardAvoidingView";
import { Label } from "@encontrei/components/General/Label";
import { supabase } from "@encontrei/lib/supabase";
import { vibrate } from "@encontrei/utils/vibrate";
import { name, email, password } from "@encontrei/utils/zodSchemas";

type FormData = {
  name: string;
  email: string;
  password: string;
};

const signUpSchema = z.object({
  name,
  email,
  password,
});

export function SignUp() {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(signUpSchema),
  });
  const navigation = useNavigation();

  async function signUp({ name, email, password }: FormData) {
    try {
      await supabase.auth.signUp(
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
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <KeyboardAvoidingView>
      <View className="flex-1 justify-center items-center bg-zinc-50 dark:bg-zinc-900 p-8">
        <Text className="text-4xl font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
          Crie sua conta
        </Text>
        <View className="w-full">
          <Label className="my-4">Nome</Label>
          <Controller
            control={control}
            name="name"
            render={({
              field: { onChange, ...field },
              fieldState: { error },
            }) => (
              <UserField
                placeholder="Nome"
                error={Boolean(error)}
                onChangeText={onChange}
                {...field}
              />
            )}
          />
          {errors.name && (
            <Text className="text-red-600 font-semibold my-1">
              {errors.name.message}
            </Text>
          )}
          <Label className="my-4">E-mail</Label>
          <Controller
            control={control}
            name="email"
            render={({
              field: { onChange, ...field },
              fieldState: { error },
            }) => (
              <EmailField
                placeholder="E-mail"
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
                placeholder="Senha"
                error={Boolean(error)}
                onChangeText={onChange}
                {...field}
              />
            )}
          />
          {errors.password && (
            <Text className="text-red-600 font-semibold my-1">
              {errors.password.message}
            </Text>
          )}
        </View>
        <Button.Root
          className="mt-12 mb-4 h-16 rounded-full"
          onPress={handleSubmit(signUp, () => vibrate())}
          isLoading={isSubmitting}
        >
          <Button.Text>Entrar</Button.Text>
        </Button.Root>
        <TouchableOpacity className="mt-4" onPress={navigation.goBack}>
          <Text className="font-medium text-zinc-900 dark:text-zinc-50">
            Já tem uma conta? Entre agora
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
