import { Controller } from "react-hook-form";
import { View, Text, TouchableOpacity } from "react-native";

import * as Button from "@encontrei/components/Controllers/Button";
import {
  EmailField,
  PasswordField,
} from "@encontrei/components/Controllers/TextField";
import { FormError } from "@encontrei/components/General/FormError";
import { KeyboardAvoidingView } from "@encontrei/components/General/KeyboardAvoidingView";
import { Label } from "@encontrei/components/General/Label";

import { useSignIn } from "./useSignIn";

export function SignIn() {
  const { control, errors, isSubmitting, handleSignIn, navigate } = useSignIn();

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
          <FormError message={errors.email?.message} />
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
          <FormError message={errors.password?.message} />
        </View>
        <TouchableOpacity
          className="mt-4 self-end"
          onPress={() => navigate("Forget")}
        >
          <Text className="text-base font-medium text-zinc-900 dark:text-zinc-50">
            Esqueci minha senha
          </Text>
        </TouchableOpacity>
        <Button.Root
          className="mt-12 mb-4 h-16 rounded-full"
          onPress={handleSignIn}
          isLoading={isSubmitting}
        >
          <Button.Text>Entrar</Button.Text>
        </Button.Root>
        <TouchableOpacity className="mt-4" onPress={() => navigate("SignUp")}>
          <Text className="font-medium text-zinc-900 dark:text-zinc-50">
            Não tem uma conta? Crie sua conta
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
