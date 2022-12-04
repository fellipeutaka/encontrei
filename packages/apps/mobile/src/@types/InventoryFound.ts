export type InventoryFoundSelect = {
  id: string;
  name: string;
  description: string;
  category: string;
  local: string;
  foundedAt: string;
  userId: string;
  photoFilename: string;
}

export type InventoryFoundInsert = {
  id?: string;
  name: string;
  description: string;
  category: string;
  local: string;
  foundAt?: string;
  userId: string;
  photoFilename: string;
}
