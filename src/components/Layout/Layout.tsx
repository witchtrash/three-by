import React from 'react';
import { Box } from '@chakra-ui/react';
import { Header } from './Header';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = (props: LayoutProps) => {
  return (
    <Box
      margin="0 auto"
      transition="0.5s ease-out"
      minHeight="100vh"
      height="100%"
    >
      <Box as="header">
        <Header />
      </Box>
      <Box as="main">{props.children}</Box>
    </Box>
  );
};
