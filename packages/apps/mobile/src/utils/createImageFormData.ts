interface CreateImageFormDataParams {
  name: string;
  uri: string;
  imageExtension: string;
}

export function createImageFormData({
  name,
  uri,
  imageExtension,
}: CreateImageFormDataParams) {
  const formData = new FormData();
  formData.append("image", {
    name,
    uri,
    type: "image/" + imageExtension,
  } as any);
  return formData;
}
