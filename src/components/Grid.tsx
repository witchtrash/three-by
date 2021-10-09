import React from 'react';
import { SimpleGrid, Box } from '@chakra-ui/layout';
import { AppContext } from 'app-context';
import { Item } from 'components/Item';

export const Grid = () => {
  const context = React.useContext(AppContext);

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
      maxW="80em"
      minW="20em"
      w="full"
    >
      <Item />
      <Item />
      <Item />

      <Item />
      <Item />
      <Item />

      <Item />
      <Item />
      <Item />
    </SimpleGrid>
  );
};
