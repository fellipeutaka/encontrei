import { useCallback, useState } from "react";
import { ListRenderItemInfo, View } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { useAnimationState } from "moti";

import { HomeStackNavigationProps } from "@encontrei/@types/routes/NavigationProps/App/Home";
import { Label } from "@encontrei/components/General/Label";
import { useFetch } from "@encontrei/hooks/useFetch";
import { useToast } from "@encontrei/hooks/useToast";
import { Inventory } from "@encontrei/shared-constants";
import { getItems } from "@encontrei/utils/getItems";

import { WithdrawItem } from "../Withdraw/components/WithdrawItem";

export function useHome() {
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

  const handleAnimateButton = useCallback((state: "pressIn" | "pressOut") => {
    buttonAnimatedState.transitionTo(state);
  }, []);

  const handleRefreshList = useCallback(async () => {
    setIsRefreshing(true);
    try {
      await mutate();
    } catch (err) {
      console.error(err);
      toast({
        type: "error",
        message: "Ocorreu um erro ao buscar os itens perdidos",
      });
    } finally {
      setIsRefreshing(false);
    }
  }, []);

  if (error) {
    toast({
      type: "error",
      message: error.message,
    });
  }

  const renderListItem = useCallback(
    ({ item }: ListRenderItemInfo<Inventory>) => (
      <WithdrawItem
        title={item.name}
        location={item.local}
        photoUrl={item.photoFilename}
        onPress={() => navigate("Details", item)}
      />
    ),
    []
  );

  const keyExtractorList = useCallback((item: Inventory) => item.id, []);

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
    buttonAnimatedState,
    handleRefreshList,
    renderListItem,
    keyExtractorList,
    listEmptyComponent,
    handleAnimateButton,
    navigate,
  };
}
