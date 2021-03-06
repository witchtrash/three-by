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
import { useAppContext } from 'app-context';
import { RiCloseLine, RiCropLine } from 'react-icons/ri';
import { Tooltip } from 'components/Tooltip';
import { Cropper } from './Cropper';
import { cropImage } from 'tools/crop';
import { Area } from 'react-easy-crop/types';

interface ToolbarProps {
  imageId: string;
}
export const Toolbar = (props: ToolbarProps) => {
  const context = useAppContext();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onRemove = () => {
    context.removeImage(props.imageId);
  };

  const onCrop = (croppedArea: Area) => {
    const imageUrl = URL.createObjectURL(
      context.images[props.imageId].original
    );
    const imagePromise = cropImage(imageUrl, croppedArea, {
      height: 300,
      width: 300,
    });

    imagePromise
      .then(blob => {
        context.setImage(props.imageId, {
          ...context.images[props.imageId],
          preview: blob,
        });
      })
      .finally(() => URL.revokeObjectURL(imageUrl));

    onClose();
  };

  return (
    <Box
      position="absolute"
      zIndex="100"
      top="0"
      right="0"
      backgroundColor={context.settings.borderColor}
      opacity="1"
      borderEndStartRadius="md"
      className="generate-hidden"
    >
      <Stack p="1" onClick={e => e.stopPropagation()}>
        <Tooltip label="Crop">
          <span>
            <IconButton
              size="sm"
              backgroundColor="transparent"
              aria-label="Crop image"
              icon={<RiCropLine />}
              fontSize="1.6em"
              onClick={onOpen}
            />
          </span>
        </Tooltip>
        <Tooltip label="Remove">
          <IconButton
            size="sm"
            backgroundColor="transparent"
            aria-label="Remove image"
            icon={<RiCloseLine />}
            fontSize="1.6em"
            onClick={onRemove}
          />
        </Tooltip>
      </Stack>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="md"
        returnFocusOnClose={false}
        autoFocus={false}
        isCentered
      >
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
