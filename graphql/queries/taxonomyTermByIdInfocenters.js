import gql from 'graphql-tag';

const TAXONOMY_TERM_BY_ID_INFOCENTERS = gql`
  query taxonomyTermById($id: ID!) {
    taxonomyTermById(id: $id) {
      id
      name
      ... on TaxonomyTermInfocenters {
        fieldSophoraId
        fieldDetailLogo {
          uri
        }
      }
    }
  }
`;

export default TAXONOMY_TERM_BY_ID_INFOCENTERS;
