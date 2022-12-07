import {
  Animated,
  ScrollView,
  TouchableOpacity,
  View,
  Dimensions,
  Text,
} from "react-native";
import { PinchGestureHandler } from "react-native-gesture-handler";

import * as Button from "@encontrei/components/Controllers/Button";
import { Feather } from "@encontrei/components/Icons/ExpoIcons";
import { supabase } from "@encontrei/lib/supabase";
import { getPublicUrl } from "@encontrei/shared-utils";

import { useDetails } from "./useDetails";

export function Details() {
  const {
    goBack,
    handleRequestItem,
    includedAt,
    isRequesting,
    onPinchEvent,
    onPinchStateChange,
    params,
    imageScaleRef,
  } = useDetails();

  return (
    <View className="flex-1 bg-zinc-50 dark:bg-zinc-900">
      <TouchableOpacity
        className="absolute top-12 left-3 z-50 w-8 h-8 justify-center items-center rounded-full bg-black/20"
        onPress={goBack}
      >
        <Feather name="arrow-left" size={24} className="text-white" />
      </TouchableOpacity>
      <ScrollView>
        <PinchGestureHandler
          onGestureEvent={onPinchEvent}
          onHandlerStateChange={onPinchStateChange}
        >
          <Animated.Image
            source={{ uri: getPublicUrl(supabase, params.photoFilename) }}
            style={{
              width: Dimensions.get("screen").width,
              height: Dimensions.get("screen").width,
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
                  <Feather name="cpu" size={16} className="text-zinc-600" />
                  <Text className="text-lg ml-1.5 text-zinc-800 dark:text-zinc-100">
                    {params.category}
                  </Text>
                </View>
              </View>
              <View className="mt-12">
                <Text className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                  Descrição
                </Text>
                <Text className="text-lg text-zinc-800 dark:text-zinc-100">
                  {params.description}
                </Text>
              </View>
            </View>
            <View className="absolute right-0">
              <View className="flex-row items-center">
                <Feather name="calendar" size={16} className="text-zinc-600" />
                <Text className="text-base ml-1.5 text-zinc-800 dark:text-zinc-100">
                  {includedAt.date}
                </Text>
              </View>
              <View className="flex-row items-center my-2">
                <Feather name="clock" size={16} className="text-zinc-600" />
                <Text className="text-base ml-1.5 text-zinc-800 dark:text-zinc-100">
                  {includedAt.hour}
                </Text>
              </View>
              <View className="flex-row items-center">
                <Feather name="map-pin" size={16} className="text-zinc-600" />
                <Text className="text-base ml-1.5 text-zinc-800 dark:text-zinc-100">
                  {params.local}
                </Text>
              </View>
            </View>
          </View>
          <Button.Root
            className="h-16 w-4/5"
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
