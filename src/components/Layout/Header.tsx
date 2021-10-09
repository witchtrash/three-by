import { Box } from '@chakra-ui/layout';
import { Settings } from './Settings';

export const Header = () => {
  return (
    <Box as="header" position="absolute" zIndex="1000">
      <Settings />
    </Box>
  );
};
