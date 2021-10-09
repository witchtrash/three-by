import React, { useContext } from 'react';
import { Layout } from 'components/Layout';
import { Center } from '@chakra-ui/react';
import { AppContext } from 'app-context';
import { Grid } from 'components/Grid';

const Index = () => {
  const context = useContext(AppContext);

  return (
    <Layout>
      <Center w="full" h="full" minH="100vh">
        <Grid />
      </Center>
    </Layout>
  );
};

export default Index;
