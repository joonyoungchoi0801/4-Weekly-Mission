import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';
import { ServerStyleSheet } from 'styled-components';
import Link from 'next/link';
import Script from 'next/script';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <Link
            rel="stylesheet"
            as="style"
            href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
          />
          <Link rel="preconnect" href="https://fonts.googleapis.com" />
          <Link rel="preconnect" href="https://fonts.gstatic.com" />
          <Link
            href="https://fonts.googleapis.com/css2?family=Abel&family=Noto+Sans+KR:wght@400;600&family=Poppins:wght@400;700&display=swap"
            rel="stylesheet"
          />
          <Link rel="preconnect" href="https://fonts.googleapis.com" />
          <Link rel="preconnect" href="https://fonts.gstatic.com" />
          <Link href="https://fonts.googleapis.com/css2?family=Acme&display=swap" rel="stylesheet" />
          <Script defer src="https://developers.kakao.com/sdk/js/kakao.min.js"></Script>
        </Head>
        <body>
          <Main />
          <NextScript />

          <div id="modal-root"></div>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
