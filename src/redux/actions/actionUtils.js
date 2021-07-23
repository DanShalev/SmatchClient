function appendSingleImagePrefix(image) {
  if (!image) {
    return image;
  }

  if (image.startsWith("http") || image.startsWith("data:image/jpeg;base64")) {
    return image;
  }

  return "data:image/jpeg;base64," + image // Add base64 prefix only for images, not URLs
}

function appendMultiImagePrefixes(images) {
  return images.filter((image) => image !== null).map((image) => appendSingleImagePrefix(image))
}

export function appendImagePrefix(images) {
  if (!images) {
    return images;
  }

  if (images.constructor === Array) {
    return appendMultiImagePrefixes(images);
  } else {
    return appendSingleImagePrefix(images);
  }
}
