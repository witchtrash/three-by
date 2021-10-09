import React from 'react';
import { Box, BoxProps } from '@chakra-ui/layout';
import { AppContext } from 'app-context';
import { AspectRatio } from '@chakra-ui/react';
import { FileRejection, useDropzone } from 'react-dropzone';
import Image from 'next/image';

interface ItemProps extends BoxProps {
  imageId: string;
}
export const Item = (props: ItemProps) => {
  const context = React.useContext(AppContext);
  const [image, setImage] = React.useState<string | undefined>(undefined);
  const [valid, setValid] = React.useState(true);

  const onDrop = React.useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length) {
      setImage(URL.createObjectURL(acceptedFiles[0]));
    }
  }, []);

  const onDropRejected = React.useCallback(() => {
    setValid(false);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    multiple: false,
    onDrop,
    onDropRejected,
  });

  return (
    <AspectRatio ratio={1} m="1">
      <Box
        {...props}
        borderColor={context.borderColor}
        borderWidth="thick"
        backgroundColor="gray.100"
        w="full"
        borderRadius="lg"
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <p>ble</p>
        {image ? (
          <Image
            alt={`Collage image ${props.imageId}`}
            objectFit="cover"
            layout="fill"
            src={image}
          />
        ) : null}
      </Box>
    </AspectRatio>
  );
};
