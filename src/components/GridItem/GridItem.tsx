import React from 'react';
import { AppContext } from 'app-context';
import { AspectRatio, Box, Icon, BoxProps } from '@chakra-ui/react';
import { useDropzone } from 'react-dropzone';
import { RiAddCircleFill, RiErrorWarningFill } from 'react-icons/ri';
import { Preview } from './Preview';
import { Toolbar } from './Toolbar';
import { Tooltip } from 'components/Tooltip';

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
        transition="0.2s ease-in-out color, opacity"
        _hover={{
          color: 'pink.300',
        }}
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        {context.images[props.imageId] ? (
          <React.Fragment>
            <Preview imageId={props.imageId} />
            <Toolbar imageId={props.imageId} />
          </React.Fragment>
        ) : (
          <Tooltip
            openDelay={200}
            label={valid ? 'Add an image' : 'Not a valid image!'}
          >
            <Icon
              w="4em"
              h="4em"
              as={valid ? RiAddCircleFill : RiErrorWarningFill}
              color={!valid ? 'red.200' : undefined}
            />
          </Tooltip>
        )}
      </Box>
    </AspectRatio>
  );
};
