import Text from './Text';
import {styles} from "./styles";
const ErrorText = ({ children, style, ...props }) => {
  return (
    <Text fontSize="body" color="error" style={[styles.colorError, style]} {...props}>
      {children}
    </Text>
  );
};

export default ErrorText;