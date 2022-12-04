import { User } from "./User";

export type InventoryWithdrawAccepted = {
  id: string;
  name: string;
  description: string;
  category: string;
  local: string;
  acceptedAt: string;
  photoFilename: string;
  userId: string;
  user: User;
  isVisible: boolean;
};
