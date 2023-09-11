import { useQuery } from '@apollo/client';
import {GET_REPOSITORIES} from "../graphql/queries";

const useRepositories = (order, searchKeyword='') => {
  let variables = {searchKeyword};
  switch (order) {
    case 'CREATED_AT_DESC':
      variables.orderBy = 'CREATED_AT';
      variables.orderDirection = 'DESC';
      break;
    case 'RATING_AVERAGE_DESC':
      variables.orderBy = 'RATING_AVERAGE';
      variables.orderDirection = 'DESC';
      break;
    case 'RATING_AVERAGE_ASC':
      variables.orderBy = 'RATING_AVERAGE';
      variables.orderDirection = 'ASC';
      break;
    default:
      break;
  }

  const { data, loading, refetch } = useQuery(GET_REPOSITORIES, {
    variables: variables,
    fetchPolicy: 'cache-and-network',
  });

  console.log('data', data);
  const repositories = data && data.repositories ? data.repositories : undefined;

  return { repositories, loading, refetch };
};

export default useRepositories;