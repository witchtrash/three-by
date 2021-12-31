import { IAppContext } from 'app-context';

export interface Image {
  id: string;
  original: string;
  preview: string;
}

export interface ContextDTO extends Pick<IAppContext, 'settings'> {
  images: Image[];
}

const getDataUrl = (file: File | Blob): Promise<string | undefined> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.addEventListener('load', () => resolve(reader.result?.toString()));
    reader.addEventListener('error', error => reject(error));

    reader.readAsDataURL(file);
  });
};

const getFile = (objectUrl: string) => {
  return fetch(objectUrl).then(res => res.blob());
};

export const exportData = async (context: IAppContext): Promise<File> => {
  const images: Image[] = [];

  for (const imageId in context.images) {
    const original = await getDataUrl(context.images[imageId].original);
    const preview = await getDataUrl(
      await getFile(context.images[imageId].preview)
    );

    if (original && preview) {
      const image: Image = {
        id: imageId,
        original,
        preview,
      };
      images.push(image);
    }
  }

  const dto: ContextDTO = {
    settings: context.settings,
    images,
  };

  return new File([JSON.stringify(dto)], 'export.json', {
    type: 'application/json',
  });
};
