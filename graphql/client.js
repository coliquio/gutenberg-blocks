// TODO - refactor
// currently just for local development
import { GraphQLClient } from 'graphql-request';

const endpoint = 'https://api.coliquio.integration.coliqu.io/graphql';

export const client = new GraphQLClient(endpoint, {
  headers: {
    Authorization: '',
  },
});
