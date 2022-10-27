export interface InventoryFound {
  id: string;
  name: string;
  description: string;
  category: string;
  local: string;
  foundAt: string;
  userId: string;
  photoFilename: string;
  user: {
    email: string;
    name: string;
  };
}

export interface Item extends InventoryFound {
  date: string;
  time: string;
  photo: string;
}
