export const loadImage = (
  src: string,
  callback: (img: HTMLImageElement) => void = () => {}
) => {
  let img = new Image();

  img.onload = () => callback(img);
  img.setAttribute('crossorigin', 'anonymous');

  img.src = src;

  return img;
};
