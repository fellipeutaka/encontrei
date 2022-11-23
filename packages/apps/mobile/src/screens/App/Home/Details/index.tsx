import { useRef, useState } from "react";
import {
  Animated,
  ScrollView,
  TouchableOpacity,
  View,
  Dimensions,
  Text,
} from "react-native";
import {
  PinchGestureHandler,
  State,
  HandlerStateChangeEvent,
  PinchGestureHandlerEventPayload,
} from "react-native-gesture-handler";

import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import type { InventoryWithdraw } from "@encontrei/@types/InventoryWithdraw";
import * as Button from "@encontrei/components/Controllers/Button";
import { useHomeRouteParams } from "@encontrei/hooks/useHomeRouteParams";
import { supabase } from "@encontrei/lib/supabase";
import { formatDate } from "@encontrei/utils/formatDate";
import Toast from "@encontrei/utils/toast";

export function Details() {
  const [isRequesting, setIsRequesting] = useState(false);
  const { goBack } = useNavigation();
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
    setIsRequesting(true);
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
        setIsRequesting(false);
      } else {
        await supabase
          .from<InventoryWithdraw>("inventoryWithdraw")
          .insert({
            inventoryId: params.id,
            userId,
          })
          .throwOnError();
        Toast("Sucesso", "Enviado com sucesso");
        goBack();
      }
    } catch (err) {
      Toast("Erro", "Ocorreu um erro. Tente novamente mais tarde");
      setIsRequesting(false);
      console.error(err);
    }
  }

  return (
    <View className="flex-1 bg-zinc-50 dark:bg-zinc-900">
      <TouchableOpacity
        className="absolute top-12 left-3 z-50 w-8 h-8 justify-center items-center rounded-full bg-black/20"
        onPress={goBack}
      >
        <Feather name="arrow-left" size={24} color="white" />
      </TouchableOpacity>
      <ScrollView>
        <PinchGestureHandler
          onGestureEvent={onPinchEvent}
          onHandlerStateChange={onPinchStateChange}
        >
          <Animated.Image
            source={{ uri: params.photoUrl }}
            style={{
              width: Dimensions.get("screen").width,
              height: Dimensions.get("screen").height,
              zIndex: 99,
              transform: [{ scale: imageScaleRef.current }],
            }}
          />
        </PinchGestureHandler>
        <View className="flex-1 w-full h-full justify-between items-center pt-9 pb-8">
          <View className="w-4/5 mb-8 flex-row justify-between">
            <View>
              <View>
                <Text className="max-w-[80%] text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                  {params.name}
                </Text>
                <View className="flex-row items-center">
                  <Feather name="cpu" className="w-4 h4 text-zinc-600" />
                  <Text className="text-xl ml-1.5 text-zinc-800 dark:text-zinc-100">
                    {params.category}
                  </Text>
                </View>
              </View>
              <View className="mt-12">
                <Text className="max-w-[80%] text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                  Descrição
                </Text>
                <Text className="text-xl text-zinc-800 dark:text-zinc-100">
                  {params.description}
                </Text>
              </View>
            </View>
            <View className="absolute right-0">
              <View className="flex-row items-center">
                <Feather name="calendar" className="w-4 h4 text-zinc-600" />
                <Text className="text-base ml-1.5 text-zinc-800 dark:text-zinc-100">
                  {includedAt.date}
                </Text>
              </View>
              <View className="flex-row items-center my-2">
                <Feather name="clock" className="w-4 h4 text-zinc-600" />
                <Text className="text-base ml-1.5 text-zinc-800 dark:text-zinc-100">
                  {includedAt.hour}
                </Text>
              </View>
              <View className="flex-row items-center">
                <Feather name="map-pin" className="w-4 h4 text-zinc-600" />
                <Text className="text-base ml-1.5 text-zinc-800 dark:text-zinc-100">
                  {params.local}
                </Text>
              </View>
            </View>
          </View>
          <Button.Root
            className="w-4/5"
            isLoading={isRequesting}
            onPress={handleRequestItem}
          >
            <Button.Text>Solicitar</Button.Text>
          </Button.Root>
        </View>
      </ScrollView>
    </View>
  );
}
