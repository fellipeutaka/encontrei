import { tuple } from "./tuple";

export const categories = tuple(
  "Eletrônico",
  "Material escolar",
  "Roupas",
  "Outros"
);
export type ICategory = typeof categories[number];
