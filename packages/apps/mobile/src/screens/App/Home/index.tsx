import { useEffect, useState } from "react";
import { FlatList, Pressable, View } from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { MotiView, useAnimationState } from "moti";
import { Inventory } from "src/@types/Inventory";
import { HomeStackNavigationProps } from "src/@types/routes/NavigationProps/App/Home";

import { Item } from "@encontrei/components/Layout/Item";
import { Loading } from "@encontrei/screens/Loading";
import { getImageUrl } from "@encontrei/utils/getImageUrl";
import { getItems } from "@encontrei/utils/getItems";

export function Home() {
  const [items, setItems] = useState<Inventory[] | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { navigate } = useNavigation<HomeStackNavigationProps>();
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

  useEffect(() => {
    getItems<Inventory>("inventory").then(setItems).catch(console.error);
  }, []);

  function handleAnimateButton(state: "pressIn" | "pressOut") {
    buttonAnimatedState.transitionTo(state);
  }

  async function handleRefreshList() {
    setIsRefreshing(true);
    try {
      const items = await getItems<Inventory>("inventory");
      setItems(items);
    } catch (err) {
      console.error(err);
    } finally {
      setIsRefreshing(false);
    }
  }

  if (!items) {
    return <Loading />;
  }

  return (
    <View className="flex-1 justify-center items-center p-6 bg-zinc-50 dark:bg-zinc-900">
      <FlatList
        data={items}
        onRefresh={handleRefreshList}
        refreshing={isRefreshing}
        ListEmptyComponent={null}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Item
            title={item.name}
            location={item.local}
            photoUrl={getImageUrl("inventory/" + item.photoFilename)}
            onPress={() =>
              navigate("Details", {
                ...item,
                photoUrl: getImageUrl(item.photoFilename),
              })
            }
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
