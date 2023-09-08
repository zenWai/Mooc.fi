import Main from './src/components/Main';
import {NativeRouter} from 'react-router-native';
import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";
import {ApolloProvider} from '@apollo/client';
import createApolloClient from './src/utils/apolloClient';
import AuthStorage from './src/utils/AuthStorage';
import AuthStorageContext from './src/contexts/AuthStorageContext';

const authStorage = new AuthStorage();
const apolloClient = createApolloClient(authStorage);

const App = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <NativeRouter>
          <ApolloProvider client={apolloClient}>
            <AuthStorageContext.Provider value={authStorage}>
              <Main/>
            </AuthStorageContext.Provider>
          </ApolloProvider>
        </NativeRouter>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default App;
