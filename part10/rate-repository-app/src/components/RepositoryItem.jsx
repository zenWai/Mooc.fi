import React from 'react';
import {View, StyleSheet, TouchableOpacity, Linking, Text, Pressable} from 'react-native';
import Card from "./Card";
import {useNavigate} from "react-router-native";

const RepositoryItem = ({ item, showGitHubButton = false }) => {
  const navigate = useNavigate();
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
  const cardComponent = (
    <Card
      reviews={actualItem.reviewCount}
      language={actualItem.language}
      description={actualItem.description}
      rating={actualItem.ratingAverage}
      stars={actualItem.stargazersCount}
      name={actualItem.fullName}
      forks={actualItem.forksCount}
      imageSource={actualItem.ownerAvatarUrl}
    />
  );
  console.log(showGitHubButton)
  console.log(item.url)
  return (
    <View testID="repositoryItem" style={styles.container}>
      {showGitHubButton
        ? cardComponent
        : (
          <Pressable onPress={() => navigate(`/repository/${item.id}`)}>
            {cardComponent}
          </Pressable>
        )
      }
      {showGitHubButton && (
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => Linking.openURL(item.url)}
        >
          <Text style={styles.buttonText}>Open in GitHub</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0,
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
  buttonContainer: {
    flex: 0,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: 16,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
export default RepositoryItem;