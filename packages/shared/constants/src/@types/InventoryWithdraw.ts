import { Inventory } from "./Inventory";
import { User } from "./User";

export type SupabaseInventoryWithdraw = {
  id: string;
  userId: string;
  inventoryId: string;
  requestedAt: string;
}

export type InventoryWithdraw = {
  id: string;
  user: User;
  inventory: Inventory;
  requestedAt: string;
}
