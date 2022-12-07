import { ScrollView, View } from "react-native";

import {
  Feather,
  FontAwesome,
  Ionicons,
} from "@encontrei/components/Icons/ExpoIcons";
import { useToast } from "@encontrei/hooks/useToast";
import { supabase } from "@encontrei/lib/supabase";

import { SettingsOption } from "../components/SettingsOption";

export function Account() {
  const toast = useToast();

  async function handleSignOut() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      toast({
        type: "error",
        message: error.message,
      });
    }
  }

  function toastNotAvaliableFeatures() {
    toast({
      type: "info",
      message: "Em breve 👀",
    });
  }

  return (
    <View className="flex-1 justify-center items-center dark:bg-zinc-900">
      <View className="w-full px-6">
        <ScrollView>
          <SettingsOption
            title="Editar perfil"
            icon={
              <Feather name="edit" size={20} className="dark:text-zinc-50" />
            }
            onPress={toastNotAvaliableFeatures}
          />
          <SettingsOption
            title="Alterar e-mail"
            icon={
              <FontAwesome
                name="envelope-o"
                size={20}
                className="dark:text-zinc-50"
              />
            }
            onPress={toastNotAvaliableFeatures}
          />
          <SettingsOption
            title="Alterar senha"
            icon={
              <Ionicons
                name="key-outline"
                size={20}
                className="dark:text-zinc-50"
              />
            }
            onPress={toastNotAvaliableFeatures}
          />
          <SettingsOption
            title="Sair"
            icon={
              <Ionicons
                name="exit-outline"
                size={20}
                className="dark:text-zinc-50"
              />
            }
            onPress={handleSignOut}
          />
        </ScrollView>
      </View>
    </View>
  );
}
