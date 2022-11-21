import { User } from "./User";

export interface InventoryWithdrawAccepted {
  id: string;
  name: string;
  description: string;
  category: string;
  local: string;
  acceptedAt: string;
  photoFilename: string;
  userId: string;
  user: User;
}
