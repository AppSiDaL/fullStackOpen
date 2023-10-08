import { FlatList, View, StyleSheet } from 'react-native';
import { useQuery } from '@apollo/client';
import RepositoryItem from './RepositoryItem';

import { GET_REPOSITORIES } from '../graphql/queries';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

function ItemSeparator() {
  return <View style={styles.separator} />;
}

function RepositoryList() {
  const { data, error, loading } = useQuery(GET_REPOSITORIES, { fetchPolicy: 'cache-and-network' });
  if (loading) {
    return (
      <View style={{ backgroundColor: '#e1e4e8' }} />
    );
  }
  const repositories = data.repositories.edges;
  return (
    <View style={{ backgroundColor: '#e1e4e8' }}>
      <FlatList
        data={repositories}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => <RepositoryItem key={item.key} repo={item} />}
      />
    </View>
  );
}

export default RepositoryList;
