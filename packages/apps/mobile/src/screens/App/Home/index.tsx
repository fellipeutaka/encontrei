import { FlatList, Pressable, View } from "react-native";

import { MotiView as Container } from "moti";
import { styled } from "nativewind";

import { Ionicons } from "@encontrei/components/Icons/ExpoIcons";
import { Loading } from "@encontrei/screens/Loading";

import { useHome } from "./useHome";

const MotiView = styled(Container);

export function Home() {
  const {
    response,
    isLoading,
    isRefreshing,
    buttonAnimatedState,
    handleRefreshList,
    handleAnimateButton,
    renderListItem,
    keyExtractorList,
    listEmptyComponent,
    navigate,
  } = useHome();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <View className="flex-1 justify-center items-center p-6 bg-zinc-50 dark:bg-zinc-900">
      <FlatList
        data={response?.data}
        onRefresh={handleRefreshList}
        refreshing={isRefreshing}
        ListEmptyComponent={listEmptyComponent}
        keyExtractor={keyExtractorList}
        renderItem={renderListItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 32, flex: 1 }}
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
          <Ionicons name="add" size={32} className="text-white" />
        </Pressable>
      </MotiView>
    </View>
  );
}
