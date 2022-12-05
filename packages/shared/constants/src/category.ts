import { tuple } from "@encontrei/shared-utils";

export const categories = tuple(
  "Eletrônico",
  "Material escolar",
  "Roupas",
  "Outros"
);
export type ICategory = typeof categories[number];
