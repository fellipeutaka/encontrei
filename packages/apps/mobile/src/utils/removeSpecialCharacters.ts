export function removeSpecialCharacters(string: string) {
  return string.replace(/[^a-zA-Z ]+/gi, "");
}
