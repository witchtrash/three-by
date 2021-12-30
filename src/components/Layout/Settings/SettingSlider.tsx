import React from 'react';
import {
  Box,
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
  Text,
} from '@chakra-ui/react';

interface SettingSliderProps {
  sliderValues: string[];
  value: number;
  setValue?: (value: string) => void;
  label: string;
}
export const SettingSlider = ({ value, ...rest }: SettingSliderProps) => {
  return (
    <Box>
      <Text pl="5" mb="1">
        {rest.label}
      </Text>
      <Box px="5" pb="2" m="0" height="12">
        <Slider
          value={value}
          min={0}
          max={rest.sliderValues.length - 1}
          onChange={value => {
            if (rest.setValue) {
              rest.setValue(rest.sliderValues[value]);
            }
          }}
        >
          {rest.sliderValues.map((_v, index) => (
            <SliderMark
              key={`mark-${index}`}
              value={index}
              mt="3"
              ml="-3px"
              fontSize="xs"
              fontFamily="monospace"
              textAlign="center"
            >
              {index}
            </SliderMark>
          ))}
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
      </Box>
    </Box>
  );
};
