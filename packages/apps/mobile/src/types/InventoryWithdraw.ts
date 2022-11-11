import { Inventory } from "./Inventory";

export interface InventoryWithdraw {
  id: string;
  userId: string;
  inventoryId: string;
  requestedAt: string;
}

export interface InventoryWithdrawSent {
  id: string;
  inventory: Inventory;
  requestedAt: string;
  userId: string;
}

export interface InventoryWithdrawItems extends InventoryWithdrawSent {
  requestedAt: string;
  onPress: () => void;
}

export interface InventoryWithdrawAccepted {
  id: string;
  name: string;
  description: string;
  category: string;
  local: string;
  acceptedAt: string;
  photoFilename: string;
  userId: string;
}

export interface InventoryWithdrawAcceptedItems
  extends InventoryWithdrawAccepted {
  onPress: () => void;
}

export interface InventoryWithdrawRefused {
  id: string;
  name: string;
  description: string;
  category: string;
  local: string;
  refusedAt: string;
  photoFilename: string;
  userId: string;
}

export interface InventoryWithdrawRefusedItems
  extends InventoryWithdrawRefused {
  onPress: () => void;
}
