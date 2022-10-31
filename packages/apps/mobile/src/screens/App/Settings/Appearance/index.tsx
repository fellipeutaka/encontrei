import { useState } from "react";
import { Switch } from "react-native";

import { Feather } from "@expo/vector-icons";
import { useTheme } from "styled-components/native";

import SettingsOption from "@encontrei/components/General/SettingsOption";
import { useCustomTheme } from "@encontrei/hooks/useCustomTheme";

import { Container, Options, OptionsContainer } from "../styles";

export function Appearance() {
  const theme = useTheme();
  const { currentTheme, toggleTheme } = useCustomTheme();
  const [darkMode, setDarkMode] = useState(currentTheme === "dark");

  async function toggleDarkMode() {
    await toggleTheme();
    setDarkMode((state) => !state);
  }

  return (
    <Container>
      <OptionsContainer>
        <Options>
          <SettingsOption
            title="Tema escuro"
            icon={
              <Feather name="moon" size={20} color={theme.colors.mauve12} />
            }
            isTouchable={false}
            rightElement={
              <Switch
                value={darkMode}
                onValueChange={toggleDarkMode}
                trackColor={{
                  false: "#767676",
                  true: theme.colors.violet9,
                }}
                thumbColor="#FFFFFF"
              />
            }
          />
        </Options>
      </OptionsContainer>
    </Container>
  );
}
