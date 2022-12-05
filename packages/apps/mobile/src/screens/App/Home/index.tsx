import { useState } from "react";
import { FlatList, Pressable, View } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { MotiView as Container, useAnimationState } from "moti";
import { styled } from "nativewind";

import { HomeStackNavigationProps } from "@encontrei/@types/routes/NavigationProps/App/Home";
import { Ionicons } from "@encontrei/components/Icons/ExpoIcons";
import { useFetch } from "@encontrei/hooks/useFetch";
import { useToast } from "@encontrei/hooks/useToast";
import { WithdrawItem } from "@encontrei/screens/App/Withdraw/components/WithdrawItem";
import { Loading } from "@encontrei/screens/Loading";
import { Inventory } from "@encontrei/shared-constants";
import { getItems } from "@encontrei/utils/getItems";

const MotiView = styled(Container);

export function Home() {
  const inventoryQuery = getItems<Inventory>("inventory");
  const { response, error, isLoading, mutate } = useFetch(inventoryQuery);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { navigate } = useNavigation<HomeStackNavigationProps>();
  const toast = useToast();
  const buttonAnimatedState = useAnimationState({
    pressIn: {
      opacity: 0.7,
      transform: [{ scale: 0.8 }],
    },
    pressOut: {
      opacity: 1,
      transform: [{ scale: 1 }],
    },
  });

  function handleAnimateButton(state: "pressIn" | "pressOut") {
    buttonAnimatedState.transitionTo(state);
  }

  async function handleRefreshList() {
    setIsRefreshing(true);
    try {
      await mutate();
    } catch (err) {
      console.error(err);
    } finally {
      setIsRefreshing(false);
    }
  }

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    toast({
      message: error.message,
      type: "error",
    });
  }

  return (
    <View className="flex-1 justify-center items-center p-6 bg-zinc-50 dark:bg-zinc-900">
      <FlatList
        data={response?.data}
        onRefresh={handleRefreshList}
        refreshing={isRefreshing}
        ListEmptyComponent={null}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <WithdrawItem
            title={item.name}
            location={item.local}
            photoUrl={item.photoFilename}
            onPress={() => navigate("Details", item)}
          />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 32 }}
      />
      <MotiView
        className="h-14 w-14 bottom-4 right-4 justify-center items-center rounded-full bg-violet-600 absolute"
        state={buttonAnimatedState}
      >
        <Pressable
          onPressIn={() => handleAnimateButton("pressIn")}
          onPressOut={() => handleAnimateButton("pressOut")}
          onPress={() => navigate("Add")}
        >
          <Ionicons name="add" size={32} color="white" />
        </Pressable>
      </MotiView>
    </View>
  );
}
