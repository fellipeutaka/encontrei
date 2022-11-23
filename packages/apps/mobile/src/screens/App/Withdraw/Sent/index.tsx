import { useEffect, useState } from "react";
import { FlatList, View } from "react-native";

import { Feather } from "@expo/vector-icons";

import type { InventoryWithdrawSent } from "@encontrei/@types/InventoryWithdraw";
import { Item } from "@encontrei/components/Layout/Item";
import { supabase } from "@encontrei/lib/supabase";
import { Loading } from "@encontrei/screens/Loading";
import { getImageUrl } from "@encontrei/utils/getImageUrl";
import Toast from "@encontrei/utils/toast";

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
  return data;
}

export function Sent() {
  const [items, setItems] = useState<InventoryWithdrawSent[] | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    fetchItems().then(setItems).catch(console.error);
  }, []);

  async function handleRefreshList() {
    setIsRefreshing(true);
    try {
      const items = await fetchItems();
      setItems(items);
    } catch (err) {
      console.error(err);
    } finally {
      setIsRefreshing(false);
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
      setItems((state) => state?.filter((item) => item.id !== id) ?? state);
    } catch (err) {
      console.error(err);
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
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Item
            title={item.inventory.name}
            location={item.inventory.local}
            photoUrl={item.inventory.photoFilename}
            onPress={() => {}}
            rightIcon={
              <Feather
                name="delete"
                className="w-6 h-6 text-zinc-900 dark:text-zinc-50"
              />
            }
          />
        )}
      />
    </View>
  );
}
