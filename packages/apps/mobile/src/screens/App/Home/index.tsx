import { useEffect, useState } from "react";
import { ActivityIndicator, Pressable } from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useAnimationState } from "moti";
import { useTheme } from "styled-components/native";

import { Center } from "@encontrei/components/Layout/Center";
import Item from "@encontrei/components/Layout/Item";
import { supabase } from "@encontrei/lib/supabase";
import { Inventory, InventorySelect } from "@encontrei/types/Inventory";
import { HomeStackNavigationProps } from "@encontrei/types/routes/NavigationProps/App/Home";
import { capitalizeFirstLetter } from "@encontrei/utils/capitalizeFirstLetter";
import { getImageUrl } from "@encontrei/utils/getImageUrl";

import { AddButton, Container, ItemList, ItemsContainer } from "./styles";

async function fetchItems() {
  const { data } = await supabase
    .from<InventorySelect>("inventory")
    .select()
    .throwOnError();
  return data ?? [];
}

export default function Home() {
  const theme = useTheme();
  const navigation = useNavigation<HomeStackNavigationProps>();
  const [items, setItems] = useState<Inventory[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
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

  async function setItemsList() {
    try {
      const items = await fetchItems();
      const itemsList = items.map((item) => ({
        ...item,
        onPress() {
          navigation.navigate("Details", {
            id: item.id,
            name: item.name,
            description: item.description,
            includedAt: item.includedAt,
            category: capitalizeFirstLetter(item.category),
            local: capitalizeFirstLetter(item.local),
            photoUrl: getImageUrl("inventory/" + item.photoFilename),
          });
        },
      }));
      setItems(itemsList);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    setItemsList().finally(() => setLoading(false));
  }, []);

  function handleAnimateButton(state: "pressIn" | "pressOut") {
    buttonAnimatedState.transitionTo(state);
  }

  async function handleRefreshList() {
    setRefreshing(true);
    try {
      await setItemsList();
    } finally {
      setRefreshing(false);
    }
  }

  const listIsEmpty = items.length === 0;

  function renderContent() {
    if (loading) {
      return (
        <Center>
          <ActivityIndicator size="large" color={theme.colors.violet9} />
        </Center>
      );
    } else if (listIsEmpty) {
      return (
        <ItemsContainer>
          <ItemList
            data={items}
            onRefresh={handleRefreshList}
            refreshing={refreshing}
            keyExtractor={(item) => item.id}
            renderItem={() => <Center />}
          />
        </ItemsContainer>
      );
    } else {
      return (
        <ItemsContainer>
          <ItemList
            data={items}
            onRefresh={handleRefreshList}
            refreshing={refreshing}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Item
                title={item.name}
                location={capitalizeFirstLetter(item.local)}
                photoUrl={getImageUrl("inventory/" + item.photoFilename)}
                onPress={item.onPress}
              />
            )}
          />
        </ItemsContainer>
      );
    }
  }

  return (
    <Container>
      {renderContent()}
      <AddButton state={buttonAnimatedState}>
        <Pressable
          onPressIn={() => handleAnimateButton("pressIn")}
          onPressOut={() => handleAnimateButton("pressOut")}
          onPress={() => navigation.navigate("Add")}
        >
          <Ionicons name="add" size={32} color="white" />
        </Pressable>
      </AddButton>
    </Container>
  );
}
