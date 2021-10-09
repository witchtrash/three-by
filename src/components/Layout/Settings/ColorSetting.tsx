import React from 'react';
import {
  Box,
  Text,
  Flex,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useDisclosure,
  Center,
} from '@chakra-ui/react';
import { RgbaStringColorPicker } from 'react-colorful';

interface ColorSettingProps {
  color: string;
  setColor?: (color: string) => void;
  name: string;
}
export const ColorSetting = (props: ColorSettingProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex alignItems="center">
      <Popover isOpen={isOpen} onClose={onClose} placement="right-end" isLazy>
        <PopoverTrigger>
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
            onClick={onOpen}
          />
        </PopoverTrigger>
        <PopoverContent height="13em" width="13em" boxShadow="lg">
          <Center w="full" h="full">
            <RgbaStringColorPicker
              color={props.color}
              onChange={props.setColor}
            />
          </Center>
        </PopoverContent>
        <Text>{props.name}</Text>
      </Popover>
    </Flex>
  );
};
