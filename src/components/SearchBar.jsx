import React from 'react';
import { InputGroup, Input, InputRightElement } from '@chakra-ui/input';
import { SearchIcon } from '@chakra-ui/icons';

const SearchBar = () => {
  return (
    <InputGroup>
      <Input type="text" placeholder="Enter city" size="md" />
      <InputRightElement>
        <SearchIcon color="gray.400" />
      </InputRightElement>
    </InputGroup>
  );
};

export default SearchBar;
