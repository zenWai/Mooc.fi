import {Pressable, View} from 'react-native';
import Title from "./theme/Title";

const handleAppBarPress = () => {
  return;
}
const AppBar = () => {
  return <View style={{backgroundColor: '#586069', padding: 24}}>
    <Pressable onPress={handleAppBarPress}>
      <Title style={{color: 'white'}}>Repositories</Title>
    </Pressable>
  </View>;
};

export default AppBar;