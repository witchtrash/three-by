import React from 'react';
import { Center, Button, Box } from '@chakra-ui/react';
import { Layout } from 'components/Layout';
import { Grid } from 'components/Grid';
import { toJpeg } from 'dist/html-to-image';
import { AppContext } from 'app-context';
import Head from 'next/head';

const Index = () => {
  const gridRef = React.createRef<HTMLDivElement>();
  const linkRef = React.createRef<HTMLAnchorElement>();
  const context = React.useContext(AppContext);

  const filterNode = (node: HTMLElement): boolean => {
    return !node.classList.contains('generate-hidden');
  };

  const generateCollage = React.useCallback(() => {
    if (!gridRef.current) {
      return;
    }

    toJpeg(gridRef.current, {
      quality: 0.98,
      filter: filterNode,
      backgroundColor: context.settings.backgroundColor,
      canvasHeight: 1000,
      canvasWidth: 1000,
      height: 930,
      width: 930,
      styles: {
        grid: {
          padding: '15px',
          gridTemplateColumns: '300px 300px 300px',
          gridTemplateRows: '300px 300px 300px',
          height: '100%',
          width: '100%',
          overflow: 'hidden',
        },
        gridItem: {
          width: '290px',
          height: '290px',
        },
        gridImage: {
          width: '100%',
          height: '100%',
        },
      },
    }).then(data => {
      if (!linkRef.current) {
        return;
      }

      linkRef.current.download = `three-by-collage.${
        new Date().toISOString().split('T')[0]
      }.png`;
      linkRef.current.href = data;
      linkRef.current.click();
    });
  }, [gridRef, linkRef, context.settings.backgroundColor]);

  return (
    <React.Fragment>
      <Head>
        <title>three by | Collage</title>
      </Head>

      <Layout>
        <Button
          className="generate-hidden"
          position="fixed"
          bgGradient="linear(to-r, purple.300, pink.300)"
          backgroundSize="150%"
          backgroundPosition="0 0"
          color="white"
          zIndex="1000"
          bottom="0"
          left="50%"
          size="lg"
          transform="translate(-50%, -50%)"
          boxShadow="lg"
          onClick={generateCollage}
          transition="0.2s ease-in-out background-position"
          _hover={{
            backgroundPosition: '100% 100%',
          }}
        >
          Generate collage
        </Button>
        <Center w="full" h="full" minH="100vh">
          <Grid ref={gridRef} />
        </Center>
        <Box display="hidden">
          <a ref={linkRef} rel="nofollow" tabIndex={-1} />
        </Box>
      </Layout>
    </React.Fragment>
  );
};

export default Index;
