import React from 'react';
import { AppContext } from 'app-context';
import { AspectRatio, Box, Icon, BoxProps } from '@chakra-ui/react';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';
import { RiAddCircleFill, RiErrorWarningFill } from 'react-icons/ri';

interface GridItemProps extends BoxProps {
  imageId: string;
}
export const GridItem = (props: GridItemProps) => {
  const context = React.useContext(AppContext);
  const [valid, setValid] = React.useState(true);

  const onDrop = React.useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length && context.setImage) {
        const file = acceptedFiles[0];

        context.setImage(props.imageId, {
          id: props.imageId,
          fileName: file.name,
          original: file,
          preview: URL.createObjectURL(file),
        });
      }
    },
    [context, props.imageId]
  );

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
        color="gray.200"
        w="full"
        borderRadius="lg"
        transition="0.2s ease-in-out color"
        _hover={{
          color: 'pink.300',
        }}
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        {context.images[props.imageId] ? (
          <Box position="relative" w="full" h="full">
            <Image
              alt={`Collage image ${props.imageId}`}
              objectFit="cover"
              layout="fill"
              src={context.images[props.imageId].preview}
            />
          </Box>
        ) : (
          <React.Fragment>
            {valid ? (
              <Icon w="4em" h="4em" as={RiAddCircleFill} />
            ) : (
              <Icon w="4em" h="4em" as={RiErrorWarningFill} color="red.200" />
            )}
          </React.Fragment>
        )}
      </Box>
    </AspectRatio>
  );
};
