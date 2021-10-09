import { Box, Tooltip as ChakraTooltip, TooltipProps } from '@chakra-ui/react';

export const Tooltip = ({ children, ...rest }: TooltipProps) => (
  <ChakraTooltip
    openDelay={200}
    backgroundColor="pink.300"
    borderRadius="md"
    {...rest}
  >
    <Box>{children}</Box>
  </ChakraTooltip>
);
