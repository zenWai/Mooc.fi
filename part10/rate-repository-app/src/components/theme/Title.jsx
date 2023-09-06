import Text from './Text';
import {styles} from './styles';

const Title = ({ children, style, ...props }) => {
  return (
    <Text fontSize="title" fontWeight="bold" style={[styles.fontSizeTitle, style]} {...props}>
      {children}
    </Text>
  );
};

export default Title;