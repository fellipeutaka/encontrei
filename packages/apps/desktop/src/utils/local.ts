import { tuple } from "./tuple";

export const locals = tuple("Pátio", "Quadra", "Cantina", "Sala 9", "Lab 3");
export type ILocal = typeof locals[number];
