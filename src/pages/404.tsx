import { Text, Center, Stack } from '@chakra-ui/react';
import Head from 'next/head';
import React from 'react';

const NotFound = () => (
  <React.Fragment>
    <Head>
      <title>three by | 404</title>
    </Head>

    <Center w="full" h="100vh">
      <Stack spacing="4">
        <Text fontSize="4xl">404 | Page not found</Text>
      </Stack>
    </Center>
  </React.Fragment>
);

export default NotFound;
