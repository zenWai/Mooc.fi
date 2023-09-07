import { useQuery } from '@apollo/client';
import {GET_REPOSITORIES} from "../graphql/queries";

const useRepositories = () => {
  const { data, loading, refetch } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
  });

  console.log('data', data);
  const repositories = data && data.repositories ? data.repositories : undefined;

  return { repositories, loading, refetch };
};

export default useRepositories;