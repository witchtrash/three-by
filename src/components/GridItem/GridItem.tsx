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
export const GridItem = ({ imageId, ...rest }: GridItemProps) => {
  const context = React.useContext(AppContext);
  const [valid, setValid] = React.useState(true);

  const onDrop = React.useCallback(
    async (acceptedFiles: File[]) => {
      if (acceptedFiles.length && context.setImage) {
        const file = acceptedFiles[0];
        const preview = URL.createObjectURL(file);

        context.setImage(imageId, {
          id: imageId,
          fileName: file.name,
          original: file,
          preview,
        });
      }
    },
    [context, imageId]
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
        {...rest}
        className="gridItem"
        borderColor={context.settings.borderColor}
        borderWidth={context.settings.borderThickness}
        backgroundColor="gray.100"
        color="gray.200"
        w="full"
        borderRadius={context.settings.borderRadius}
        transition="0.2s ease-in-out color, opacity"
        _hover={{
          color: 'pink.300',
        }}
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        {context.images[imageId] ? (
          <React.Fragment>
            <Preview imageId={imageId} />
            <Toolbar imageId={imageId} />
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
