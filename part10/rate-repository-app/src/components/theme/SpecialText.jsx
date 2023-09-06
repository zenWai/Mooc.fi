import {StyleSheet} from "react-native";
import Subheading from "./Subheading";

const styles = StyleSheet.create({
  specialText: {
    backgroundColor: '#0366d6',
    color: 'white',
    borderRadius: 12, // This will round the corners
    padding: 10, // Add some padding so it's not too tight
    alignSelf: 'flex-start',
    overflow: 'hidden',  // Add this line
  },
});

const SpecialText = ({ children, style, ...props }) => {
  return (
    <Subheading style={[styles.specialText, style]} {...props}>
      {children}
    </Subheading>
  );
};

export default SpecialText;