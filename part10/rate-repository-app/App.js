import Main from './src/components/Main';
import {NativeRouter} from 'react-router-native';
import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";
import {ApolloProvider} from '@apollo/client';
import createApolloClient from './src/utils/apolloClient';

const apolloClient = createApolloClient();

const App = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <NativeRouter>
          <ApolloProvider client={apolloClient}>
            <Main/>
          </ApolloProvider>
        </NativeRouter>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default App;
