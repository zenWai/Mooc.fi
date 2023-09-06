import Text from './Text';
import {styles} from "./styles";
const ButtonText = ({ children, style, ...props }) => {
  return (
    <Text fontSize="button" fontWeight="bold" style={[styles.fontSizeButton, style]} {...props}>
      {children}
    </Text>
  );
};

export default ButtonText;