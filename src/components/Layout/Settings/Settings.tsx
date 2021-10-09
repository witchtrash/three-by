import React from 'react';
import { Box, Divider, Flex, Icon, Stack, Text } from '@chakra-ui/react';
import { AppContext } from 'app-context';
import { ColorSetting } from './ColorSetting';
import { RiBrushLine, RiMore2Fill } from 'react-icons/ri';

export const Settings = () => {
  const context = React.useContext(AppContext);
  const [settingsExpanded, setSettingsExpanded] = React.useState(false);

  return (
    <Box
      w="15em"
      backgroundColor="teal.800"
      position="absolute"
      top="10"
      left={settingsExpanded ? '0em' : '-13em'}
      borderRightRadius="md"
      boxShadow="lg"
      fontSize="lg"
      z-index="100"
      transition="0.2s ease-in-out left"
    >
      <Flex flexDirection="row">
        <Stack flex="1" spacing="3" p="4" backgroundColor="gray.50">
          <Text mb="2" color="pink.600">
            <Icon mr="2" as={RiBrushLine} />
            Color settings
          </Text>
          <ColorSetting
            name="Background"
            color={context.backgroundColor}
            setColor={context.setBackgroundColor}
          />
          <Divider />
          <ColorSetting
            name="Border"
            color={context.borderColor}
            setColor={context.setBorderColor}
          />
        </Stack>
        <Box
          p="2"
          justifySelf="flex-end"
          justifyContent="center"
          alignItems="center"
          display="flex"
          color="white"
          _hover={{
            cursor: 'pointer',
            color: 'pink',
          }}
          transition="0.2s ease-in-out color"
          onClick={() => setSettingsExpanded(!settingsExpanded)}
        >
          <Icon w="1.5em" h="1.5em" as={RiMore2Fill} />
        </Box>
      </Flex>
    </Box>
  );
};
