import {StyleSheet, View} from 'react-native';
import RepositoryList from "./RepositoryList";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <RepositoryList/>
    </View>
  );
};

export default Main;