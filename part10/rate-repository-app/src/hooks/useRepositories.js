import { useQuery } from '@apollo/client';
import {GET_REPOSITORIES} from "../graphql/queries";

const useRepositories = (order) => {
  let variables = {};
  switch (order) {
    case 'CREATED_AT_DESC':
      variables = { orderBy: 'CREATED_AT', orderDirection: 'DESC' };
      break;
    case 'RATING_AVERAGE_DESC':
      variables = { orderBy: 'RATING_AVERAGE', orderDirection: 'DESC' };
      break;
    case 'RATING_AVERAGE_ASC':
      variables = { orderBy: 'RATING_AVERAGE', orderDirection: 'ASC' };
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