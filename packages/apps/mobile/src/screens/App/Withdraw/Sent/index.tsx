import { useState } from "react";
import { FlatList, View } from "react-native";

import { Feather } from "@expo/vector-icons";

import { useFetch } from "@encontrei/hooks/useFetch";
import { useToast } from "@encontrei/hooks/useToast";
import { supabase } from "@encontrei/lib/supabase";
import { Loading } from "@encontrei/screens/Loading";
import type { InventoryWithdraw } from "@encontrei/shared-constants";
import { getPublicUrl } from "@encontrei/shared-utils";
import { getItems } from "@encontrei/utils/getItems";

import { WithdrawItem } from "../components/WithdrawItem";

export function Sent() {
  const inventoryWithdrawQuery =
    getItems<InventoryWithdraw>("inventoryWithdraw");
  const { response, error, isLoading, mutate } = useFetch(
    inventoryWithdrawQuery
  );
  const [isRefreshing, setIsRefreshing] = useState(false);
  const toast = useToast();

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

  async function handleDeleteRequest(id: string) {
    try {
      await supabase
        .from("inventoryWithdraw")
        .delete()
        .match({ id })
        .throwOnError();
      await mutate();
      toast({
        type: "success",
        message: "Pedido cancelado",
      });
    } catch (err) {
      console.error(err);
    }
  }

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    toast({
      type: "error",
      message: error.message,
    });
  }

  return (
    <View className="flex-1 justify-center items-center p-6 bg-zinc-50 dark:bg-zinc-900">
      <FlatList
        data={response?.data}
        onRefresh={handleRefreshList}
        refreshing={isRefreshing}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <WithdrawItem
            title={item.inventory.name}
            location={item.inventory.local}
            photoUrl={getPublicUrl(supabase, item.inventory.photoFilename)}
            onPress={async () => await handleDeleteRequest(item.id)}
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
