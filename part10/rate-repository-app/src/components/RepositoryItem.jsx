import React from 'react';
import {View, StyleSheet} from 'react-native';
import Card from "./Card";

const RepositoryItem = ({ item }) => {
  // case anything is not populated
  const defaultItem = {
    reviewCount: 0,
    language: 'Unknown',
    description: 'No description available',
    ratingAverage: 0,
    stargazersCount: 0,
    fullName: 'Unknown',
    forksCount: 0,
    ownerAvatarUrl: null
  };

  const actualItem = { ...defaultItem, ...item };

  return (
    <View style={styles.container}>
      <Card
        reviews={actualItem.reviewCount}
        language={actualItem.language}
        description={actualItem.description}
        rating={actualItem.ratingAverage}
        stars={actualItem.stargazersCount}
        name={actualItem.fullName}
        forks={actualItem.forksCount}
        imageSource={actualItem.ownerAvatarUrl}
      ></Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
});
export default RepositoryItem;