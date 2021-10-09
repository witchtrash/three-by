import React from 'react';
import { Box, IconButton, Stack } from '@chakra-ui/react';
import { AppContext } from 'app-context';
import { RiCloseLine, RiCropLine } from 'react-icons/ri';
import { Tooltip } from 'components/Tooltip';

interface ToolbarProps {
  imageId: string;
}
export const Toolbar = (props: ToolbarProps) => {
  const context = React.useContext(AppContext);

  const onRemove = () => {
    if (context.removeImage) {
      context.removeImage(props.imageId);
    }
  };

  return (
    <Box
      position="absolute"
      zIndex="100"
      top="0"
      right="0"
      backgroundColor="white"
      opacity="0.6"
      borderEndStartRadius="md"
    >
      <Stack p="1" onClick={e => e.stopPropagation()}>
        <Tooltip label="Remove">
          <IconButton
            size="sm"
            backgroundColor="transparent"
            aria-label="Crop image"
            as={RiCropLine}
          />
        </Tooltip>
        <Tooltip label="Crop">
          <IconButton
            size="sm"
            backgroundColor="transparent"
            aria-label="Remove image"
            as={RiCloseLine}
            onClick={onRemove}
          />
        </Tooltip>
      </Stack>
    </Box>
  );
};
