import { Inventory } from "./Inventory";

export type InventoryWithdraw = {
  id: string;
  userId: string;
  inventoryId: string;
  requestedAt: string;
};

export type InventoryWithdrawSent = {
  id: string;
  inventory: Inventory;
  requestedAt: string;
  userId: string;
};

export type InventoryWithdrawItems = {
  requestedAt: string;
  onPress: () => void;
} & InventoryWithdrawSent;

export type InventoryWithdrawAccepted = {
  id: string;
  name: string;
  description: string;
  category: string;
  local: string;
  acceptedAt: string;
  photoFilename: string;
  userId: string;
};

export type InventoryWithdrawAcceptedItems = {
  onPress: () => void;
} & InventoryWithdrawAccepted;

export type InventoryWithdrawRefused = {
  id: string;
  name: string;
  description: string;
  category: string;
  local: string;
  refusedAt: string;
  photoFilename: string;
  userId: string;
};

export type InventoryWithdrawRefusedItems = {
  onPress: () => void;
} & InventoryWithdrawRefused;
