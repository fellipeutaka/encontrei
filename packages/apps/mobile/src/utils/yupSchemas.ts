import * as Yup from "yup";

import { nameRegex } from "./regex";

export const signInSchema = Yup.object().shape({
  password: Yup.string().required("Senha é obrigatória"),
  email: Yup.string()
    .email("Digite um e-mail válido")
    .required("E-mail é obrigatório"),
});

export const signUpSchema = Yup.object().shape({
  password: Yup.string()
    .required("Senha é obrigatória")
    .min(6, "Senha precisa ter no mínimo 6 caracteres"),
  email: Yup.string()
    .required("E-mail é obrigatório")
    .email("Digite um e-mail válido"),
  name: Yup.string()
    .trim()
    .required("Nome é obrigatório")
    .min(2, "Nome precisa ter no mínimo 2 caracteres")
    .matches(nameRegex, "Nome inválido"),
});

export const addSchema = Yup.object().shape({
  photoUrl: Yup.string().required("Foto é obrigatória").nullable(),
  local: Yup.string().required("Local é obrigatório").nullable(),
  category: Yup.string().required("Categoria é obrigatória").nullable(),
  description: Yup.string().trim().required("Descrição é obrigatória"),
  name: Yup.string().trim().required("Nome é obrigatório"),
});
