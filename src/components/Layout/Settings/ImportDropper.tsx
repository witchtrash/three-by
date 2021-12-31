import { Box, Button, Flex, Icon, Spinner, Text } from '@chakra-ui/react';
import { useAppContext } from 'app-context';
import React from 'react';
import Dropzone from 'react-dropzone';
import { RiAddCircleFill } from 'react-icons/ri';
import { importData } from 'tools/import';

interface ImportDropperProps {
  onClose: () => void;
}
export const ImportDropper = (props: ImportDropperProps) => {
  const context = useAppContext();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);

  const onDrop = async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    setLoading(true);
    importData(file, context)
      .then(() => {
        setLoading(false);
        props.onClose();
      })
      .catch(() => {
        setLoading(false);
        setError(true);
      });
  };

  return (
    <Box h="full">
      <Box
        position="relative"
        w="full"
        h={{
          base: '20em',
          md: '20em',
        }}
      >
        <Dropzone accept="application/json" onDrop={onDrop}>
          {({ getRootProps, getInputProps }) => (
            <Box h="full" w="full" p="4">
              <Flex
                display="flex"
                borderRadius="lg"
                borderWidth="medium"
                borderStyle="dashed"
                borderColor="pink.200"
                h="full"
                w="full"
                p="2"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                transition="0.2s ease-in-out color, opacity"
                _hover={{
                  cursor: 'pointer',
                  borderColor: 'red.200',
                }}
                {...getRootProps()}
              >
                {loading ? (
                  <React.Fragment>
                    <Spinner
                      size="xl"
                      thickness="4px"
                      emptyColor="pink.100"
                      color="pink.300"
                      speed="0.4s"
                    />
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <input {...getInputProps()} />
                    <Icon
                      w="4em"
                      h="4em"
                      as={RiAddCircleFill}
                      color="red.200"
                    />
                    {error ? (
                      <Text mt="2" color="pink.400">
                        Failed to import file :(
                      </Text>
                    ) : (
                      <Text mt="2" color="pink.400">
                        Drop your export file here!
                      </Text>
                    )}
                  </React.Fragment>
                )}
              </Flex>
            </Box>
          )}
        </Dropzone>
      </Box>
      <Flex alignItems="center" justifyContent="flex-end" w="full" p="4">
        <Button onClick={props.onClose} mr="4">
          Cancel
        </Button>
      </Flex>
    </Box>
  );
};
