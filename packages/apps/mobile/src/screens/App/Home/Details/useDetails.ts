import { useState, useRef } from "react";
import { Animated } from "react-native";
import {
  HandlerStateChangeEvent,
  PinchGestureHandlerEventPayload,
  State,
} from "react-native-gesture-handler";

import { useNavigation } from "@react-navigation/native";

import { useHomeRouteParams } from "@encontrei/hooks/useHomeRouteParams";
import { useToast } from "@encontrei/hooks/useToast";
import { supabase } from "@encontrei/lib/supabase";
import {
  InventoryWithdraw,
  SupabaseInventoryWithdraw,
} from "@encontrei/shared-constants";
import { formatDate } from "@encontrei/utils/formatDate";

export function useDetails() {
  const [isRequesting, setIsRequesting] = useState(false);
  const { goBack } = useNavigation();
  const { params } = useHomeRouteParams<"Details">();
  const includedAt = formatDate(params.includedAt);
  const toast = useToast();
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
    const userId = supabase.auth.user()?.id;

    const { data, error } = await supabase
      .from<InventoryWithdraw>("inventoryWithdraw")
      .select("*")
      .match({
        inventoryId: params.id,
        userId,
      })
      .throwOnError();

    if (error) {
      setIsRequesting(false);
      return toast({
        message: "Ocorreu um erro. Tente novamente mais tarde",
        type: "error",
      });
    }

    if (data.length > 0) {
      setIsRequesting(false);
      return toast({
        message: "Você já solicitou por esse item",
        type: "error",
      });
    }
    await supabase
      .from<SupabaseInventoryWithdraw>("inventoryWithdraw")
      .insert({
        inventoryId: params.id,
        userId,
      })
      .throwOnError();
    toast({
      message: "Item solicitado com sucesso",
      type: "success",
    });
    goBack();
  }

  return {
    isRequesting,
    params,
    includedAt,
    imageScaleRef,
    goBack,
    onPinchEvent,
    onPinchStateChange,
    handleRequestItem,
  };
}
