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
<<<<<<< HEAD:packages/apps/mobile/src/@types/InventoryWithdraw.ts
} & InventoryWithdrawSent;
=======
} & InventoryWithdrawSent
>>>>>>> 83adbd0 (Linted all project):packages/apps/mobile/src/types/InventoryWithdraw.ts

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
<<<<<<< HEAD:packages/apps/mobile/src/@types/InventoryWithdraw.ts
} & InventoryWithdrawAccepted;
=======
} & InventoryWithdrawAccepted
>>>>>>> 83adbd0 (Linted all project):packages/apps/mobile/src/types/InventoryWithdraw.ts

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
<<<<<<< HEAD:packages/apps/mobile/src/@types/InventoryWithdraw.ts
} & InventoryWithdrawRefused;
=======
} & InventoryWithdrawRefused
>>>>>>> 83adbd0 (Linted all project):packages/apps/mobile/src/types/InventoryWithdraw.ts
