import { ApolloClient, InMemoryCache } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";

export const GRAPHQL_ENDPOINT = "http://localhost:3000/api/gql";

export const client = new ApolloClient({
  uri: GRAPHQL_ENDPOINT,
  cache: new InMemoryCache(),
  link: createUploadLink({ uri: GRAPHQL_ENDPOINT }),
});
