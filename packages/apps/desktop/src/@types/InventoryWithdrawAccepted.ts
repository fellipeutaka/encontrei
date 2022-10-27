export interface InventoryWithdrawAccepted {
  id: string;
  name: string;
  description: string;
  category: string;
  local: string;
  acceptedAt: string;
  photoFilename: string;
  userId: string;
  user: {
    email: string;
    name: string;
  };
}

export interface Item extends InventoryWithdrawAccepted {
  date: string;
  time: string;
  photo: string;
}
