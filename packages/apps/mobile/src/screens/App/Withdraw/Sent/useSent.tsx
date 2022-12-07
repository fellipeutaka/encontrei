import { useCallback, useState } from "react";
import { ListRenderItemInfo, View } from "react-native";

import { Label } from "@encontrei/components/General/Label";
import { Feather } from "@encontrei/components/Icons/ExpoIcons";
import { useFetch } from "@encontrei/hooks/useFetch";
import { useToast } from "@encontrei/hooks/useToast";
import { supabase } from "@encontrei/lib/supabase";
import type { InventoryWithdraw } from "@encontrei/shared-constants";
import { getPublicUrl } from "@encontrei/shared-utils";
import { getItems } from "@encontrei/utils/getItems";

import { WithdrawItem } from "../components/WithdrawItem";

export function useSent() {
  const inventoryWithdrawQuery =
    getItems<InventoryWithdraw>("inventoryWithdraw");
  const { response, error, isLoading, mutate } = useFetch(
    inventoryWithdrawQuery
  );
  const [isRefreshing, setIsRefreshing] = useState(false);
  const toast = useToast();

  const handleRefreshList = useCallback(async () => {
    setIsRefreshing(true);
    try {
      await mutate();
    } catch (err) {
      console.error(err);
      toast({
        type: "error",
        message: "Ocorreu um erro ao buscar por seus pedidos",
      });
    } finally {
      setIsRefreshing(false);
    }
  }, []);

  const handleDeleteRequest = useCallback(async (id: string) => {
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
      toast({
        type: "error",
        message: "Ocorreu um erro ao cancelar seu pedido",
      });
    }
  }, []);

  if (error) {
    toast({
      type: "error",
      message: error.message,
    });
  }

  const renderListItem = useCallback(
    ({ item }: ListRenderItemInfo<InventoryWithdraw>) => (
      <WithdrawItem
        title={item.inventory.name}
        location={item.inventory.local}
        photoUrl={getPublicUrl(supabase, item.inventory.photoFilename)}
        onPress={async () => await handleDeleteRequest(item.id)}
        rightIcon={
          <Feather
            name="delete"
            size={24}
            className="text-zinc-900 dark:text-zinc-50"
          />
        }
      />
    ),
    []
  );

  const keyExtractorList = useCallback(
    (item: InventoryWithdraw) => item.id,
    []
  );

  const listEmptyComponent = useCallback(
    () => (
      <View className="flex-1 justify-center">
        <Label className="text-center text-xl">
          Não há nenhum item no momento
        </Label>
      </View>
    ),
    []
  );

  return {
    response,
    isLoading,
    isRefreshing,
    handleRefreshList,
    renderListItem,
    keyExtractorList,
    listEmptyComponent,
  };
}
