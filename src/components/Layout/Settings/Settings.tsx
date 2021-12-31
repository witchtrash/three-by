import React from 'react';
import {
  Box,
  Button,
  Divider,
  Flex,
  Icon,
  Stack,
  Text,
  IconButton,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
} from '@chakra-ui/react';
import { useAppContext } from 'app-context';
import { ColorSetting } from './ColorSetting';
import {
  RiDownload2Line,
  RiMore2Fill,
  RiSettings3Fill,
  RiUpload2Line,
} from 'react-icons/ri';
import { SettingSlider } from './SettingSlider';
import { BorderRadii, BorderThicknesses } from 'app-context';
import { exportData } from 'tools/export';
import { ImportDropper } from './ImportDropper';

export const Settings = () => {
  const context = useAppContext();
  const [settingsExpanded, setSettingsExpanded] = React.useState(false);
  const linkRef = React.createRef<HTMLAnchorElement>();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const downloadJsonDump = async () => {
    if (linkRef.current) {
      const file = await exportData(context);
      const fileUrl = URL.createObjectURL(file);

      linkRef.current.download = `three-by-collage-export.${
        new Date().toISOString().split('T')[0]
      }.json`;
      linkRef.current.href = fileUrl;
      linkRef.current.click();
    }
  };

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
      <Box display="hidden">
        <a ref={linkRef} rel="nofollow" tabIndex={-1} />
      </Box>
      <Flex flexDirection="row">
        <Stack flex="1" spacing="3" p="4" backgroundColor="gray.50">
          <Text mb="2" color="pink.600">
            <Icon mr="2" as={RiSettings3Fill} />
            Settings
          </Text>
          <ColorSetting
            name="Background"
            color={context.settings.backgroundColor}
            setColor={context.setBackgroundColor}
          />
          <Divider />
          <ColorSetting
            name="Border"
            color={context.settings.borderColor}
            setColor={context.setBorderColor}
          />
          <Divider />
          <SettingSlider
            value={BorderRadii.indexOf(context.settings.borderRadius)}
            label="Border radius"
            sliderValues={BorderRadii}
            setValue={context.setBorderRadius}
          />
          <Divider />
          <SettingSlider
            value={BorderThicknesses.indexOf(context.settings.borderThickness)}
            label="Border thickness"
            sliderValues={BorderThicknesses}
            setValue={context.setBorderThickness}
          />
          <Divider />
          <Button
            variant="solid"
            backgroundColor="pink.200"
            color="gray.800"
            _hover={{
              backgroundColor: 'pink.300',
            }}
            leftIcon={<RiUpload2Line />}
            onClick={() => onOpen()}
          >
            Import
          </Button>
          <Button
            backgroundColor="purple.200"
            color="gray.800"
            _hover={{
              backgroundColor: 'purple.300',
            }}
            leftIcon={<RiDownload2Line />}
            onClick={() => downloadJsonDump()}
          >
            Export
          </Button>
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
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="md"
        returnFocusOnClose={false}
        autoFocus={false}
        isCentered
      >
        <ModalOverlay />
        <ModalContent
          w={{
            base: '20em',
            md: '30em',
          }}
        >
          <ModalHeader>Import data</ModalHeader>
          <ModalCloseButton />
          <ImportDropper onClose={onClose} />
        </ModalContent>
      </Modal>
    </Box>
  );
};
