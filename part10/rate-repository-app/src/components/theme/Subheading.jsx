import Text from './Text';
import {styles} from "./styles";

const Subheading = ({ children, style, ...props }) => {
  return (
    <Text fontSize="subheading" fontWeight="bold" style={[styles.fontSizeSubheading, style]} {...props}>
      {children}
    </Text>
  );
};

export default Subheading;