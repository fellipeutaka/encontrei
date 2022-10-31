import { useRef, useState } from "react";
import { Animated } from "react-native";
import {
  PinchGestureHandler,
  State,
  HandlerStateChangeEvent,
  PinchGestureHandlerEventPayload,
} from "react-native-gesture-handler";

import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "styled-components/native";

import Button from "@encontrei/components/Controllers/Button";
import { useHomeRouteParams } from "@encontrei/hooks/useHomeRouteParams";
import { supabase } from "@encontrei/lib/supabase";
import type { InventoryWithdraw } from "@encontrei/types/InventoryWithdraw";
import { formatDate } from "@encontrei/utils/formatDate";
import Toast from "@encontrei/utils/toast";

import {
  BackButton,
  Container,
  Content,
  DateTimeAndLocation,
  Description,
  DescriptionContent,
  GroupTitleAndDescription,
  Image,
  Info,
  Label,
  Row,
  Scroll,
  SubTitle,
  Title,
  TitleAndCategory,
} from "./styles";

export default function Details() {
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const navigation = useNavigation();
  const { params } = useHomeRouteParams<"Details">();
  const includedAt = formatDate(params.includedAt);
  const imageScaleRef = useRef(new Animated.Value(1));
  const onPinchEvent = Animated.event(
    [
      {
        nativeEvent: { scale: imageScaleRef.current },
      },
    ],
    {
      useNativeDriver: true,
    }
  );

  const onPinchStateChange = (
    event: HandlerStateChangeEvent<PinchGestureHandlerEventPayload>
  ) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      Animated.spring(imageScaleRef.current, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    }
  };

  async function handleRequestItem() {
    setLoading(true);
    try {
      const userId = supabase.auth.user()?.id;

      const { data } = await supabase
        .from<InventoryWithdraw>("inventoryWithdraw")
        .select("*")
        .match({
          inventoryId: params.id,
          userId,
        })
        .throwOnError();

      if (data?.length && data?.length > 0) {
        Toast("Erro", "Você já solicitou por esse item");
        setLoading(false);
      } else {
        await supabase
          .from<InventoryWithdraw>("inventoryWithdraw")
          .insert({
            inventoryId: params.id,
            userId,
          })
          .throwOnError();
        Toast("Sucesso", "Enviado com sucesso");
        navigation.goBack();
      }
    } catch (err) {
      Toast("Erro", "Ocorreu um erro. Tente novamente mais tarde");
      setLoading(false);
      console.error(err);
    }
  }

  return (
    <Container>
      <BackButton onPress={() => navigation.goBack()}>
        <Feather name="arrow-left" size={24} color="white" />
      </BackButton>
      <Scroll>
        <PinchGestureHandler
          onGestureEvent={onPinchEvent}
          onHandlerStateChange={onPinchStateChange}
        >
          <Image
            source={{ uri: params.photoUrl }}
            style={{ transform: [{ scale: imageScaleRef.current }] }}
          />
        </PinchGestureHandler>
        <Content>
          <Info>
            <GroupTitleAndDescription>
              <TitleAndCategory>
                <Title style={{ maxWidth: "85%" }}>{params.name}</Title>
                <Row>
                  <Feather name="cpu" size={16} color={theme.colors.mauve10} />
                  <SubTitle>{params.category}</SubTitle>
                </Row>
              </TitleAndCategory>
              <Description>
                <Title>Descrição</Title>
                <DescriptionContent>{params.description}</DescriptionContent>
              </Description>
            </GroupTitleAndDescription>
            <DateTimeAndLocation>
              <Row>
                <Feather
                  name="calendar"
                  size={16}
                  color={theme.colors.mauve10}
                />
                <Label>{includedAt.date}</Label>
              </Row>
              <Row style={{ marginVertical: 8 }}>
                <Feather name="clock" size={16} color={theme.colors.mauve10} />
                <Label>{includedAt.hour}</Label>
              </Row>
              <Row>
                <Feather
                  name="map-pin"
                  size={16}
                  color={theme.colors.mauve10}
                />
                <Label>{params.local}</Label>
              </Row>
            </DateTimeAndLocation>
          </Info>
          <Button
            style={{ width: "80%" }}
            isLoading={loading}
            onPress={handleRequestItem}
          >
            Solicitar
          </Button>
        </Content>
      </Scroll>
    </Container>
  );
}
