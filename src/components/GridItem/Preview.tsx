import { Box } from '@chakra-ui/react';
import React from 'react';
import Image from 'next/image';
import { AppContext } from 'app-context';

interface PreviewProps {
  imageId: string;
}
export const Preview = (props: PreviewProps) => {
  const context = React.useContext(AppContext);

  return (
    <Box position="relative" w="full" h="full">
      <Image
        alt={`Collage image ${props.imageId}`}
        objectFit="cover"
        layout="fill"
        src={context.images[props.imageId].preview}
      />
    </Box>
  );
};
