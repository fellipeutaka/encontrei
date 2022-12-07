import { Controller } from "react-hook-form";
import { View, Text, TouchableOpacity } from "react-native";

import * as Button from "@encontrei/components/Controllers/Button";
import { EmailField } from "@encontrei/components/Controllers/TextField";
import { FormError } from "@encontrei/components/General/FormError";
import { KeyboardAvoidingView } from "@encontrei/components/General/KeyboardAvoidingView";
import { Label } from "@encontrei/components/General/Label";

import { useForget } from "./useForget";

export function Forget() {
  const { control, errors, isSubmitting, goBack, handleRecoverPassword } =
    useForget();

  return (
    <KeyboardAvoidingView>
      <View className="flex-1 justify-center items-center bg-zinc-50 dark:bg-zinc-900 p-8">
        <Text className="text-4xl font-semibold text-zinc-900 dark:text-zinc-50 text-center mb-4">
          Esqueci minha senha
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
        </View>
        <Button.Root
          className="mt-12 mb-4 h-16 rounded-full"
          onPress={handleRecoverPassword}
          isLoading={isSubmitting}
        >
          <Button.Text>Recuperar</Button.Text>
        </Button.Root>
        <TouchableOpacity className="mt-4" onPress={goBack}>
          <Text className="font-medium text-zinc-900 dark:text-zinc-50">
            Lembrou de sua senha? Entre agora
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
