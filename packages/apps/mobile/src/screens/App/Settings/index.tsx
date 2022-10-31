import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "styled-components/native";

import SettingsOption from "@encontrei/components/General/SettingsOption";
import { SettingsStackNavigationProps } from "@encontrei/types/routes/NavigationProps/App/Settings";

import { Container, Options, OptionsContainer } from "./styles";

export function Settings() {
  const theme = useTheme();
  const navigation = useNavigation<SettingsStackNavigationProps>();

  return (
    <Container>
      <OptionsContainer>
        <Options>
          <SettingsOption
            title="Conta"
            icon={
              <Feather name="user" size={20} color={theme.colors.mauve12} />
            }
            onPress={() => navigation.navigate("Account")}
          />
          <SettingsOption
            title="Notificações"
            icon={
              <Ionicons
                name="notifications-outline"
                size={20}
                color={theme.colors.mauve12}
              />
            }
            onPress={() => navigation.navigate("Notifications")}
          />
          <SettingsOption
            title="Aparência"
            icon={<Feather name="eye" size={20} color={theme.colors.mauve12} />}
            onPress={() => navigation.navigate("Appearence")}
          />
          <SettingsOption
            title="Sobre"
            icon={
              <AntDesign
                name="questioncircleo"
                size={20}
                color={theme.colors.mauve12}
              />
            }
            onPress={() => navigation.navigate("About")}
          />
        </Options>
      </OptionsContainer>
    </Container>
  );
}
