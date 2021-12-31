import React from 'react';
import ReactCropper from 'react-easy-crop';
import { Box, Button, Flex } from '@chakra-ui/react';
import { useAppContext } from 'app-context';
import { Area, Point } from 'react-easy-crop/types';

interface CropperProps {
  imageId: string;
  onClose: () => void;
  onCrop: (cropData: Area) => void;
}
export const Cropper = (props: CropperProps) => {
  const context = useAppContext();
  const image = React.useRef<string>();

  const [crop, setCrop] = React.useState<Point>({
    x: 0,
    y: 0,
  });
  const [zoom, setZoom] = React.useState(1);
  const [croppedArea, setCroppedArea] = React.useState<Area>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  const handleCropComplete = (_: Area, pixelCropArea: Area) => {
    // First param is relative size, we want absolute, which is the second param
    setCroppedArea(pixelCropArea);
  };

  React.useEffect(() => {
    image.current = URL.createObjectURL(context.images[props.imageId].original);
    return () => {
      if (image.current) {
        URL.revokeObjectURL(image.current);
      }
    };
  }, [context.images, props.imageId]);

  return (
    <Box h="full">
      <Box
        position="relative"
        w="full"
        h={{
          base: '20em',
          md: '28em',
        }}
      >
        <ReactCropper
          image={image.current}
          crop={crop}
          zoom={zoom}
          zoomSpeed={0.5}
          aspect={1}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={handleCropComplete}
          objectFit="horizontal-cover"
          showGrid={false}
        />
      </Box>
      <Flex alignItems="center" justifyContent="flex-end" w="full" p="4">
        <Button onClick={props.onClose} mr="4">
          Cancel
        </Button>
        <Button onClick={() => props.onCrop(croppedArea)} colorScheme="pink">
          Save
        </Button>
      </Flex>
    </Box>
  );
};
