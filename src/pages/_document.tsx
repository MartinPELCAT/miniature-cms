import Document, { Html, Head, Main, NextScript } from "next/document";

export default class CustomDocument extends Document {
  render() {
    return (
      <Html>
        <Head />
        <body className="antialiased overflow-y-scroll">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
