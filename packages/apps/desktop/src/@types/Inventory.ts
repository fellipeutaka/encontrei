export interface Inventory {
  id: string;
  name: string;
  description: string;
  category: string;
  local: string;
  includedAt: string;
  photoFilename: string;
}

export interface Item extends Inventory {
  date: string;
  time: string;
  photo: string;
}
