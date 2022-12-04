import { useForm, Controller } from "react-hook-form";
import { AiOutlineClose } from "react-icons/ai";
import { FiPlus } from "react-icons/fi";
import ImageUploading from "react-images-uploading";
import { toast } from "react-toastify";

import { zodResolver } from "@hookform/resolvers/zod";
import * as Dialog from "@radix-ui/react-dialog";
import { clsx } from "clsx";
import { motion } from "framer-motion";
import { Query } from "supabase-swr";
import { useSWRConfig } from "swr";
import { z } from "zod";

import type { Inventory } from "@encontrei/@types/Inventory";
import { Button } from "@encontrei/components/Button";
import { Select } from "@encontrei/components/Select";
import * as TextField from "@encontrei/components/TextField";
import { supabase } from "@encontrei/lib/supabase";
import { categories } from "@encontrei/utils/category";
import { getItems } from "@encontrei/utils/getItems";
import { getUnixTimestampInSeconds } from "@encontrei/utils/getUnixTimestampInSeconds";
import { handleScape } from "@encontrei/utils/handleScape";
import { locals } from "@encontrei/utils/local";
import { removeSpecialCharacters } from "@encontrei/utils/removeSpecialCharacters";

const DialogContent = motion(Dialog.Content);

const itemSchema = z.object({
  name: z
    .string({
      required_error: "Nome é obrigatório!",
    })
    .trim()
    .min(1, "Nome é obrigatório!"),
  description: z
    .string({
      required_error: "Descrição é obrigatória!",
    })
    .trim()
    .min(1, "Descrição é obrigatória!"),
  category: z
    .string({
      required_error: "Categoria é obrigatória!",
    })
    .trim()
    .min(1, "Categoria é obrigatória!"),
  local: z
    .string({
      required_error: "Local é obrigatório!",
    })
    .trim()
    .min(1, "Local é obrigatório!"),
  photo: z.array(
    z.object({
      dataURL: z.string(),
      file: z.instanceof(File),
    }),
    { required_error: "Foto é obrigatória!" }
  ),
});

type FormData = z.output<typeof itemSchema>;

