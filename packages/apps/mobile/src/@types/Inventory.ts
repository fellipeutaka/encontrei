<<<<<<< HEAD:packages/apps/mobile/src/@types/Inventory.ts
export type Inventory = {
=======
export type InventorySelect = {
>>>>>>> 83adbd0 (Linted all project):packages/apps/mobile/src/types/Inventory.ts
  id: string;
  name: string;
  description: string;
  category: string;
  local: string;
  includedAt: string;
  photoFilename: string;
<<<<<<< HEAD:packages/apps/mobile/src/@types/Inventory.ts
};
=======
}

export type Inventory = {
  onPress: () => void;
} & InventorySelect
>>>>>>> 83adbd0 (Linted all project):packages/apps/mobile/src/types/Inventory.ts
