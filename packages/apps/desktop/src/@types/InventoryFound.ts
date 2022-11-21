import { User } from "./User";

export interface SupabaseInventoryFound {
  id: string;
  name: string;
  description: string;
  category: string;
  local: string;
  photoFilename: string;
  foundAt: string;
  userId: string;
}

export interface InventoryFound extends SupabaseInventoryFound {
  user: User;
}
