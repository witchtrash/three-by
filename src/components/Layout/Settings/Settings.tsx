import React from 'react';
import { Box, Divider, Flex, Icon, Stack, Text } from '@chakra-ui/react';
import { AppContext } from 'app-context';
import { ColorSetting } from './ColorSetting';
import { RiBrushLine, RiMore2Fill, RiSettings2Line } from 'react-icons/ri';

export const Settings = () => {
  const context = React.useContext(AppContext);
  const [settingsExpanded, setSettingsExpanded] = React.useState(false);

  return (
    <Box
      w="240px"
      backgroundColor="gray.50"
      position="relative"
      top="10"
      left={settingsExpanded ? 0 : -210}
      borderRightRadius="md"
      boxShadow="lg"
      fontSize="lg"
      transition="0.2s ease-in-out left"
    >
      <Flex flexDirection="row">
        <Stack flex="1" spacing="3" p="4">
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
          w="40px"
          borderRightRadius="md"
          justifySelf="flex-end"
          backgroundColor="teal.800"
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
          <Icon size="40px" as={RiMore2Fill} />
        </Box>
      </Flex>
    </Box>
  );
};
