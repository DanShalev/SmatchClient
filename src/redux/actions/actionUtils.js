export function appendImagePrefix(image) {
  return image.startsWith("http") ? image : ("data:image/jpeg;base64," + image) // Add base64 prefix only for images, not urls
}

export function appendImagePrefixes(images) {
  return images.filter((image) => image !== null).map((image) => appendImagePrefix(image))
}
