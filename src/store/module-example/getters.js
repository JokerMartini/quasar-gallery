export function getImages(state) {
  const allImages = [];
  state.images.forEach((element) => {
    element.files.forEach((file) => {
      allImages.push({
        image: file,
        thumbnail: file.replace("images", "thumbnails"),
      });
    });
  });
  return allImages;
}
