import { IAppContext, Image } from 'app-context';
import { ContextDTO } from './export';

export const importData = async (data: File, context: IAppContext) => {
  if (!data.type || data.type !== 'application/json') {
    throw new Error('Invalid file type.');
  }

  const text = await data.text();
  const dto = JSON.parse(text) as ContextDTO;

  populateSettings(dto, context);
};

const dataUrlToBlob = async (dataUrl: string): Promise<Blob> =>
  (await fetch(dataUrl)).blob();

const populateSettings = async (data: ContextDTO, context: IAppContext) => {
  const { settings, images } = data;

  if (context.setBackgroundColor) {
    context.setBackgroundColor(settings.backgroundColor);
  }
  if (context.setBorderColor) {
    context.setBorderColor(settings.borderColor);
  }
  if (context.setBorderRadius) {
    context.setBorderRadius(settings.borderRadius);
  }
  if (context.setBorderThickness) {
    context.setBorderThickness(settings.borderThickness);
  }

  if (context.loadImages) {
    const importImages: Image[] = [];
    for (const image of images) {
      const imageId = image.id;
      const previewBlob = await dataUrlToBlob(image.preview);
      const imageBlob = await dataUrlToBlob(image.original);
      const preview = URL.createObjectURL(previewBlob);
      const original = new File([imageBlob], imageId);

      importImages.push({
        original,
        preview,
        id: imageId,
        fileName: imageId,
      });
    }
    context.loadImages(importImages);
  }
};
