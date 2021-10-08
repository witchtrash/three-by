import React from 'react';

interface IAppContext {
  backgroundColor: string;
  setBackgroundColor?: (color: string) => void;
  borderColor: string;
  setBorderColor?: (color: string) => void;
  spacing: string;
  setSpacing?: (spacing: string) => void;
  rows: number;
  setRows?: (rows: number) => void;
  columns: number;
  setColumns?: (columns: number) => void;
}

export const defaults: IAppContext = {
  backgroundColor: '#b2f5ea',
  borderColor: '#fff',
  spacing: '8px',
  rows: 3,
  columns: 3,
};

export const AppContext = React.createContext<IAppContext>(defaults);
