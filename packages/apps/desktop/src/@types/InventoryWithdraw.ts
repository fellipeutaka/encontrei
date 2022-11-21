import { Inventory } from "./Inventory";
import { User } from "./User";

export interface SupabaseInventoryWithdraw {
  id: string;
  userId: string;
  inventoryId: string;
  requestedAt: string;
}

export interface InventoryWithdraw {
  id: string;
  user: User;
  inventory: Inventory;
  requestedAt: string;
}
