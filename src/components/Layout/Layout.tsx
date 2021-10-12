import React from 'react';
import { Box } from '@chakra-ui/react';
import { Header } from './Header';
import { AppContext } from 'app-context';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = (props: LayoutProps) => {
  const context = React.useContext(AppContext);

  return (
    <Box
      margin="0 auto"
      minHeight="100vh"
      height="100%"
      backgroundColor={context.backgroundColor}
      w="full"
      minW="20em"
    >
      <Header />
      <Box as="main">{props.children}</Box>
    </Box>
  );
};
