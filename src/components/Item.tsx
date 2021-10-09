import React from 'react';
import { Box, BoxProps } from '@chakra-ui/layout';
import { AppContext } from 'app-context';
import { AspectRatio } from '@chakra-ui/react';

interface ItemProps extends BoxProps {}
export const Item = (props: ItemProps) => {
  const context = React.useContext(AppContext);

  return (
    <AspectRatio ratio={3 / 2} m="2">
      <Box
        {...props}
        borderColor={context.borderColor}
        borderWidth="thick"
        backgroundColor="gray.100"
        w="full"
      />
    </AspectRatio>
  );
};
