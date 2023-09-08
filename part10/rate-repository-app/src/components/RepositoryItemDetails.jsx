import React from 'react';
import {FlatList, View} from 'react-native';
import {useParams} from 'react-router-native';
import {useQuery} from '@apollo/client';
import {GET_REPOSITORY} from '../graphql/queries';
import RepositoryItem from './RepositoryItem';
import ReviewItem from "./ReviewItem";

const ItemSeparator = () => <View style={{ height: 10 }}/>;

const RepositoryItemDetails = () => {
  const { id } = useParams();
  const { data } = useQuery(GET_REPOSITORY, {
    variables: { id }
  });

  if (!data) return null;

  const repository = data.repository;
  const reviews = repository.reviews.edges.map(edge => edge.node);

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item}/>}
      keyExtractor={item => item.id}
      ListHeaderComponent={() => (
        <>
          <RepositoryItem item={repository} showGitHubButton={true}/>
          <ItemSeparator/>
        </>
      )}
      ItemSeparatorComponent={() => <ItemSeparator/>}
    />
  );
};

export default RepositoryItemDetails;