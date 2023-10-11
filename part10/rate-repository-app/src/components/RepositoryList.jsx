import {
  FlatList, View, StyleSheet, TextInput,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useDebouncedCallback } from 'use-debounce';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: '#CFD4B8',
  },
});

function ItemSeparator() {
  return <View style={styles.separator} />;
}

function ListHeader({
  selectedOrder, handleChange, filter, setFilter,
}) {
  const debounced = useDebouncedCallback((value) => {
    setFilter(value);
  }, 500);
  return (
    <>
      <TextInput
        placeholder="filter"
        onChangeText={(value) => debounced(value)}
      >
        {filter}
      </TextInput>
      <Picker
        selectedValue={selectedOrder}
        onValueChange={(itemValue, itemIndex) => {
          handleChange(itemValue);
        }}
      >
        <Picker.Item label="Latest repositories" value="CREATED_AT" />
        <Picker.Item
          label="Highest rated repositories"
          value="RATING_AVERAGE"
        />
        <Picker.Item
          label="Lowest rated repositories"
          value="RATING_AVERAGE_DESC"
        />
      </Picker>
    </>
  );
}

export function RepositoryListContainer({
  filter,
  setFilter,
  repositories,
  selectedOrder,
  handleChange,
  onEndReach,
}) {
  const repositoryNodes = repositories
    ? repositories.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositories}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
      ListHeaderComponent={(
        <ListHeader
          filter={filter}
          setFilter={setFilter}
          selectedOrder={selectedOrder}
          handleChange={handleChange}
        />
      )}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <RepositoryItem key={item.key} repo={item} repos={repositories} />
      )}
    />
  );
}

function RepositoryList({
  filter, setFilter, selectedOrder, handleChange,
}) {
  const { repositories, loading, fetchMore } = useRepositories({
    first: 5,
    orderBy: selectedOrder.orderBy,
    orderDirection: selectedOrder.orderDirection,
    searchKeyword: filter,
  });
  if (loading) return null;
  const onEndReach = () => {
    fetchMore();
    console.log('fetching more');
  };
  return (
    <RepositoryListContainer
      onEndReach={onEndReach}
      filter={filter}
      setFilter={setFilter}
      selectedOrder={selectedOrder}
      handleChange={handleChange}
      repositories={repositories.edges}
    />
  );
}

export default RepositoryList;
