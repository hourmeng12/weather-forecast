import { Button } from '@chakra-ui/button';
import { useColorMode } from '@chakra-ui/color-mode';
import { Flex, Heading } from '@chakra-ui/layout';
import { Show } from '@chakra-ui/react';
import SearchBar from './SearchBar';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex justifyContent="space-between" alignItems="center">
      <Show above="sm">
        <Heading as="h1" flex="1" fontWeight="semibold" fontSize="xl">
          Weather Forecast
        </Heading>
      </Show>
      <Flex w={['full', '55%']}>
        <SearchBar />
        <Button ml={2} variant="solid" onClick={toggleColorMode}>
          {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
        </Button>
      </Flex>
    </Flex>
  );
};

export default Header;
