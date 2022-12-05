import { Feather, FontAwesome, Ionicons } from "@expo/vector-icons";
import Toast from "src/utils/toast";
import { useTheme } from "styled-components/native";

import { supabase } from "@encontrei/lib/supabase";
import SettingsOption from "@encontrei/screens/App/Settings/components/SettingsOption";

import { Container, Options, OptionsContainer } from "../styles";

export function Account() {
  const theme = useTheme();

  async function handleSignOut() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      Toast("Error", error.message);
    }
  }

  return (
    <Container>
      <OptionsContainer>
        <Options>
          <SettingsOption
            title="Editar perfil"
            icon={
              <Feather name="edit" size={20} color={theme.colors.mauve12} />
            }
            onPress={() =>
              Toast(
                "Aviso",
                "Essa funcionalidade não está disponível no momento"
              )
            }
          />
          <SettingsOption
            title="Alterar e-mail"
            icon={
              <FontAwesome
                name="envelope-o"
                size={20}
                color={theme.colors.mauve12}
              />
            }
            onPress={() =>
              Toast(
                "Aviso",
                "Essa funcionalidade não está disponível no momento"
              )
            }
          />
          <SettingsOption
            title="Alterar senha"
            icon={
              <Ionicons
                name="key-outline"
                size={20}
                color={theme.colors.mauve12}
              />
            }
            onPress={() =>
              Toast(
                "Aviso",
                "Essa funcionalidade não está disponível no momento"
              )
            }
          />
          <SettingsOption
            title="Sair"
            icon={
              <Ionicons
                name="exit-outline"
                size={20}
                color={theme.colors.mauve12}
              />
            }
            onPress={handleSignOut}
          />
        </Options>
      </OptionsContainer>
    </Container>
  );
}
