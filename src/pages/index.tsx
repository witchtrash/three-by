import React from 'react';
import { Center, Button, useMediaQuery, Box } from '@chakra-ui/react';
import { Layout } from 'components/Layout';
import { Grid } from 'components/Grid';
import { toJpeg } from 'dist/html-to-image';
import { AppContext } from 'app-context';

const Index = () => {
  const gridRef = React.createRef<HTMLDivElement>();
  const linkRef = React.createRef<HTMLAnchorElement>();
  const context = React.useContext(AppContext);
  const [largerThanSm] = useMediaQuery('(min-width: 768px');

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
      backgroundColor: context.backgroundColor,
    }).then(data => {
      if (!linkRef.current) {
        return;
      }

      linkRef.current.download = 'my-image-name.png';
      linkRef.current.href = data;
      linkRef.current.click();
    });
  }, [gridRef, linkRef, context.backgroundColor]);

  return (
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
        <a ref={linkRef} />
      </Box>
    </Layout>
  );
};

export default Index;
