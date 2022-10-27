import { useForm, Controller } from "react-hook-form";
import { AiOutlineClose } from "react-icons/ai";
import { FiPlus } from "react-icons/fi";
import ImageUploading, { ImageListType } from "react-images-uploading";
import { toast } from "react-toastify";

import type { Inventory } from "@encontrei/@types/Inventory";
import { Button } from "@encontrei/components/Button";
import { Input } from "@encontrei/components/Input";
import * as Select from "@encontrei/components/Select";
import { supabase } from "@encontrei/lib/supabase";
import { getUnixTimestampInSeconds } from "@encontrei/utils/getUnixTimestampInSeconds";
import { handleScape } from "@encontrei/utils/handleScape";
import { removeSpecialCharacters } from "@encontrei/utils/removeSpecialCharacters";

import {
  DetailsContent,
  DetailsTrigger,
  DialogClose,
  DialogOverlay,
  DialogRoot,
  ErrorText,
  Form,
  FormField,
  FormLabel,
  Portal,
  UploadButton,
  UploadContainer,
} from "./styles";

interface IInputs {
  name: string;
  category: string;
  description: string;
  local: string;
  photo: ImageListType;
}

const categories = [
  { value: "eletrônico", text: "Eletrônico" },
  { value: "material escolar", text: "Material escolar" },
  { value: "roupas", text: "Roupas" },
  { value: "Outros", text: "Outros" },
];

const locals = [
  { value: "pátio", text: "Pátio" },
  { value: "quadra", text: "Quadra" },
  { value: "cantina", text: "Cantina" },
  { value: "sala 9", text: "Sala 9" },
  { value: "lab 3", text: "Lab 3" },
];

export function CreateItemDialog() {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<IInputs>();

  async function createItem(data: IInputs) {
    const imageFile = data.photo[0].file;
    if (!imageFile) {
      toast.error("Não foi possível encontrar sua foto");
      return;
    }
    const imageExtension = imageFile.name.split(".").pop() ?? "";
    const photoName = `${removeSpecialCharacters(
      imageFile.name.replace(/\.[^/.]+$/, "")
    )}-${getUnixTimestampInSeconds()}.${imageExtension}`;

    try {
      const toastPhoto = toast.loading("Enviando foto...");
      const { error: storageError } = await supabase.storage
        .from("item-photo")
        .upload(`inventory/${photoName}`, imageFile, {
          cacheControl: "15552000",
          contentType: "image/" + imageExtension,
        });

      if (storageError) {
        toast.update(toastPhoto, {
          render: "Não foi possível enviar a foto",
          type: "error",
          isLoading: false,
          autoClose: 4000,
          draggable: true,
        });
        return;
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
        toast.update(toastDb, {
          render: "Não foi possível adicionar esse item ao inventário",
          type: "error",
          isLoading: false,
          autoClose: 4000,
          draggable: true,
        });
        return;
      }
      toast.update(toastDb, {
        render: "Item adicionado ao inventário com sucesso",
        type: "success",
        isLoading: false,
        autoClose: 4000,
        draggable: true,
      });
      reset();
      handleScape();
    } catch (err) {
      console.error(err);
      toast.error("Não foi possível adicionar esse item ao inventário");
    }
  }

  return (
    <DialogRoot>
      <DetailsTrigger aria-label="Add new item">
        <FiPlus />
        <span>Adicionar</span>
      </DetailsTrigger>
      <Portal>
        <DialogOverlay />
        <DetailsContent>
          <h1>Adicionar novo item</h1>
          <Form onSubmit={handleSubmit(createItem)}>
            <FormField>
              <FormLabel htmlFor="name">Nome</FormLabel>
              <Input
                id="name"
                placeholder="Nome"
                aria-invalid={Boolean(errors.name)}
                {...register("name", {
                  required: "Nome é obrigatório!",
                })}
              />
              {errors.name && <ErrorText>{errors.name.message}</ErrorText>}
            </FormField>
            <FormField>
              <FormLabel htmlFor="category">Categoria</FormLabel>
              <Controller
                name="category"
                control={control}
                rules={{ required: "Categoria é obrigatória!" }}
                render={({ field: { onBlur, onChange, ref } }) => (
                  <Select.Root onValueChange={onChange}>
                    <Select.Trigger
                      id="category"
                      aria-invalid={Boolean(errors.category)}
                      onBlur={onBlur}
                      ref={ref}
                    >
                      <Select.Placeholder text="Escolha uma categoria" />
                      <Select.Icon />
                    </Select.Trigger>
                    <Select.Content items={categories} />
                  </Select.Root>
                )}
              />
              {errors.category && (
                <ErrorText>{errors.category.message}</ErrorText>
              )}
            </FormField>
            <FormField>
              <FormLabel htmlFor="description">Descrição</FormLabel>
              <Input
                id="description"
                placeholder="Descrição"
                aria-invalid={Boolean(errors.description)}
                {...register("description", {
                  required: "Descrição é obrigatória!",
                })}
              />
              {errors.description && (
                <ErrorText>{errors.description.message}</ErrorText>
              )}
            </FormField>
            <FormField>
              <FormLabel htmlFor="local">Local</FormLabel>
              <Controller
                name="local"
                control={control}
                rules={{ required: "Local é obrigatório!" }}
                render={({ field: { onBlur, onChange, ref } }) => (
                  <Select.Root onValueChange={onChange}>
                    <Select.Trigger
                      id="local"
                      aria-invalid={Boolean(errors.local)}
                      onBlur={onBlur}
                      ref={ref}
                    >
                      <Select.Placeholder text="Escolha um lugar" />
                      <Select.Icon />
                    </Select.Trigger>
                    <Select.Content items={locals} />
                  </Select.Root>
                )}
              />
              {errors.local && <ErrorText>{errors.local.message}</ErrorText>}
            </FormField>
            <FormField>
              <Controller
                name="photo"
                control={control}
                rules={{ required: "Imagem é obrigatória!" }}
                render={({ field, fieldState: { error } }) => (
                  <ImageUploading
                    value={field.value}
                    onChange={field.onChange}
                    acceptType={["png", "jpg", "jpeg"]}
                  >
                    {({ onImageUpload, isDragging, dragProps, imageList }) => (
                      <UploadContainer
                        {...dragProps}
                        error={Boolean(error)}
                        hasImage={imageList.length === 1}
                      >
                        <UploadButton
                          isDragging={isDragging}
                          type="button"
                          onClick={onImageUpload}
                          aria-label="Upload photo"
                        >
                          <div id="triangle" />
                          <div id="arrow-line" />
                          <div id="line" />
                        </UploadButton>
                        <p>Arraste e solte o arquivo para fazer o envio</p>
                        {imageList.map((image) => (
                          <div key={image.dataURL} className="image-item">
                            <img
                              src={image.dataURL}
                              alt={image.file?.name}
                              onClick={onImageUpload}
                            />
                          </div>
                        ))}
                      </UploadContainer>
                    )}
                  </ImageUploading>
                )}
              />
              {errors.photo && <ErrorText>{errors.photo.message}</ErrorText>}
            </FormField>
            <Button type="submit" isLoading={isSubmitting}>
              Criar
            </Button>
          </Form>
          <DialogClose aria-label="Close">
            <AiOutlineClose size={20} />
          </DialogClose>
        </DetailsContent>
      </Portal>
    </DialogRoot>
  );
}
