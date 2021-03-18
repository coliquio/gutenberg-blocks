// TODO - refactor
// currently just for local development
import { GraphQLClient } from 'graphql-request';

const endpoint = 'https://api.coliquio.integration.coliqu.io/graphql';

export const client = new GraphQLClient(endpoint, {
  headers: {
    Authorization: 'Bearer 0a3eec6676d6817a8a20072b9b0a2b9e',
  },
});
