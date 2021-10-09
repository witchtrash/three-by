import React from 'react';

interface IAppContext {
  backgroundColor: string;
  setBackgroundColor?: (color: string) => void;
  borderColor: string;
  setBorderColor?: (color: string) => void;
}

export const defaults: IAppContext = {
  backgroundColor: 'rgba(238, 218, 255, 1)',
  borderColor: 'rgba(255, 255, 255, 1)',
};

export const AppContext = React.createContext<IAppContext>(defaults);
