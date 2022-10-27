import { Feather, FontAwesome, Ionicons } from "@expo/vector-icons";
import Toast from "src/utils/toast";
import { useTheme } from "styled-components/native";

import SettingsOption from "@encontrei/components/General/SettingsOption";
import { supabase } from "@encontrei/lib/supabase";

import { Container, Options, OptionsContainer } from "../styles";

export default function Account() {
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
            onPress={() => console.log("Edit profile")}
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
            onPress={() => console.log("Change e-mail")}
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
            onPress={() => console.log("Change password")}
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
