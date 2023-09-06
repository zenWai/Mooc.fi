import Text from './Text';
import {styles} from "./styles";
const SmallText = ({ children, style, ...props }) => {
  return (
    <Text fontSize="small" style={[styles.fontSizeSmall, style]} {...props}>
      {children}
    </Text>
  );
};

export default SmallText;