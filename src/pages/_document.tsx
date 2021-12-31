import { ColorModeScript } from '@chakra-ui/react';
import { Html, Head, Main, NextScript } from 'next/document';
import { theme } from 'styles/theme';

const Document = () => (
  <Html lang="en">
    <Head>
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
      <meta name="msapplication-TileColor" content="#da532c" />
      <meta name="theme-color" content="#ffffff" />

      <meta property="og:title" content="three by" key="og-title" />
      <meta name="author" content="mari" key="author" />

      <meta
        name="description"
        content="Show off your superior taste with a convenient 3x3 grid."
        key="description"
      />
      <meta
        property="og:description"
        content="Show off your superior taste with a convenient 3x3 grid."
        key="og-description"
      />
      <meta property="og:site_name" content="three.gay" />
      <meta property="og:type" content="website" key="og-type" />
      <meta property="og:url" content="https://three.gay" />
      <meta property="og:image" content="/og.webp" key="og-image" />
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:image" content="/og.webp" key="og-image" />
    </Head>
    <body>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <Main />
      <NextScript />
    </body>
  </Html>
);

export default Document;
