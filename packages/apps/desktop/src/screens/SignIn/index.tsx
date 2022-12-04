import { useForm } from "react-hook-form";
import { BiLockAlt } from "react-icons/bi";
import { BsEnvelope } from "react-icons/bs";

import { motion } from "framer-motion";
import Lottie from "lottie-react";

import research from "@encontrei/assets/research.json";
import { Button } from "@encontrei/components/Button";
import * as TextField from "@encontrei/components/TextField";
import { supabase } from "@encontrei/lib/supabase";

type IInputs = {
  email: string;
  password: string;
};

export default function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IInputs>();

  async function signIn({ email, password }: IInputs) {
    const { error } = await supabase.auth.signIn({
      email,
      password,
    });
    if (error) {
      window.Main.showError(error.message);
    }
  }

  return (
    <motion.main
      className="flex flex-col justify-center items-center h-screen py-16"
      initial={{ opacity: 0, paddingRight: 128 }}
      animate={{ opacity: 1, paddingRight: 0 }}
    >
      <h1 className="text-7xl font-semibold">Encontrei</h1>
      <Lottie animationData={research} loop className="w-1/4 h-1/4 my-16" />
      <form
        className="flex flex-col gap-8 w-full max-w-lg"
        onSubmit={handleSubmit(signIn)}
      >
        <div className="flex flex-col gap-4">
          <label className="text-3xl font-semibold max-w-fit" htmlFor="email">
            E-mail
          </label>
          <TextField.Root className="h-14" aria-invalid={Boolean(errors.email)}>
            <BsEnvelope className="w-6 h-6 text-zinc-400" />
            <TextField.Input
              id="email"
              placeholder="E-mail"
              {...register("email", {
                required: "E-mail é obrigatório!",
                pattern: /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i,
              })}
            />
          </TextField.Root>
          <span className="text-red-600 font-bold -mt-2">
            {errors.email?.message}
          </span>
        </div>
        <div className="flex flex-col gap-4">
          <label className="text-3xl font-semibold max-w-fit" htmlFor="senha">
            Senha
          </label>
          <TextField.Root
            className="h-14"
            aria-invalid={Boolean(errors.password)}
          >
            <BiLockAlt className="w-6 h-6 text-zinc-400" />
            <TextField.Input
              id="senha"
              placeholder="Senha"
              type="password"
              {...register("password", {
                required: "Senha é obrigatória!",
              })}
            />
          </TextField.Root>
          <span className="text-red-600 font-bold -mt-2">
            {errors.password?.message}
          </span>
        </div>
        <Button type="submit" isLoading={isSubmitting} className="h-16">
          Entrar
        </Button>
      </form>
    </motion.main>
  );
}
