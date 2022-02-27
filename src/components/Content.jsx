import React, { useContext } from 'react';
import { WeatherContext } from '../context';
import { Box, Center } from '@chakra-ui/layout';
import { useColorModeValue } from '@chakra-ui/color-mode';
import Current from './Current';
import Detail from './Detail';
import Forecast from './Forecast';
import { Spinner } from '@chakra-ui/spinner';

const Content = () => {
  const {
    state: { isLoading },
  } = useContext(WeatherContext);

  // Light mode | Dark mode style
  const bg = useColorModeValue('white', 'gray.700');

  return (
    <>
      <Box
        mt={4}
        p={6}
        bg={bg}
        shadow="base"
        borderRadius="2xl"
        transitionDuration=".25s"
        w="full"
      >
        {!isLoading ? (
          <>
            <Current />
            <Detail />
          </>
        ) : (
          <Center>
            <Spinner size="xl" thickness="6px" color="brand.400" />
          </Center>
        )}
      </Box>
      {!isLoading && <Forecast />}
    </>
  );
};

export default Content;
