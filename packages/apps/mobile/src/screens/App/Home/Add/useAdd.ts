import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigation } from "@react-navigation/native";
import {
  launchImageLibraryAsync,
  MediaTypeOptions,
  requestCameraPermissionsAsync,
  launchCameraAsync,
} from "expo-image-picker";
import { z } from "zod";

import { useToast } from "@encontrei/hooks/useToast";
import { supabase } from "@encontrei/lib/supabase";
import { SupabaseInventoryFound } from "@encontrei/shared-constants";
import {
  removeSpecialCharacters,
  getUnixTimestampInSeconds,
} from "@encontrei/shared-utils";
import { createImageFormData } from "@encontrei/utils/createImageFormData";
import { vibrate } from "@encontrei/utils/vibrate";
import {
  name,
  description,
  category,
  local,
  photoUrl,
} from "@encontrei/utils/zodSchemas";

const addSchema = z.object({
  name,
  description,
  category,
  local,
  photoUrl,
});

type FormData = z.output<typeof addSchema>;

export function useAdd() {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(addSchema),
  });
  const { goBack } = useNavigation();
  const toast = useToast();

  async function addNewItem(data: FormData) {
    const imageExtension = data.photoUrl.split(".").pop() ?? "jpeg";
    const photoFilename = `${removeSpecialCharacters(
      data.name
    )}-${getUnixTimestampInSeconds()}.${imageExtension}`;
    const { error: storageError } = await supabase.storage
      .from("item-photo")
      .upload(
        photoFilename,
        createImageFormData({
          name: photoFilename,
          uri: data.photoUrl,
          imageExtension,
        }),
        {
          cacheControl: "15552000",
          contentType: "image/" + imageExtension,
        }
      );

    if (storageError) {
      return toast({
        type: "error",
        message: storageError.message,
      });
    }

    const { error } = await supabase
      .from<SupabaseInventoryFound>("inventoryFound")
      .insert({
        name: data.name.trim(),
        description: data.description.trim(),
        category: data.category,
        local: data.local,
        userId: supabase.auth.user()?.id,
        photoFilename,
      })
      .throwOnError();
    if (error) {
      return toast({
        type: "error",
        message: error.message,
      });
    }
    toast({
      type: "success",
      message: "Enviado com sucesso",
    });
    goBack();
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

  const handleAddNewItem = handleSubmit(addNewItem, () => vibrate());

  return {
    control,
    watch,
    errors,
    isSubmitting,
    handlePickImage,
    handleTakePhoto,
    handleAddNewItem,
  };
}
