import { User } from "./User";

export type SupabaseInventoryFound = {
  id: string;
  name: string;
  description: string;
  category: string;
  local: string;
  photoFilename: string;
  foundAt: string;
  userId: string;
};

export type InventoryFound = {
  user: User;
} & SupabaseInventoryFound;
