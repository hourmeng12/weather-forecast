import React, { useContext } from 'react';
import { WeatherContext } from '../context';
import { useColorModeValue } from '@chakra-ui/color-mode';
import {
  Box,
  Flex,
  Heading,
  Spacer,
  Stack,
  StackDivider,
  Text,
} from '@chakra-ui/layout';
import { Image } from '@chakra-ui/image';
import { getDay } from '../helpers/getDay';
import { getShortDate } from '../helpers/getDate';

const Forecast = () => {
  const {
    isCelsius,
    state: { forecast },
  } = useContext(WeatherContext);

  // Light mode | Dark mode style
  const bg = useColorModeValue('white', 'gray.700');
  const color = useColorModeValue('gray.600', 'gray.400');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  return forecast.map((weather, index) => {
    const date = getShortDate(weather.date);
    const conditionIcon = weather.day.condition.icon;
    const minTemp = weather.day[isCelsius ? 'mintemp_c' : 'mintemp_f'];
    const avgTemp = weather.day[isCelsius ? 'avgtemp_c' : 'avgtemp_f'];
    const maxTemp = weather.day[isCelsius ? 'maxtemp_c' : 'mintemp_f'];
    return (
      <Flex
        key={index}
        mt={4}
        px={6}
        py={4}
        display="flex"
        align="center"
        bg={bg}
        shadow="base"
        borderRadius="2xl"
        transitionDuration=".25s"
      >
        <Box>
          <Heading as="h3" fontSize="lg" fontWeight="medium">
            {getDay(weather.date)}
          </Heading>
          <Text color={color}>{date}</Text>
        </Box>
        <Spacer />
        <Flex lineHeight="shorter" textAlign="center">
          <Stack mr={6} spacing={0}>
            <Text fontSize="2xl">
              {avgTemp}
              <Text as="span">&#176;</Text>
            </Text>
            <Stack
              direction="row"
              divider={<StackDivider borderColor={borderColor} />}
            >
              <Text color={color}>
                {minTemp}
                <Text as="span">&#176;</Text>
              </Text>
              <Text>
                {maxTemp}
                <Text as="span">&#176;</Text>
              </Text>
            </Stack>
          </Stack>
          <Image boxSize="50px" src={conditionIcon} alt="weather condition" />
        </Flex>
      </Flex>
    );
  });
};

export default Forecast;
