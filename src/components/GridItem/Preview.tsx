import { Box } from '@chakra-ui/react';
import React from 'react';
import { useAppContext } from 'app-context';
import styled from '@emotion/styled';

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

interface PreviewProps {
  imageId: string;
}
export const Preview = (props: PreviewProps) => {
  const context = useAppContext();

  return (
    <Box position="relative" w="full" h="full" className="gridImage">
      <Image
        className="gridImage"
        alt={`Collage image ${props.imageId}`}
        src={context.images[props.imageId].preview}
      />
    </Box>
  );
};
