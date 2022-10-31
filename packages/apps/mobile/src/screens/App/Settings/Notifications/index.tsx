import { useState } from "react";
import { Switch } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "styled-components/native";

import SettingsOption from "@encontrei/components/General/SettingsOption";
import { ScrollIcon } from "@encontrei/components/Icons/ScrollIcon";

import { Container, Options, OptionsContainer } from "../styles";

export function Notifications() {
  const theme = useTheme();
  const [orderNotification, setOrderNotification] = useState(true);

  async function toggleNotification() {
    await AsyncStorage.setItem(
      "@encontrei/orderNotification",
      String(orderNotification)
    );
    setOrderNotification((state) => !state);
  }

  return (
    <Container>
      <OptionsContainer>
        <Options>
          <SettingsOption
            title="Pedidos"
            icon={<ScrollIcon color={theme.colors.mauve12} />}
            isTouchable={false}
            rightElement={
              <Switch
                value={orderNotification}
                onValueChange={toggleNotification}
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
