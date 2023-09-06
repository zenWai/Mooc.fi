import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const RepositoryItem = ({ item }) => {
  return (
    <View style={styles.container}>
      <Text>Full Name: {item.fullName}</Text>
      <Text>Description: {item.description}</Text>
      <Text>Language: {item.language}</Text>
      <Text>Stars: {item.stargazersCount}</Text>
      <Text>Forks: {item.forksCount}</Text>
      <Text>Reviews: {item.reviewCount}</Text>
      <Text>Rating: {item.ratingAverage}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: 'white',
  },
});
export default RepositoryItem;