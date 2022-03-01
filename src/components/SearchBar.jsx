import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { InputGroup, Input, InputRightElement } from '@chakra-ui/input';
import { SearchIcon } from '@chakra-ui/icons';
import { Button } from '@chakra-ui/button';
import { useColorModeValue } from '@chakra-ui/color-mode';
import { Box, Center, Stack } from '@chakra-ui/layout';
import { useDebounce } from '../hooks/useDebounce';
import { Spinner } from '@chakra-ui/spinner';
import { useOutsideClick } from '@chakra-ui/react';
import { WeatherContext } from '../context';

const SearchBar = () => {
  const ref = useRef(null);
  const [results, setResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [destination, setDestination] = useState({});
  const [isSearching, setIsSearching] = useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const { getForecast } = useContext(WeatherContext);
  useOutsideClick({
    ref: ref,
    handler: () => {
      setResults([]);
      setSearchTerm('');
    },
  });

  // Light mode | Dark mode style
  const bg = useColorModeValue('white', 'gray.700');
  const color = useColorModeValue('gray.400', 'gray.600');

  // API search function
  const searchWeatherHandler = useCallback(async (search) => {
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/search.json?key=${process.env.REACT_APP_API_KEY}&q=${search}`
      );
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const data = await response.json();
      setResults(data.slice(0, 5));
      setIsSearching(false);
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  }, []);

  useEffect(
    () => {
      if (debouncedSearchTerm) {
        setIsSearching(true);
        searchWeatherHandler(debouncedSearchTerm);
      }
    },
    [debouncedSearchTerm, searchWeatherHandler] // Only call effect if debounced search term changes
  );

  return (
    <Box pos="relative">
      <InputGroup pos="relative">
        <Input
          type="text"
          placeholder={destination.name || 'Phnom Penh'}
          size="md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <InputRightElement>
          <Button color={color} variant="ghost">
            <SearchIcon />
          </Button>
        </InputRightElement>
      </InputGroup>
      {isSearching ||
        (results.length > 0 && (
          <Stack
            ref={ref}
            spacing={0}
            mt={2}
            p={2}
            w="full"
            bg={bg}
            pos="absolute"
            borderRadius="md"
            shadow="md"
            zIndex="dropdown"
          >
            {results.length > 0 &&
              results.map((result) => (
                <Box
                  key={result.id}
                  p={2}
                  borderRadius="md"
                  _hover={{
                    bg: 'brand.400',
                    color: 'brand.900',
                    cursor: 'pointer',
                  }}
                  onClick={() => {
                    setDestination(result);
                    getForecast(result.name);
                    setSearchTerm('');
                    setResults([]);
                  }}
                >
                  {result.name}
                </Box>
              ))}
            {isSearching && (
              <Center py={4}>
                <Spinner size="lg" thickness="4px" color="brand.400" />
              </Center>
            )}
          </Stack>
        ))}
    </Box>
  );
};

export default SearchBar;
