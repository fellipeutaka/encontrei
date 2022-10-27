import { useState } from "react";

import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {
  launchCameraAsync,
  launchImageLibraryAsync,
  MediaTypeOptions,
  requestCameraPermissionsAsync,
} from "expo-image-picker";
import { ValidationError } from "yup";

import Select from "@encontrei/components/Controllers/Select";
import KeyboardAvoidingView from "@encontrei/components/General/KeyboardAvoidingView";
import Label from "@encontrei/components/General/Label";
import { supabase } from "@encontrei/lib/supabase";
import { InventoryFoundInsert } from "@encontrei/types/InventoryFound";
import { createImageFormData } from "@encontrei/utils/createImageFormData";
import { getUnixTimestampInSeconds } from "@encontrei/utils/getUnixTimestampInSeconds";
import { removeSpecialCharacters } from "@encontrei/utils/removeSpecialCharacters";
import Toast from "@encontrei/utils/toast";
import { vibrate } from "@encontrei/utils/vibrate";
import { addSchema } from "@encontrei/utils/yupSchemas";

import {
  ButtonsContainer,
  Container,
  ImagePreview,
  Input,
  PhotoButton,
  SubmitButton,
  Text,
} from "./styles";

const categories = [
  "eletrônico",
  "material escolar",
  "roupa",
  "outros",
] as const;
type Category = typeof categories[number];

const locations = ["pátio", "quadra", "cantina", "sala 9", "lab 3"] as const;
type Local = typeof locations[number];

interface Item {
  name: string;
  description: string;
  category: Category | null;
  local: Local | null;
  photoUrl: string | null;
}

export default function Add() {
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);
  const [item, setItem] = useState<Item>({
    name: "",
    description: "",
    category: null,
    local: null,
    photoUrl: null,
  });

  async function handleAddNewItem() {
    try {
      await addSchema.validate(item);
      setLoading(true);
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
      if (err instanceof ValidationError) {
        vibrate();
        Toast("Error", err.message);
      } else {
        console.error(err);
        Toast("Erro", "Ocorreu um erro inesperado");
      }
      setLoading(false);
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
      setItem((state) => ({ ...state, photoUrl: result.uri }));
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
        setItem((state) => ({
          ...state,
          photoUrl: result.uri,
        }));
      }
    }
  }

  return (
    <KeyboardAvoidingView>
      <Container>
        <Label>Nome</Label>
        <Input
          value={item.name}
          onChangeText={(name) => setItem((state) => ({ ...state, name }))}
          maxLength={24}
        />
        <Label>Descrição</Label>
        <Input
          value={item.description}
          onChangeText={(description) =>
            setItem((state) => ({ ...state, description }))
          }
          maxLength={48}
        />
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
        <SubmitButton isLoading={loading} onPress={handleAddNewItem}>
          Enviar
        </SubmitButton>
      </Container>
    </KeyboardAvoidingView>
  );
}
