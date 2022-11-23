import { getUnixTimestampInSeconds } from "./getUnixTimestampInSeconds";
import { removeSpecialCharacters } from "./removeSpecialCharacters";

export function getPhotoName(name: string) {
  const imageExtension = item.photoUrl!.split(".").pop() || "jpeg";
  const photoName = `${removeSpecialCharacters(
    name
  )}-${getUnixTimestampInSeconds()}.${imageExtension}`;
}
