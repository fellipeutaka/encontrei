import { z } from "zod";

import { nameRegex } from "./regex";

export const name = z
  .string({
    required_error: "Nome é obrigatória!",
  })
  .trim()
  .min(1, "Nome é obrigatória!")
  .regex(nameRegex, "Nome inválido!");

export const email = z
  .string({
    required_error: "E-mail é obrigatório!",
  })
  .trim()
  .min(1, "E-mail é obrigatório!")
  .email("E-mail inválido!");

export const password = z
  .string({
    required_error: "Senha é obrigatória!",
  })
  .trim()
  .min(1, "Senha é obrigatória!");

export const description = z
  .string({
    required_error: "Descrição é obrigatória!",
  })
  .trim()
  .min(1, "Descrição é obrigatória!")
  .max(26, "Descrição muito longa!");

export const category = z.string({
  required_error: "Categoria é obrigatória!",
});

export const local = z.string({
  required_error: "Categoria é obrigatória!",
});

export const photoUrl = z.string({
  required_error: "Foto é obrigatória!",
});
