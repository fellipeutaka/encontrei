import { useEffect, useState } from "react";

import { Feather } from "@expo/vector-icons";
import { useTheme } from "styled-components/native";

import Spinner from "@encontrei/components/General/Spinner";
import { Center } from "@encontrei/components/Layout/Center";
import Item from "@encontrei/components/Layout/Item";
import { supabase } from "@encontrei/lib/supabase";
import { Container, ItemsContainer } from "@encontrei/screens/App/Home/styles";
import {
  InventoryWithdrawItems,
  InventoryWithdrawSent,
} from "@encontrei/types/InventoryWithdraw";
import { capitalizeFirstLetter } from "@encontrei/utils/capitalizeFirstLetter";
import { getImageUrl } from "@encontrei/utils/getImageUrl";
import Toast from "@encontrei/utils/toast";

import { ItemList } from "./styles";

async function fetchItems() {
  const userId = supabase.auth.user()?.id;
  const { data } = await supabase
    .from<InventoryWithdrawSent>("inventoryWithdraw")
    .select(
      `
        id, userId, requestedAt,
        inventory:inventoryId ( * )
      `
    )
    .match({
      userId,
    })
    .throwOnError();
  return data ?? [];
}

export default function Sent() {
  const theme = useTheme();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [items, setItems] = useState<InventoryWithdrawItems[]>([]);

  async function setItemsList() {
    try {
      const items = await fetchItems();
      const list = items.map((item) => ({
        ...item,
        inventory: {
          ...item.inventory,
          category: capitalizeFirstLetter(item.inventory.category),
          local: capitalizeFirstLetter(item.inventory.local),
          photoFilename: getImageUrl(
            "inventory/" + item.inventory.photoFilename
          ),
        },
        requestedAt: item.requestedAt,
        onPress() {
          void handleDeleteRequest(item.id);
        },
      }));
      setItems(list);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    setItemsList().finally(() => setLoading(false));
  }, []);

  async function handleRefreshList() {
    setRefreshing(true);
    try {
      await setItemsList();
    } finally {
      setRefreshing(false);
    }
  }

  async function handleDeleteRequest(id: string) {
    try {
      await supabase
        .from("inventoryWithdraw")
        .delete()
        .match({ id })
        .throwOnError();
      Toast("Sucesso", "Pedido cancelado");
      setItems((state) => state.filter((item) => item.id !== id));
    } catch (err) {
      console.error(err);
    }
  }

  const listIsEmpty = items.length === 0;

  function renderContent() {
    if (loading) {
      return (
        <Center>
          <Spinner />
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
                title={item.inventory.name}
                location={item.inventory.local}
                photoUrl={item.inventory.photoFilename}
                onPress={item.onPress}
                rightIcon={
                  <Feather
                    name="delete"
                    size={24}
                    color={theme.colors.mauve12}
                  />
                }
              />
            )}
          />
        </ItemsContainer>
      );
    }
  }

  return <Container>{renderContent()}</Container>;
}
