import { useForm, Controller } from "react-hook-form";
import { View, Text, TouchableOpacity } from "react-native";

import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigation } from "@react-navigation/native";
import { z } from "zod";

import * as Button from "@encontrei/components/Controllers/Button";
import { EmailField } from "@encontrei/components/Controllers/TextField";
import { KeyboardAvoidingView } from "@encontrei/components/General/KeyboardAvoidingView";
import { Label } from "@encontrei/components/General/Label";
import { supabase } from "@encontrei/lib/supabase";
import { vibrate } from "@encontrei/utils/vibrate";
import { email } from "@encontrei/utils/zodSchemas";

const forgetSchema = z.object({
  email,
});

type FormData = z.output<typeof forgetSchema>;

export function Forget() {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(forgetSchema),
  });
  const navigation = useNavigation();

  async function recoverPassword({ email }: FormData) {
    console.log(email);
  }

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
          {errors.email && (
            <Text className="text-red-600 font-semibold my-1">
              {errors.email.message}
            </Text>
          )}
        </View>
        <Button.Root
          className="mt-12 mb-4 h-16 rounded-full"
          onPress={handleSubmit(recoverPassword, () => vibrate())}
          isLoading={isSubmitting}
        >
          <Button.Text>Recuperar</Button.Text>
        </Button.Root>
        <TouchableOpacity className="mt-4" onPress={navigation.goBack}>
          <Text className="font-medium text-zinc-900 dark:text-zinc-50">
            Lembrou de sua senha? Entre agora
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
