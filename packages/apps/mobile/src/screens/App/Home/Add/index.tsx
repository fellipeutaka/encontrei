import { useForm, Controller } from "react-hook-form";
import { ScrollView, Image, Text, View, TouchableOpacity } from "react-native";

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

import * as Button from "@encontrei/components/Controllers/Button";
import { Select } from "@encontrei/components/Controllers/Select";
import * as TextField from "@encontrei/components/Controllers/TextField";
import { KeyboardAvoidingView } from "@encontrei/components/General/KeyboardAvoidingView";
import { Label } from "@encontrei/components/General/Label";
import { useToast } from "@encontrei/hooks/useToast";
import { supabase } from "@encontrei/lib/supabase";
import {
  categories,
  locals,
  SupabaseInventoryFound,
} from "@encontrei/shared-constants";
import {
  getUnixTimestampInSeconds,
  removeSpecialCharacters,
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

export function Add() {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    getValues,
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

    const userId = supabase.auth.user()?.id;
    const { error } = await supabase
      .from<SupabaseInventoryFound>("inventoryFound")
      .insert({
        name: data.name.trim(),
        description: data.description.trim(),
        category: data.category,
        local: data.local,
        userId,
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

  return (
    <KeyboardAvoidingView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="flex-1 dark:bg-zinc-900 py-3 px-9"
      >
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
        <Text className="text-red-600 font-semibold my-1">
          {errors.name?.message}
        </Text>
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
        <Text className="text-red-600 font-semibold my-1">
          {errors.description?.message}
        </Text>
        <Label>Categoria</Label>
        <Controller
          control={control}
          name="category"
          render={({
            field: { onChange, ...field },
            fieldState: { error },
          }) => (
            <Select {...field} onValueChange={onChange} options={categories} />
          )}
        />
        <Text className="text-red-600 font-semibold my-1">
          {errors.category?.message}
        </Text>
        <Label>Local</Label>
        <Controller
          control={control}
          name="local"
          render={({
            field: { onChange, ...field },
            fieldState: { error },
          }) => <Select {...field} onValueChange={onChange} options={locals} />}
        />
        <Text className="text-red-600 font-semibold my-1">
          {errors.local?.message}
        </Text>
        <Label>Foto</Label>
        {getValues("photoUrl") ? (
          <Image
            className="w-[50vw] h-[50vw] rounded-md self-center"
            source={{ uri: getValues("photoUrl") }}
          />
        ) : (
          <Text>Nenhuma foto selecionada</Text>
        )}
        <Text className="text-red-600 font-semibold my-1">
          {errors.photoUrl?.message}
        </Text>
        <View className="flex-row justify-between my-3 mx-auto w-36">
          <TouchableOpacity
            className="w-16 h-16 bg-zinc-600"
            onPress={handlePickImage}
          >
            <Feather name="image" size={20} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            className="w-16 h-16 bg-zinc-600"
            onPress={handleTakePhoto}
          >
            <Feather name="camera" size={20} color="white" />
          </TouchableOpacity>
        </View>
        <Button.Root
          className="mb-6"
          isLoading={isSubmitting}
          onPress={handleSubmit(addNewItem, () => vibrate())}
        >
          <Button.Text>Enviar</Button.Text>
        </Button.Root>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
