import { useEffect, useState } from "react";

import {
  InventoryWithdrawAccepted,
  InventoryWithdrawAcceptedItems,
} from "src/@types/InventoryWithdraw";
import { useTheme } from "styled-components/native";

import Spinner from "@encontrei/components/General/Spinner";
import { Feather } from "@encontrei/components/Icons/ExpoIcons";
import { Center } from "@encontrei/components/Layout/Center";
import { supabase } from "@encontrei/lib/supabase";
import { Container, ItemsContainer } from "@encontrei/screens/App/Home/styles";
import { getPublicUrl } from "@encontrei/shared-utils";
import { capitalizeFirstLetter } from "@encontrei/utils/capitalizeFirstLetter";

import { WithdrawItem } from "../components/WithdrawItem";
import { ItemList } from "./styles";

async function fetchItems() {
  const userId = supabase.auth.user()?.id;
  const { data } = await supabase
    .from<InventoryWithdrawAccepted>("inventoryWithdrawAccepted")
    .select()
    .match({
      userId,
      isVisible: true,
    })
    .throwOnError();
  return data ?? [];
}

export function Accepted() {
  const theme = useTheme();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [items, setItems] = useState<InventoryWithdrawAcceptedItems[]>([]);

  async function handleDeleteRequest(id: string) {
    try {
      await supabase
        .from("inventoryWithdrawAccepted")
        .update({ isVisible: false })
        .match({ id })
        .throwOnError();
      setItems((state) => state.filter((item) => item.id !== id));
    } catch (err) {
      console.error(err);
    }
  }

  async function setItemsList() {
    try {
      const items = await fetchItems();
      const itemsList = items.map((item) => ({
        ...item,
        category: capitalizeFirstLetter(item.category),
        local: capitalizeFirstLetter(item.local),
        photoFilename: getPublicUrl(supabase, item.photoFilename),
        onPress() {
          void handleDeleteRequest(item.id);
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
                title={item.name}
                location={item.local}
                photoUrl={item.photoFilename}
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
