import {useApolloClient, useMutation} from "@apollo/client";
import {AUTHENTICATE} from "../graphql/mutations";
import useAuthStorage from '../hooks/useAuthStorage';
import {useNavigate} from 'react-router-native';

export const useSignIn = () => {
  const authStorage = useAuthStorage();
  const [mutate, result] = useMutation(AUTHENTICATE);
  const apolloClient = useApolloClient();
  const navigate = useNavigate();

  const signIn = async ({ username, password }) => {
    try {
      const { data } = await mutate({
        variables: { username, password }
      });
      // Storing the access token
      console.log('token:', data.authenticate.accessToken);
      await authStorage.setAccessToken(data.authenticate.accessToken);

      await apolloClient.resetStore();
      // Navigating to the repositories list view after successful sign in
      navigate("/");
      console.log(data)
      return data;
    } catch (error) {
      console.log(error)
      throw error;
    }
  };

  return [signIn, result];
};