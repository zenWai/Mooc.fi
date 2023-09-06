import Main from './src/components/Main';
import {NativeRouter} from 'react-router-native';
import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";

const App = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <NativeRouter>
          <Main/>
        </NativeRouter>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default App;
