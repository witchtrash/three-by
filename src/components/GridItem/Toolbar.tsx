import React from 'react';
import {
  Box,
  IconButton,
  Stack,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
} from '@chakra-ui/react';
import { AppContext, CropData } from 'app-context';
import { RiCloseLine, RiCropLine } from 'react-icons/ri';
import { Tooltip } from 'components/Tooltip';
import { Cropper } from './Cropper';

interface ToolbarProps {
  imageId: string;
}
export const Toolbar = (props: ToolbarProps) => {
  const context = React.useContext(AppContext);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onRemove = () => {
    if (context.removeImage) {
      context.removeImage(props.imageId);
    }
  };

  const onCrop = (cropData: CropData) => {
    console.log(cropData);
    onClose();
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
        <Tooltip label="Crop">
          <IconButton
            size="sm"
            backgroundColor="transparent"
            aria-label="Crop image"
            as={RiCropLine}
            onClick={onOpen}
          />
        </Tooltip>
        <Tooltip label="Remove">
          <IconButton
            size="sm"
            backgroundColor="transparent"
            aria-label="Remove image"
            as={RiCloseLine}
            onClick={onRemove}
          />
        </Tooltip>
      </Stack>
      <Modal isOpen={isOpen} onClose={onClose} size="md" isCentered>
        <ModalOverlay />
        <ModalContent
          w={{
            base: '20em',
            md: '30em',
          }}
        >
          <ModalHeader>Crop image</ModalHeader>
          <ModalCloseButton />
          <Cropper onClose={onClose} onCrop={onCrop} imageId={props.imageId} />
        </ModalContent>
      </Modal>
    </Box>
  );
};
