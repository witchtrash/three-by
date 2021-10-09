import React from 'react';
import ReactCropper from 'react-easy-crop';
import { Box, Button, Flex } from '@chakra-ui/react';
import { AppContext, CropData } from 'app-context';

interface CropperProps {
  imageId: string;
  onClose: () => void;
  onCrop: (cropData: CropData) => void;
}
export const Cropper = (props: CropperProps) => {
  const context = React.useContext(AppContext);
  const image = URL.createObjectURL(context.images[props.imageId].original);

  const [crop, setCrop] = React.useState<Pick<CropData, 'x' | 'y'>>({
    x: 0,
    y: 0,
  });
  const [zoom, setZoom] = React.useState(1);
  const [cropData, setCropData] = React.useState<CropData>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  React.useEffect(() => {
    return () => URL.revokeObjectURL(image);
  }, [image]);

  return (
    <Box h="full">
      <Box
        position="relative"
        w="full"
        h={{
          base: '20em',
          md: '30em',
        }}
      >
        <ReactCropper
          image={image}
          crop={crop}
          zoom={zoom}
          aspect={1}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={setCropData}
        />
      </Box>
      <Flex alignItems="center" justifyContent="flex-end" w="full" p="4">
        <Button onClick={props.onClose} mr="4">
          Cancel
        </Button>
        <Button onClick={() => props.onCrop(cropData)} colorScheme="pink">
          Save
        </Button>
      </Flex>
    </Box>
  );
};
