import Text from './Text';
import {styles} from "./styles";
const Caption = ({ children, style, ...props }) => {
  return (
    <Text fontSize="caption" style={[styles.fontSizeCaption, style]} {...props}>
      {children}
    </Text>
  );
};

export default Caption;