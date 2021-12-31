import React from 'react';

export interface Image {
  id: string;
  fileName: string;
  original: File;
  preview: string;
}

export const BorderThicknesses = ['none', 'thin', 'medium', 'thick'];
export const BorderRadii = ['none', 'md', 'lg', 'xl', '2xl'];

export type BorderThickness = typeof BorderThicknesses[number];
export type BorderRadius = typeof BorderRadii[number];

interface Settings {
  backgroundColor: string;
  borderColor: string;
  borderRadius: BorderRadius;
  borderThickness: BorderThickness;
}

export interface IAppContext {
  settings: Settings;
  setBackgroundColor?: (color: string) => void;
  setBorderColor?: (color: string) => void;
  images: Record<string, Image>;
  setImage?: (id: string, image: Image) => void;
  loadImages?: (images: Image[]) => void;
  removeImage?: (id: string) => void;
  setBorderRadius?: (radius: BorderRadius) => void;
  setBorderThickness?: (thickness: BorderThickness) => void;
}

export const defaults: IAppContext = {
  settings: {
    backgroundColor: 'rgba(238, 218, 255, 1)',
    borderColor: 'rgba(255, 255, 255, 1)',
    borderRadius: 'lg',
    borderThickness: 'thick',
  },
  images: {},
};

export const AppContext = React.createContext<IAppContext>(defaults);
