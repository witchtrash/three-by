import React from 'react';
import { Box, ChakraProvider } from '@chakra-ui/react';
import { AppProps } from 'next/app';
import { theme } from 'styles/theme';
import { AppContext } from 'app-context';
import Head from 'next/head';
import '@fontsource/poppins';

const App = ({ Component, pageProps }: AppProps) => {
  const [backgroundColor, setBackgroundColor] = React.useState('#b2f5ea');
  const [borderColor, setBorderColor] = React.useState('#fff');
  const [spacing, setSpacing] = React.useState('8px');
  const [rows, setRows] = React.useState(3);
  const [columns, setColumns] = React.useState(3);

  const values = {
    backgroundColor,
    borderColor,
    spacing,
    rows,
    columns,
  };

  const functions = {
    setBackgroundColor,
    setBorderColor,
    setSpacing,
    setRows,
    setColumns,
  };

  return (
    <AppContext.Provider
      value={{
        ...values,
        ...functions,
      }}
    >
      <ChakraProvider theme={theme}>
        <Head>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
          />
        </Head>
        <Box minH="100vh">
          <Component {...pageProps} />
        </Box>
      </ChakraProvider>
    </AppContext.Provider>
  );
};

export default App;
