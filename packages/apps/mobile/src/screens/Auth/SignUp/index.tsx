import { Controller } from "react-hook-form";
import { View, Text, TouchableOpacity } from "react-native";

import * as Button from "@encontrei/components/Controllers/Button";
import {
  UserField,
  EmailField,
  PasswordField,
} from "@encontrei/components/Controllers/TextField";
import { FormError } from "@encontrei/components/General/FormError";
import { KeyboardAvoidingView } from "@encontrei/components/General/KeyboardAvoidingView";
import { Label } from "@encontrei/components/General/Label";

import { useSignUp } from "./useSignUp";

export function SignUp() {
  const { control, errors, goBack, isSubmitting, handleSignUp } = useSignUp();

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
          <FormError message={errors.name?.message} />
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
                placeholder="Senha"
                error={Boolean(error)}
                onChangeText={onChange}
                {...field}
              />
            )}
          />
          <FormError message={errors.password?.message} />
        </View>
        <Button.Root
          className="mt-12 mb-4 h-16 rounded-full"
          onPress={handleSignUp}
          isLoading={isSubmitting}
        >
          <Button.Text>Entrar</Button.Text>
        </Button.Root>
        <TouchableOpacity className="mt-4" onPress={goBack}>
          <Text className="font-medium text-zinc-900 dark:text-zinc-50">
            Já tem uma conta? Entre agora
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
