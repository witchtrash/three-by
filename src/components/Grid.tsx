import React from 'react';
import { SimpleGrid } from '@chakra-ui/layout';
import { GridItem } from 'components/GridItem';

export const Grid = () => {
  return (
    <SimpleGrid
      columns={{
        base: 1,
        md: 3,
      }}
      p={{
        base: '4',
        md: '8',
      }}
      maxW="60em"
      minW="20em"
      w="full"
    >
      {new Array(9).fill(0).map((_v, i) => (
        <GridItem key={`collage-image-${i}`} imageId={String(i)} />
      ))}
    </SimpleGrid>
  );
};
