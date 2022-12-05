import { useState } from "react";
import { FlatList, Pressable, View } from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { MotiView, useAnimationState } from "moti";
import { Query } from "supabase-swr";

import { HomeStackNavigationProps } from "@encontrei/@types/routes/NavigationProps/App/Home";
import { useFetch } from "@encontrei/hooks/useFetch";
import { useToast } from "@encontrei/hooks/useToast";
import { WithdrawItem } from "@encontrei/screens/App/Withdraw/components/WithdrawItem";
import { Loading } from "@encontrei/screens/Loading";
import { Inventory } from "@encontrei/shared-constants";
import { getItems } from "@encontrei/utils/getItems";

export function Home() {
  const inventoryQuery = getItems("inventory") as Query<Inventory>;
  const { response, error, isLoading, mutate } =
    useFetch<Inventory>(inventoryQuery);
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
