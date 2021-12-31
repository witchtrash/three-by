import React from 'react';
import { Box, ChakraProvider } from '@chakra-ui/react';
import { AppProps } from 'next/app';
import { theme } from 'styles/theme';
import { AppContext, defaults, Image } from 'app-context';
import Head from 'next/head';
import '@fontsource/poppins';

const App = ({ Component, pageProps }: AppProps) => {
  const [backgroundColor, setBackgroundColor] = React.useState(
    defaults.settings.backgroundColor
  );
  const [borderColor, setBorderColor] = React.useState(
    defaults.settings.borderColor
  );
  const [borderRadius, setBorderRadius] = React.useState(
    defaults.settings.borderRadius
  );
  const [borderThickness, setBorderThickness] = React.useState(
    defaults.settings.borderThickness
  );
  const [images, setImages] = React.useState(defaults.images);

  const setImage = (id: string, image: Image) => {
    if (images[id]?.preview) {
      URL.revokeObjectURL(images[id].preview);
    }
    setImages({
      ...images,
      ...{
        [id]: image,
      },
    });
  };

  const removeImage = (id: string) => {
    const { [id]: removed, ...rest } = images;
    if (removed.preview) {
      URL.revokeObjectURL(removed.preview);
    }

    setImages(rest);
  };

  const loadImages = (images: Image[]) => {
    const imageDict: Record<string, Image> = {};
    for (const image of images) {
      imageDict[image.id] = image;
    }
    setImages(imageDict);
  };

  const values = {
    settings: {
      backgroundColor,
      borderColor,
      borderRadius,
      borderThickness,
    },
    images,
  };

  const functions = {
    setBackgroundColor,
    setBorderColor,
    setBorderRadius,
    setBorderThickness,
    setImage,
    removeImage,
    loadImages,
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
        <Component {...pageProps} />
      </ChakraProvider>
    </AppContext.Provider>
  );
};

export default App;
