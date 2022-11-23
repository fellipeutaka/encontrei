import { useState } from "react";
import { useForm, Controller } from "react-hook-form";

import { Feather } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigation } from "@react-navigation/native";
import {
  launchCameraAsync,
  launchImageLibraryAsync,
  MediaTypeOptions,
  requestCameraPermissionsAsync,
} from "expo-image-picker";
import { z } from "zod";

import type { InventoryFoundInsert } from "@encontrei/@types/InventoryFound";
import { Select } from "@encontrei/components/Controllers/Select";
import * as TextField from "@encontrei/components/Controllers/TextField";
import { KeyboardAvoidingView } from "@encontrei/components/General/KeyboardAvoidingView";
import { Label } from "@encontrei/components/General/Label";
import { supabase } from "@encontrei/lib/supabase";
import { categories, ICategory } from "@encontrei/utils/category";
import { createImageFormData } from "@encontrei/utils/createImageFormData";
import { getUnixTimestampInSeconds } from "@encontrei/utils/getUnixTimestampInSeconds";
import { ILocal } from "@encontrei/utils/local";
import { removeSpecialCharacters } from "@encontrei/utils/removeSpecialCharacters";
import Toast from "@encontrei/utils/toast";
import { vibrate } from "@encontrei/utils/vibrate";
import {
  name,
  description,
  category,
  local,
  photoUrl,
} from "@encontrei/utils/zodSchemas";

import {
  ButtonsContainer,
  Container,
  ImagePreview,
  Input,
  PhotoButton,
  SubmitButton,
  Text,
} from "./styles";

type FormData = {
  name: string;
  description: string;
  category: ICategory | null;
  local: ILocal | null;
  photoUrl: string | null;
};

const addSchema = z.object({
  name,
  description,
  category,
  local,
  photoUrl,
});

export function Add() {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(addSchema),
  });
  const navigation = useNavigation();

  async function addNewItem(item: FormData) {
    try {
      const imageExtension = item.photoUrl!.split(".").pop() || "jpeg";
      const photoName = `${removeSpecialCharacters(
        item.name
      )}-${getUnixTimestampInSeconds()}.${imageExtension}`;
      const { error: storageError } = await supabase.storage
        .from("item-photo")
        .upload(
          `inventoryFound/${photoName}`,
          createImageFormData({
            name: photoName,
            uri: item.photoUrl ?? "",
            imageExtension,
          }),
          {
            cacheControl: "15552000",
            contentType: "image/" + imageExtension,
          }
        );

      if (storageError) throw storageError;

      const userId = supabase.auth.user()?.id;
      await supabase
        .from<InventoryFoundInsert>("inventoryFound")
        .insert({
          name: item.name.trim(),
          description: item.description.trim(),
          category: item.category || "",
          local: item.local || "",
          userId,
          photoFilename: photoName,
        })
        .throwOnError();

      Toast("Sucesso", "Enviado com sucesso");
      setLoading(false);
      navigation.goBack();
    } catch (err) {
      console.error(err);
      Toast("Erro", "Ocorreu um erro inesperado");
    }
  }

  async function handlePickImage() {
    const result = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setValue("photoUrl", result.uri);
    }
  }

  async function handleTakePhoto() {
    const permission = await requestCameraPermissionsAsync();

    if (permission.granted) {
      const result = await launchCameraAsync({
        mediaTypes: MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.cancelled) {
        setValue("photoUrl", result.uri);
      }
    }
  }

  return (
    <KeyboardAvoidingView>
      <Container>
        <Label className="my-4">Nome</Label>
        <Controller
          control={control}
          name="name"
          render={({
            field: { onChange, ...field },
            fieldState: { error },
          }) => (
            <TextField.Root>
              <TextField.Input
                error={Boolean(error)}
                onChangeText={onChange}
                maxLength={24}
                {...field}
              />
            </TextField.Root>
          )}
        />
        {errors.name && (
          <Text className="text-red-600 font-semibold my-1">
            {errors.name.message}
          </Text>
        )}
        <Label className="my-4">Descrição</Label>
        <Controller
          control={control}
          name="description"
          render={({
            field: { onChange, ...field },
            fieldState: { error },
          }) => (
            <TextField.Root>
              <TextField.Input
                error={Boolean(error)}
                onChangeText={onChange}
                maxLength={48}
                {...field}
              />
            </TextField.Root>
          )}
        />
        {errors.description && (
          <Text className="text-red-600 font-semibold my-1">
            {errors.description.message}
          </Text>
        )}
        <Label>Categoria</Label>
        <Select
          value={item.category}
          onValueChange={(value) =>
            setItem((state) => ({
              ...state,
              category: value,
            }))
          }
          options={categories}
        />
        <Label>Local</Label>
        <Select
          value={item.local}
          onValueChange={(value) =>
            setItem((state) => ({
              ...state,
              local: value,
            }))
          }
          options={locations}
        />
        <Label>Foto</Label>
        {item.photoUrl ? (
          <ImagePreview source={{ uri: item.photoUrl }} />
        ) : (
          <Text>Nenhuma foto selecionada</Text>
        )}
        <ButtonsContainer>
          <PhotoButton onPress={handlePickImage}>
            <Feather name="image" size={20} color="white" />
          </PhotoButton>
          <PhotoButton onPress={handleTakePhoto}>
            <Feather name="camera" size={20} color="white" />
          </PhotoButton>
        </ButtonsContainer>
        <SubmitButton
          isLoading={isSubmitting}
          onPress={handleSubmit(addNewItem)}
        >
          Enviar
        </SubmitButton>
      </Container>
    </KeyboardAvoidingView>
  );
}
