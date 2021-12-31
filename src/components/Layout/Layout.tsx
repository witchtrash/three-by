import React from 'react';
import { Box, BoxProps } from '@chakra-ui/react';
import { Header } from './Header';
import { useAppContext } from 'app-context';

interface LayoutProps extends BoxProps {
  children: React.ReactNode;
}

export const Layout = ({ children, ...rest }: LayoutProps) => {
  const context = useAppContext();

  return (
    <Box
      margin="0 auto"
      minHeight="100vh"
      height="100%"
      backgroundColor={context.settings.backgroundColor}
      w="full"
      minW="20em"
      {...rest}
    >
      <Header />
      <Box as="main">{children}</Box>
    </Box>
  );
};
