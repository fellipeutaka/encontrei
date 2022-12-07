import { useCallback, useState } from "react";
import { ListRenderItemInfo, View } from "react-native";

import { Label } from "@encontrei/components/General/Label";
import { Feather } from "@encontrei/components/Icons/ExpoIcons";
import { useFetch } from "@encontrei/hooks/useFetch";
import { useToast } from "@encontrei/hooks/useToast";
import { supabase } from "@encontrei/lib/supabase";
import type { InventoryWithdrawAccepted } from "@encontrei/shared-constants";
import { getItems } from "@encontrei/utils/getItems";

import { WithdrawItem } from "../components/WithdrawItem";

export function useAccepted() {
  const inventoryWithdrawAcceptedQuery = getItems<InventoryWithdrawAccepted>(
    "inventoryWithdrawAccepted"
  );
  const { response, error, isLoading, mutate } = useFetch(
    inventoryWithdrawAcceptedQuery
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
        message: "Ocorreu um erro ao buscar por seus pedidos aceitos",
      });
    } finally {
      setIsRefreshing(false);
    }
  }, []);

  const handleDeleteRequest = useCallback(async (id: string) => {
    try {
      await supabase
        .from<InventoryWithdrawAccepted>("inventoryWithdrawAccepted")
        .update({ isVisible: false })
        .match({ id })
        .throwOnError();
      await mutate();
      toast({
        type: "success",
        message: "Item excluído do histórico com sucesso!",
      });
    } catch (err) {
      console.error(err);
      toast({
        type: "error",
        message: "Ocorreu um erro ao excluir do histórico com sucesso",
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
    ({ item }: ListRenderItemInfo<InventoryWithdrawAccepted>) => (
      <WithdrawItem
        title={item.name}
        location={item.local}
        photoUrl={item.photoFilename}
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
    (item: InventoryWithdrawAccepted) => item.id,
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
