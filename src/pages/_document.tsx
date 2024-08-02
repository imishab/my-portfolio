import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <>
          <meta charSet="utf-8" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta
            name="description"
            content="Professional Web Developer in Calicut | Mishab"
          />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="black-translucent"
          />
          <meta name="theme-color" content="black" />
          <meta charSet="UTF-8" />
          <title>Professional Web Developer in Calicut | Mishab.</title>
          <meta
            property="og:title"
            content="IMishab - Professional Web Developer."
          />
          <meta
            property="og:description"
            content="Professional Web Developer in Calicut | IMishab"
          />
          <link
            rel="shortcut icon"
            href="assets/images/favico.png"
            type="image/x-icon"
          />
          <>
            <meta property="og:image" content="https://www.vectorcrop.com/social.jpg" />
            <meta
              property="og:image:secure_url"
              content="https://www.vectorcrop.com/social.jpg"
            />
            <meta property="og:image:alt" content="IMishab" />
          </>

        </>

      </Head>
      <body style={{ background: '#111827' }}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
