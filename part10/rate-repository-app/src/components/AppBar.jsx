import {ScrollView, View} from 'react-native';
import Title from "./theme/Title";
import {Link} from "react-router-native";
import {useApolloClient, useQuery} from "@apollo/client";
import {ME} from "../graphql/queries";
import AuthStorage from "../utils/AuthStorage";

const AppBar = () => {
  const { data } = useQuery(ME);
  const apolloClient = useApolloClient();
  const authStorage = new AuthStorage();

  const handleSignOut = async () => {
    await authStorage.removeAccessToken();
    await apolloClient.resetStore();
  };

  return (
    <View style={{ backgroundColor: '#586069', padding: 24, flexDirection: 'row' }}>
      <ScrollView horizontal>
        <Link to="/" underlayColor="#f0f4f7" style={{ margin: 8 }}>
          <Title style={{ color: 'white' }}>Repositories</Title>
        </Link>
        {data && data.me ? (
          // User is authenticated
          <Link to="/signIn" onPress={handleSignOut} underlayColor="#f0f4f7" style={{ margin: 8 }}>
            <Title style={{ color: 'white' }}>Sign out</Title>
          </Link>
        ) : (
          // User is not authenticated
          <Link to="/signIn" underlayColor="#f0f4f7" style={{ margin: 8 }}>
            <Title style={{ color: 'white' }}>Sign in</Title>
          </Link>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;