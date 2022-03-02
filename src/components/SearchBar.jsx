import React, { useContext, useEffect, useState } from 'react';
import { WeatherContext } from '../context';
import { useDebounce } from '../hooks/useDebounce';
import { useColorModeValue } from '@chakra-ui/color-mode';
import { Center, Stack, Text } from '@chakra-ui/layout';
import { InputGroup, InputRightElement } from '@chakra-ui/input';
import { SearchIcon } from '@chakra-ui/icons';
import { Spinner } from '@chakra-ui/spinner';
import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
} from '@choc-ui/chakra-autocomplete';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [options, setOptions] = useState([]);
  const [isEmpty, setIsEmpty] = useState(false);
  const debouncedQuery = useDebounce(query, 750);

  const { getForecast } = useContext(WeatherContext);

  // Light mode | Dark mode style
  const color = useColorModeValue('gray.400', 'gray.600');

  useEffect(() => {
    const searchWeatherHandler = async (search) => {
      try {
        const response = await fetch(
          `https://api.weatherapi.com/v1/search.json?key=${process.env.REACT_APP_API_KEY}&q=${search}`
        );
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const data = await response.json();
        if (data.length === 0) setIsEmpty(true);
        setOptions(data);
      } catch (error) {
        console.log(`Error: ${error}`);
      }
    };

    if (debouncedQuery) {
      setIsEmpty(false);
      searchWeatherHandler(debouncedQuery);
    }
  }, [debouncedQuery]);

  const listState = isEmpty ? (
    <Center py={2}>
      <Text color="gray.500">No city or state found!</Text>
    </Center>
  ) : (
    <Center py={2}>
      <Spinner size="lg" thickness="4px" color="brand.400" />
    </Center>
  );

  return (
    <Stack direction="column" w="full">
      <AutoComplete
        rollNavigation
        maxSuggestions={5}
        emptyState={listState}
        filter={(item) => item}
        onSelectOption={({ item }) => {
          getForecast(item.value);
          setQuery(item.value);
        }}
      >
        <InputGroup>
          <AutoCompleteInput
            variant="outline"
            placeholder="Enter city or state..."
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
            }}
          />
          <InputRightElement>
            <SearchIcon color={color} />
          </InputRightElement>
        </InputGroup>
        <AutoCompleteList>
          {options.map((option) => (
            <AutoCompleteItem
              key={option.id}
              value={option.name}
              label={option.value}
              _focus={{
                bg: 'brand.400',
                color: 'brand.900',
              }}
            >
              {option.name}
            </AutoCompleteItem>
          ))}
        </AutoCompleteList>
      </AutoComplete>
    </Stack>
  );
};

export default SearchBar;
