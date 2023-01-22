import { AppPropsType, AppType, RenderPage } from "next/dist/shared/lib/utils";
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
  DocumentInitialProps,
} from "next/document";
import { JSXElementConstructor, ReactElement } from "react";

import { ServerStyleSheet } from "styled-components";

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext): Promise<{
    styles: JSX.Element[];
    html: string;
    head?: (JSX.Element | null)[] | undefined;
  }> {
    const sheet = new ServerStyleSheet();
    const originalRenderPage: RenderPage = ctx.renderPage;

    try {
      ctx.renderPage = ():
        | DocumentInitialProps
        | Promise<DocumentInitialProps> =>
        originalRenderPage({
          enhanceApp:
            (
              App: AppType<{}>
            ): ((props: AppPropsType<any, {}>) => ReactElement<
              {
                sheet: ServerStyleSheet;
              },
              string | JSXElementConstructor<any>
            >) =>
            (
              props: AppPropsType<any, {}>
            ): ReactElement<
              {
                sheet: ServerStyleSheet;
              },
              string | JSXElementConstructor<any>
            > =>
              sheet.collectStyles(<App {...props} />),
        });

      const initialProps: DocumentInitialProps = await Document.getInitialProps(
        ctx
      );
      return {
        ...initialProps,
        styles: [
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>,
        ],
      };
    } finally {
      sheet.seal();
    }
  }

  render(): JSX.Element {
    return (
      <Html lang="pt-BR">
        <Head></Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
