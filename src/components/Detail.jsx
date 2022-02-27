import React, { useContext } from 'react';
import { Grid, GridItem, Text } from '@chakra-ui/layout';
import { WeatherContext } from '../context';

const Detail = () => {
  const {
    isCelsius,
    state: { current },
  } = useContext(WeatherContext);

  const wind = current.wind_kph;
  const feelsLike = current[isCelsius ? 'feelslike_c' : 'feelslike_f'];
  const humidity = current.humidity;
  const precip = current.precip_in;

  return (
    <Grid mt={8} templateColumns="repeat(4, 1fr)" gap={2}>
      <GridItem>
        <Text fontSize="sm" textAlign="center" isTruncated>
          Feels Like
        </Text>
        <Text fontSize="xl" fontWeight="bold" textAlign="center">
          {feelsLike}
          <Text as="span" fontWeight="normal">
            &#176;
          </Text>
        </Text>
      </GridItem>
      <GridItem>
        <Text fontSize="sm" textAlign="center" isTruncated>
          Wind
        </Text>
        <Text fontSize="xl" fontWeight="bold" textAlign="center">
          {wind}
          <Text as="span" fontSize="sm" fontWeight="normal">
            km
          </Text>
        </Text>
      </GridItem>
      <GridItem>
        <Text fontSize="sm" textAlign="center" isTruncated>
          Precipitation
        </Text>
        <Text fontSize="xl" fontWeight="bold" textAlign="center">
          {precip}
          <Text as="span" fontSize="sm" fontWeight="normal">
            %
          </Text>
        </Text>
      </GridItem>
      <GridItem>
        <Text fontSize="sm" textAlign="center" isTruncated>
          Humidity
        </Text>
        <Text fontSize="xl" fontWeight="bold" textAlign="center">
          {humidity}
          <Text as="span" fontSize="sm" fontWeight="normal">
            %
          </Text>
        </Text>
      </GridItem>
    </Grid>
  );
};

export default Detail;
