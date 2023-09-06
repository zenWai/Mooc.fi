import React from 'react';
import {View,StyleSheet} from 'react-native';
import Card from "./Card";

const RepositoryItem = ({ item }) => {
  return (
    <View style={styles.container}>
      <Card
        reviews={item.reviewCount}
        language={item.language}
        description={item.description}
        rating={item.ratingAverage}
        stars={item.stargazersCount}
        name={item.fullName}
        forks={item.forksCount}
        imageSource={item.ownerAvatarUrl}
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