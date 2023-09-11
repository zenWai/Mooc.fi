import React, {useCallback, useState} from 'react';
import {FlatList, View, StyleSheet, ActivityIndicator, TouchableOpacity, TextInput} from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import OrderPicker from "./OrderPicker";
import SpecialText from "./theme/SpecialText";

const ItemSeparator = () => <View style={styles.separator}/>;

const RepositoryListHeader = ({ onSelectOrder, modalVisible, setModalVisible, searchKeyword, setSearchKeyword }) => {
  return (
    <>
      <TextInput
        value={searchKeyword}
        onChangeText={text => setSearchKeyword(text)}
        placeholder="Search by keyword"
        style={{ padding: 10, borderColor: '#d3d3d3', borderWidth: 1, borderRadius: 5, margin: 4 }}
      />
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <SpecialText style={{margin: 4}}>Select Order</SpecialText>
      </TouchableOpacity>
      {modalVisible && <OrderPicker onSelectOrder={onSelectOrder} onClose={() => setModalVisible(false)} />}
    </>
  )
};

const RepositoryList = () => {
  const [selectedOrder, setSelectedOrder] = useState("CREATED_AT_DESC");
  const [modalVisible, setModalVisible] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');
  const { repositories, loading } = useRepositories(selectedOrder, searchKeyword);

  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];

  const renderItem = ({ item }) => {
    return (
      <RepositoryItem item={item} showGitHubButton={false}/>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff"/>
      </View>
    );
  }

  return (
    <>
      <ItemSeparator/>
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        ListHeaderComponent={<RepositoryListHeader
          onSelectOrder={setSelectedOrder}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          searchKeyword={searchKeyword}
          setSearchKeyword={setSearchKeyword}
        />}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </>
  );
};

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default RepositoryList;