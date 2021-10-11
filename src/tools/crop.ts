import { Area } from 'react-easy-crop/types';

interface Dimensions {
  width: number;
  height: number;
}

const loadImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', error => reject(error));
    image.src = url;
  });

export const cropImage = async (
  imageSrc: string,
  croppedArea: Area,
  dimensions: Dimensions
): Promise<string> => {
  const image = await loadImage(imageSrc);
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d') as CanvasRenderingContext2D;

  canvas.width = dimensions.width;
  canvas.height = dimensions.height;

  context.drawImage(
    image,
    croppedArea.x,
    croppedArea.y,
    croppedArea.width,
    croppedArea.height,
    0,
    0,
    dimensions.width,
    dimensions.height
  );

  return canvas.toDataURL();
};
