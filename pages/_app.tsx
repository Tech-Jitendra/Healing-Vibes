import { useEffect, useState } from 'react';
import NextApp, { AppProps, AppContext } from 'next/app';
import { getCookie, setCookie } from 'cookies-next';
import Head from 'next/head';
import { MantineProvider, ColorScheme, ColorSchemeProvider, useMantineTheme } from '@mantine/core';
import { Notifications } from '@mantine/notifications';

//importing theme file
import { GoogleOAuthProvider } from '@react-oauth/google';
import { MANTINE_THEME } from '@/themes/Mantine/theme';
import '@/themes/Mantine/WebFonts/stylesheet.css';

//setting up store
import { i18nx } from '../i18n';
import { RootStore, RootStoreProvider, setupRootStore } from '@/models';
import Header from '@/components/modules/Header/Header';

export default function App(props: AppProps & { colorScheme: ColorScheme }) {
  const { Component, pageProps } = props;
  const [colorScheme, setColorScheme] = useState<ColorScheme>(props.colorScheme);
  const theme = useMantineTheme();

  const toggleColorScheme = (value?: ColorScheme) => {
    const nextColorScheme = value || (colorScheme === 'dark' ? 'dark' : 'light');
    setColorScheme(nextColorScheme);
    setCookie('mantine-color-scheme', nextColorScheme, { maxAge: 60 * 60 * 24 * 30 });
  };
  const currentTheme = MANTINE_THEME;
  currentTheme.colorScheme;

  const [rootStore, setRootStore] = useState<RootStore | undefined>(undefined);

  useEffect(() => {
    (async () => {
      setupRootStore().then(setRootStore);
    })();
  }, []);
  if (!rootStore) return null;
  if (rootStore.i18nStore.appLanguage) {
    i18nx.locale = rootStore.i18nStore.appLanguage;
  } else {
    rootStore.i18nStore.setSystemDefault();
  }
  if (rootStore.i18nStore.appLanguage) {
    i18nx.locale = rootStore.i18nStore.appLanguage;
  } else {
    rootStore.i18nStore.setSystemDefault();
  }

  const googleOAuthProviderClientId =
    '115727969785-dr3gd9rpagos187jq3mg8gphbe3hb0ds.apps.googleusercontent.com';

  return (
    <div dir={rootStore.i18nStore.isRTL ? 'rtl' : 'ltr'}>
      <GoogleOAuthProvider clientId={googleOAuthProviderClientId}>
        <RootStoreProvider value={rootStore}>
          <Head>
            <title>TalkHealing</title>
            <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
            <link rel="shortcut icon" href="/favicon.ico" />
          </Head>

          <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
            <MantineProvider
              theme={{ ...currentTheme, colorScheme }}
              withGlobalStyles
              withNormalizeCSS
              withCSSVariables
            >
              <Notifications
                position="bottom-center"
                containerWidth="50%"
                transitionDuration={250}
              />
              <Header />

              <Component {...pageProps} />
            </MantineProvider>
          </ColorSchemeProvider>
        </RootStoreProvider>
      </GoogleOAuthProvider>
    </div>
  );
}

App.getInitialProps = async (appContext: AppContext) => {
  const appProps = await NextApp.getInitialProps(appContext);
  return {
    ...appProps,
    colorScheme: getCookie('mantine-color-scheme', appContext.ctx) || 'light',
  };
};
