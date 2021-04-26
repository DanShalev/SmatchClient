export function appendImagePrefix(image) {
  return "data:image/jpeg;base64," + image
}

export function appendImagePrefixes(images) {
  return images.filter((image) => image !== null).map((image) => appendImagePrefix(image))
}