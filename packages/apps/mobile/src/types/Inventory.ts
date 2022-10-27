export interface InventorySelect {
  id: string;
  name: string;
  description: string;
  category: string;
  local: string;
  includedAt: string;
  photoFilename: string;
}

export interface Inventory extends InventorySelect {
  onPress: () => void;
}
