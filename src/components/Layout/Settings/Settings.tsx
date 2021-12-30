import React from 'react';
import { Box, Divider, Flex, Icon, Stack, Text } from '@chakra-ui/react';
import { AppContext } from 'app-context';
import { ColorSetting } from './ColorSetting';
import { RiMore2Fill, RiSettings3Fill } from 'react-icons/ri';
import { SettingSlider } from './SettingSlider';
import { BorderRadii, BorderThicknesses } from 'app-context';

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
            <Icon mr="2" as={RiSettings3Fill} />
            Settings
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
          <Divider />
          <SettingSlider
            value={BorderRadii.indexOf(context.borderRadius)}
            label="Border radius"
            sliderValues={BorderRadii}
            setValue={context.setBorderRadius}
          />
          <Divider />
          <SettingSlider
            value={BorderThicknesses.indexOf(context.borderThickness)}
            label="Border thickness"
            sliderValues={BorderThicknesses}
            setValue={context.setBorderThickness}
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
