import Text from './Text';
import {styles} from "./styles";

const BodyText = ({ children, style, ...props }) => {
  return (
    <Text style={[styles.text, style]} {...props}>
      {children}
    </Text>
  );
};

export default BodyText;