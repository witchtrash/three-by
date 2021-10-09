import React from 'react';

export interface Image {
  id: string;
  fileName: string;
  original: File;
  preview: string;
}

export type BorderThickness = 'thick' | 'thin' | 'none';
export type BorderRadius = 'large' | 'small' | 'none';

interface IAppContext {
  backgroundColor: string;
  setBackgroundColor?: (color: string) => void;
  borderColor: string;
  setBorderColor?: (color: string) => void;
  images: Record<string, Image>;
  setImage?: (id: string, image: Image) => void;
  removeImage?: (id: string) => void;
}

export const defaults: IAppContext = {
  backgroundColor: 'rgba(238, 218, 255, 1)',
  borderColor: 'rgba(255, 255, 255, 1)',
  images: {},
};

export const AppContext = React.createContext<IAppContext>(defaults);
