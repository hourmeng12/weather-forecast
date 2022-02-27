import React from 'react';
import ReactDOM from 'react-dom';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import WeatherProvider from './context';
import App from './App';
import theme from './theme';

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <WeatherProvider>
        <ColorModeScript initialColorMode="light" />
        <App />
      </WeatherProvider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
