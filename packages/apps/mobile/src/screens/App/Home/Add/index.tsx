import { Controller } from "react-hook-form";
import { ScrollView, Image, Text, View, TouchableOpacity } from "react-native";

import * as Button from "@encontrei/components/Controllers/Button";
import { Select } from "@encontrei/components/Controllers/Select";
import * as TextField from "@encontrei/components/Controllers/TextField";
import { FormError } from "@encontrei/components/General/FormError";
import { KeyboardAvoidingView } from "@encontrei/components/General/KeyboardAvoidingView";
import { Label } from "@encontrei/components/General/Label";
import { Feather } from "@encontrei/components/Icons/ExpoIcons";
import { categories, locals } from "@encontrei/shared-constants";

import { useAdd } from "./useAdd";

export function Add() {
  const {
    control,
    errors,
    watch,
    isSubmitting,
    handlePickImage,
    handleTakePhoto,
    handleAddNewItem,
  } = useAdd();

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
                placeholder="Nome"
                {...field}
              />
            </TextField.Root>
          )}
        />
        <FormError message={errors.name?.message} />
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
                placeholder="Descrição"
                {...field}
              />
            </TextField.Root>
          )}
        />
        <FormError message={errors.description?.message} />
        <Label className="my-4">Categoria</Label>
        <Controller
          control={control}
          name="category"
          render={({ field: { onChange, ref, ...field } }) => (
            <Select {...field} onValueChange={onChange} options={categories} />
          )}
        />
        <FormError message={errors.category?.message} />
        <Label className="my-4">Local</Label>
        <Controller
          control={control}
          name="local"
          render={({ field: { onChange, ref, ...field } }) => (
            <Select {...field} onValueChange={onChange} options={locals} />
          )}
        />
        <FormError message={errors.local?.message} />
        <Label className="my-4">Foto</Label>
        {watch("photoUrl") ? (
          <Image
            className="w-[50vw] h-[50vw] rounded-md self-center"
            source={{ uri: watch("photoUrl") }}
          />
        ) : (
          <Text className="dark:text-zinc-50 -mt-4">
            Nenhuma foto selecionada
          </Text>
        )}
        <FormError message={errors.photoUrl?.message} />
        <View className="flex-row justify-between my-4 mx-auto w-36">
          <TouchableOpacity
            className="w-16 h-16 bg-zinc-600 rounded-full justify-center items-center"
            onPress={handlePickImage}
          >
            <Feather name="image" size={20} className="text-white" />
          </TouchableOpacity>
          <TouchableOpacity
            className="w-16 h-16 bg-zinc-600 rounded-full justify-center items-center"
            onPress={handleTakePhoto}
          >
            <Feather name="camera" size={20} className="text-white" />
          </TouchableOpacity>
        </View>
        <Button.Root
          className="h-16 mb-12"
          isLoading={isSubmitting}
          onPress={handleAddNewItem}
        >
          <Button.Text>Enviar</Button.Text>
        </Button.Root>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
