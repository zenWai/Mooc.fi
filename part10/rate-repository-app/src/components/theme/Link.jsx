import Text from './Text';
import {styles} from "./styles";
const Link = ({ children, onPress, style, ...props }) => {
  return (
    <Text fontSize="link" color="primary" onPress={onPress} style={[styles.fontSizeCaption, style]} {...props}>
      {children}
    </Text>
  );
};

export default Link;