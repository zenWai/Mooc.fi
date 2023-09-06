import {ScrollView, View} from 'react-native';
import Title from "./theme/Title";
import {Link} from "react-router-native";

const AppBar = () => {
  return (
    <View style={{ backgroundColor: '#586069', padding: 24, flexDirection: 'row' }}>
      <ScrollView horizontal>
        <Link to="/" underlayColor="#f0f4f7" style={{ margin: 8 }}>
          <Title style={{ color: 'white' }}>Repositories</Title>
        </Link>
        <Link to="/signIn" underlayColor="#f0f4f7" style={{ margin: 8 }}>
          <Title style={{ color: 'white' }}>Sign in</Title>
        </Link>
      </ScrollView>
    </View>
  );
};

export default AppBar;