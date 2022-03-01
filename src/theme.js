import { extendTheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

const theme = extendTheme({
  colors: {
    brand: {
      100: '#fff8e5',
      200: '#ffebb3',
      300: '#ffdd80',
      400: '#ffd04d',
      500: '#ffc21a',
      600: '#e6a900',
      700: '#b38300',
      800: '#805e00',
      900: '#1a1300',
    },
  },
  shadows: {
    outline: '0 0 0 3px #ffebb3',
  },
  components: {
    Button: {
      variants: {
        solid: (props) => ({
          color: 'brand.900',
          bg: 'brand.400',
          _hover: {
            color: 'brand.900',
            bg: mode('brand.500', 'brand.300')(props),
          },
        }),
        ghost: {
          _hover: {
            color: 'brand.900',
            bg: 'brand.400',
          },
        },
        checked: (props) => ({
          borderRadius: 'none',
          border: '1px',
          borderColor: 'brand.400',
          _hover: {
            bg: mode('brand.200', 'rgb(255, 208, 77,0.75)')(props),
          },
          _active: {
            color: 'brand.900',
            bg: 'brand.400',
          },
        }),
      },
    },
    Input: {
      variants: {
        outline: {
          field: {
            _focus: {
              borderColor: 'brand.400',
              boxShadow: '0 0 0 1px #ffebb3',
            },
          },
        },
      },
    },
  },
});

export default theme;
