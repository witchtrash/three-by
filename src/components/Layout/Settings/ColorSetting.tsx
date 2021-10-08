import { Box, Text, Flex } from '@chakra-ui/layout';
import React from 'react';

interface ColorSettingProps {
  color: string;
  setColor?: (color: string) => void;
  name: string;
}
export const ColorSetting = (props: ColorSettingProps) => {
  return (
    <Flex alignItems="center">
      <Box
        w="6"
        h="6"
        mr="2"
        borderRadius="md"
        backgroundColor={props.color}
        _hover={{
          cursor: 'pointer',
          boxShadow: 'outline',
        }}
      />
      <Text>{props.name}</Text>
    </Flex>
  );
};
