import {View, StyleSheet} from "react-native";
import Text from '../components/theme/Text'

const ReviewItem = ({ review }) => {
  // DD/MM/YYYY
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  }

  return (
    <View style={styles.container}>
      <View style={styles.ratingCircle}>
        <Text style={styles.ratingText}>{review.rating}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text fontWeight="bold" fontSize="subheading">{review.user.username}</Text>
        <Text color="textSecondary">{formatDate(review.createdAt)}</Text>
        <Text color="textSecondary">{review.text}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexGrow: 1,
    marginHorizontal: 16,
    padding: 16,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    shadowColor: "#000",// Shadow color for iOS
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23, // iOS
    shadowRadius: 2.62, // iOS
    elevation: 4, // Android
  },
  ratingCircle: {
    width: 45,
    height: 45,
    borderRadius: 45 / 2,
    borderWidth: 2,
    borderColor: 'blue',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  ratingText: {
    color: 'blue',
    fontWeight: 'bold',
  },
  infoContainer: {
    flexGrow: 1,
    flex: 1
  },
  separator: {
    height: 10,
  },
});

export default ReviewItem;