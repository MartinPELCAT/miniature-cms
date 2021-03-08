import "tailwindcss/tailwind.css";
import { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import { client } from "src/graphql/apollo-client";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}
