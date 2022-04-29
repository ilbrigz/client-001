import { ChakraProvider } from '@chakra-ui/react';
import Layout from '@components/Layout/Layout';
import { SessionProvider } from 'next-auth/react';
import { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';
import { theme } from '../chakra/theme';
import Head from 'next/head';
import { MantineProvider } from '@mantine/core';
import '@fontsource/open-sans/300.css';
import '@fontsource/open-sans/400.css';
import '@fontsource/open-sans/700.css';
import '../styles/globals.css';

declare module '@mantine/core' {
  export interface MantineThemeOther {
    myCustomProperty: string;
    myCustomFunction: () => void;
  }
}
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <>
      <Head>
        <title>Page title</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <SessionProvider session={session}>
        <RecoilRoot>
          <MantineProvider
            withGlobalStyles
            withNormalizeCSS
            theme={{
              /** Put your mantine theme override here */
              fontFamily: 'Open Sans, sans-serif',
              headings: { fontFamily: 'Open Sans, sans-serif' },
              colorScheme: 'light',
              fontSizes: {
                xs: 12,
                sm: 18,
                md: 26,
                lg: 32,
                xl: 40,
              },
            }}
          >
            <ChakraProvider theme={theme}>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </ChakraProvider>
          </MantineProvider>
        </RecoilRoot>
      </SessionProvider>
    </>
  );
}
