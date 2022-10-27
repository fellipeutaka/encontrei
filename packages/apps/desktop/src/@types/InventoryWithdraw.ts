import { Inventory } from "./Inventory";

export interface InventoryWithdraw {
  id: string
  user: {
    id: string
    email: string
    name: string
  }
  inventory: Inventory
  requestedAt: string
}

export interface Item extends InventoryWithdraw {
  inventory: Inventory & {
    date: string
    time: string
    photo: string
  }
}
