import * as FileSystem from "expo-file-system";
import {appendImagePrefix} from "../../redux/utils/utils";


export function buildFilePath() {
  return FileSystem.cacheDirectory + Math.floor(Math.random() * 1000000) + ".json";
}


export async function handleBase64(data) {
  const path = buildFilePath();
  await FileSystem.writeAsStringAsync(path, appendImagePrefix(data))
  return path
}


export function saveToFileSystem(element) {
  if (element.startsWith("http")) {
    return element
  } else {
    return handleBase64(element)
  }
}

export async function convertToBase64(pictures) {
  let updatePictures = []
  for (let picture of pictures) {
    if (picture === null || picture.startsWith("http")) {
      updatePictures.push(picture)
    } else {
      const image = await FileSystem.readAsStringAsync(picture)
      updatePictures.push(image)
    }
  }
  return updatePictures
}