export function CreateItemDialog() {
  const inventoryQuery = getItems("inventory") as Query<Inventory>;
  const { mutate } = useSWRConfig();
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(itemSchema),
  });

  async function createItem(data: FormData) {
    const imageFile = data.photo[0].file;
    const imageExtension = imageFile.name.split(".").pop() ?? "";
    const photoName = `${removeSpecialCharacters(
      imageFile.name.replace(/\.[^/.]+$/, "")
    )}-${getUnixTimestampInSeconds()}.${imageExtension}`;

    try {
      const toastPhoto = toast.loading("Enviando foto...");
      const { error: storageError } = await supabase.storage
        .from("item-photo")
        .upload(photoName, imageFile);

      if (storageError) {
        return toast.update(toastPhoto, {
          render: "Não foi possível enviar a foto",
          type: "error",
          isLoading: false,
          autoClose: 4000,
          draggable: true,
        });
      }
      toast.dismiss(toastPhoto);
      const toastDb = toast.loading("Adicionando ao inventário...");
      const { error } = await supabase.from<Inventory>("inventory").insert({
        name: data.name.trim(),
        description: data.description.trim(),
        category: data.category,
        local: data.local,
        photoFilename: photoName,
      });
      if (error) {
        return toast.update(toastDb, {
          render: "Não foi possível adicionar esse item ao inventário",
          type: "error",
          isLoading: false,
          autoClose: 4000,
          draggable: true,
        });
      }
      toast.update(toastDb, {
        render: "Item adicionado ao inventário com sucesso",
        type: "success",
        isLoading: false,
        autoClose: 4000,
        draggable: true,
      });
      await mutate(inventoryQuery);
      reset();
      handleScape();
    } catch (err) {
      console.error(err);
      toast.error("Não foi possível adicionar esse item ao inventário");
    }
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button className="h-11" aria-label="Add new item">
          <FiPlus />
          <span>Adicionar</span>
        </Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-black/50 fixed inset-0 opacity-0 animate-fade" />
        <DialogContent
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{ translateX: "-50%", translateY: "-50%" }}
          className="fixed top-1/2 left-1/2 outline-none py-8 px-64 bg-zinc-100 dark:bg-zinc-900 rounded-lg shadow-lg shadow-black/50 max-h-[92vh] overflow-y-scroll"
        >
          <Dialog.Title className="text-3xl font-semibold text-center mb-4">
            Adicionar novo item
          </Dialog.Title>
          <form
            className="flex flex-col gap-4 w-96"
            onSubmit={handleSubmit(createItem)}
          >
            <div className="flex flex-col items-center gap-1">
              <label className="self-start" htmlFor="name">
                Nome
              </label>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <TextField.Root
                    className="w-full"
                    aria-invalid={Boolean(errors.name)}
                  >
                    <TextField.Input id="name" placeholder="Nome" {...field} />
                  </TextField.Root>
                )}
              />
              <span className="text-red-600 self-start">
                {errors.name?.message}
              </span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <label className="self-start" htmlFor="category">
                Categoria
              </label>
              <Controller
                name="category"
                control={control}
                render={({ field: { onBlur, onChange, ref } }) => (
                  <Select
                    items={categories}
                    placeholder="Escolha uma categoria"
                    ref={ref}
                    rootProps={{ onValueChange: onChange }}
                    triggerProps={{
                      id: "category",
                      "aria-invalid": Boolean(errors.category),
                      onBlur,
                      className: "w-full",
                    }}
                  />
                )}
              />
              <span className="text-red-600 self-start">
                {errors.category?.message}
              </span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <label className="self-start" htmlFor="description">
                Descrição
              </label>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <TextField.Root
                    className="w-full"
                    aria-invalid={Boolean(errors.description)}
                  >
                    <TextField.Input
                      id="description"
                      placeholder="Descrição"
                      {...field}
                    />
                  </TextField.Root>
                )}
              />
              <span className="text-red-600 self-start">
                {errors.description?.message}
              </span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <label className="self-start" htmlFor="local">
                Local
              </label>
              <Controller
                name="local"
                control={control}
                render={({ field: { onBlur, onChange, ref } }) => (
                  <Select
                    items={locals}
                    placeholder="Escolha um lugar"
                    ref={ref}
                    rootProps={{ onValueChange: onChange }}
                    triggerProps={{
                      id: "local",
                      "aria-invalid": Boolean(errors.local),
                      onBlur,
                      className: "w-full",
                    }}
                  />
                )}
              />
              <span className="text-red-600 self-start">
                {errors.local?.message}
              </span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Controller
                name="photo"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <ImageUploading
                    value={field.value}
                    onChange={field.onChange}
                    acceptType={["png", "jpg", "jpeg"]}
                  >
                    {({ onImageUpload, dragProps, isDragging, imageList }) => (
                      <div
                        {...dragProps}
                        className={clsx(
                          "flex flex-col justify-center items-center relative gap-4 w-80 aspect-square transition border border-dashed border-violet-600",
                          {
                            border: imageList.length === 1,
                            "border-red-600": Boolean(error),
                          }
                        )}
                      >
                        <button
                          type="button"
                          onClick={onImageUpload}
                          aria-label="Upload photo"
                          className="flex flex-col justify-center items-center w-32 h-32 rounded-full bg-zinc-800 outline-none transition focus-visible:ring-2 focus-visible:ring-zinc-700 hover:opacity-70"
                        >
                          <div
                            id="triangle"
                            className="border-l-[16px] border-l-transparent border-r-[16px] border-r-transparent border-b-[16px] border-b-zinc-200"
                          />
                          <div
                            id="arrow-line"
                            className={clsx(
                              "w-2 h-5 bg-zinc-200 animate-draggingOutArrowLine",
                              {
                                "animate-draggingInArrowLine": isDragging,
                              }
                            )}
                          />
                          <div
                            id="line"
                            className="w-9 h-1.5 mt-2 bg-zinc-200"
                          />
                        </button>
                        <p className="text-sm pointer-events-none">
                          Arraste e solte o arquivo para fazer o envio
                        </p>
                        {imageList.map((image) => (
                          <div key={image.dataURL}>
                            <img
                              src={image.dataURL}
                              alt={image.file?.name}
                              className="w-full h-full absolute inset-0 object-cover cursor-pointer bg-zinc-900"
                              onClick={onImageUpload}
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </ImageUploading>
                )}
              />
              <span className="text-red-600 self-start">
                {errors.photo?.message}
              </span>
            </div>
            <Button type="submit" isLoading={isSubmitting}>
              Criar
            </Button>
          </form>
          <Dialog.Close
            className="absolute top-5 right-5 w-8 h-8 rounded-2xl flex justify-center items-center outline-none text-zinc-100 transition hover:opacity-70 focus-visible:bg-zinc-800/70"
            aria-label="Close"
          >
            <AiOutlineClose size={20} />
          </Dialog.Close>
        </DialogContent>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
