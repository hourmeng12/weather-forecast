import React, { useContext } from 'react';
import { WeatherContext } from '../context';
import {
  Box,
  Flex,
  Spacer,
  Stack,
  StackDivider,
  Text,
} from '@chakra-ui/layout';
import { Image } from '@chakra-ui/image';
import { Button, ButtonGroup } from '@chakra-ui/button';
import { useColorModeValue } from '@chakra-ui/color-mode';
import { getFullDate } from '../helpers/getDate';

const Temparature = () => {
  const {
    isCelsius,
    setIsCelsius,
    state: { current, forecast },
  } = useContext(WeatherContext);

  const date = getFullDate();

  // Light mode | Dark mode style
  const color = useColorModeValue('gray.600', 'gray.400');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  const temparature = current[isCelsius ? 'temp_c' : 'temp_f'];
  const minTemp = forecast[0].day[isCelsius ? 'mintemp_c' : 'mintemp_f'];
  const maxTemp = forecast[0].day[isCelsius ? 'maxtemp_c' : 'maxtemp_f'];
  const conditionText = current.condition.text;
  const conditionIcon = current.condition.icon;

  return (
    <Box lineHeight="shorter">
      <Flex justify="space-between" align="center">
        <Stack>
          <Text fontSize="2xl" fontWeight="medium">
            Today
          </Text>
          <Text fontSize="sm">{date}</Text>
        </Stack>
        <ButtonGroup spacing={0} variant="checked" size="sm">
          <Button
            borderLeftRadius="md"
            isActive={isCelsius}
            onClick={() => {
              setIsCelsius(true);
            }}
          >
            &#176;C
          </Button>
          <Button
            borderRightRadius="md"
            isActive={!isCelsius}
            onClick={() => {
              setIsCelsius(false);
            }}
          >
            &#176;F
          </Button>
        </ButtonGroup>
      </Flex>
      <Flex align="center">
        <Stack>
          <Text fontSize="6xl" fontWeight="semibold" lineHeight="shorter">
            {temparature}
            <Text as="span" fontWeight="normal">
              &#176;
            </Text>
          </Text>
        </Stack>
        <Spacer />
        <Image boxSize="100px" src={conditionIcon} alt="weather condition" />
      </Flex>
      <Flex direction="row" justify="space-between">
        <Stack
          direction="row"
          divider={<StackDivider borderColor={borderColor} />}
          spacing={2}
        >
          <Text color={color}>
            {minTemp}
            <Text fontWeight="normal" as="span">
              &#176;
            </Text>
          </Text>
          <Text>
            {maxTemp}
            <Text fontWeight="normal" as="span">
              &#176;
            </Text>
          </Text>
        </Stack>
        <Text minW="100px" textAlign="center" casing="capitalize">
          {conditionText}
        </Text>
      </Flex>
    </Box>
  );
};

export default Temparature;
