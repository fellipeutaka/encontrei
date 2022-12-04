export type Inventory = {
  id: string;
  name: string;
  description: string;
  category: string;
  local: string;
  includedAt: string;
  photoFilename: string;
}

export type Item = {
  date: string;
  time: string;
  photo: string;
} & Inventory
