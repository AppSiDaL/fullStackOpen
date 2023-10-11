import { StyleSheet, View } from 'react-native';

import { Route, Routes } from 'react-router-native';

import { useApolloClient, useQuery } from '@apollo/client';
import { useState } from 'react';
import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import theme from './theme';
import SignIn from './SignIn';
import RepositoryItem from './RepositoryItem';
import { GET_REPOSITORIES } from '../graphql/queries';
import CreateReview from './CreateReview';
import SignUp from './SignIUp';
import MyReviews from './MyReviews';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.mainBackground,
    flexShrink: 1,
  },
});

function Main() {
  const [selectedOrder, setSelectedOrder] = useState({
    orderBy: 'CREATED_AT',
    orderDirection: 'DESC',
  });
  const [filter, setFilter] = useState('');

  const client = useApolloClient();
  const handleChange = (itemValue) => {
    console.log(itemValue);
    if (itemValue === 'RATING_AVERAGE_DESC') {
      setSelectedOrder({
        orderBy: 'RATING_AVERAGE',
        orderDirection: 'DESC',
      });
    } else {
      setSelectedOrder({
        orderBy: itemValue,
        orderDirection: 'ASC',
      });
    }
    client.resetStore();
    console.log(selectedOrder);
  };
  const { data, error, loading } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    variables: {
      orderBy: selectedOrder.orderBy,
      orderDirection: selectedOrder.orderDirection,
      searchKeyword: filter,
    },
  });

  if (loading) {
    return <View style={{ backgroundColor: '#e1e4e8' }} />;
  }

  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route
          path="/:repoId"
          element={<RepositoryItem repos={data.repositories.edges} />}
        />
        <Route path="/review" element={<CreateReview />} />
        <Route path="/myReviews" element={<MyReviews />} />
        <Route
          path="/"
          element={(
            <RepositoryList
              filter={filter}
              setFilter={setFilter}
              selectedOrder={selectedOrder}
              handleChange={handleChange}
              repos={data.repositories.edges}
            />
          )}
        />
        <Route path="/login" element={<SignIn />} />
        <Route path="/signUp" element={<SignUp />} />
      </Routes>
    </View>
  );
}

export default Main;
