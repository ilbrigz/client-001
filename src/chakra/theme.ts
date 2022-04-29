import '@fontsource/open-sans/300.css';
import '@fontsource/open-sans/400.css';
import '@fontsource/open-sans/700.css';
import { extendTheme } from '@chakra-ui/react';

// 2. Extend the theme to include custom colors, fonts, etc
export const theme = extendTheme({
  colors: {
    brand: {
      main: '#6D2974',
      blue: '#153e75',
      700: '#2a69ac',
    },
  },

  fonts: {
    body: 'Open Sans, sans-serif',
  },
  styles: {
    global: () => ({
      body: {
        bg: 'gray.200',
      },
      '*': {
        lineHeign: 0,
      },
    }),
  },
});
