import { FlatList, View } from "react-native";

import { Loading } from "@encontrei/screens/Loading";

import { useRefused } from "./useRefused";

export function Refused() {
  const {
    response,
    isLoading,
    isRefreshing,
    handleRefreshList,
    renderListItem,
    keyExtractorList,
    listEmptyComponent,
  } = useRefused();

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
    </View>
  );
}
