import {useSignIn} from "./useSignIn";
import {useMutation} from "@apollo/client";
import {CREATE_USER} from "../graphql/mutations";

export const useSignUp = () => {
  const [createUser] = useMutation(CREATE_USER);
  const [signIn] = useSignIn();

  const signUp = async ({ username, password }) => {
    try {
      await createUser({ variables: { user: { username, password } } });

      // Sign in the newly registered user
      const data = await signIn({ username, password });
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  return [signUp];
};