import React from 'react';
import {
  Text, View, StyleSheet, Pressable, ScrollView,
} from 'react-native';
import Constants from 'expo-constants';
import { Link } from 'react-router-native';
import { useQuery, useApolloClient } from '@apollo/client';

import useAuthStorage from '../hooks/useAuthStorage';
import { ME } from '../graphql/queries';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    width: 200,
  },
  scrollView: {
    backgroundColor: '#24292e',
  },
  text: {
    color: 'white',
    fontSize: 20,
  },
});

function AppBar() {
  const authStorage = useAuthStorage();
  const client = useApolloClient();
  const { data, error, loading } = useQuery(ME, { fetchPolicy: 'cache-and-network' });

  const removeSession = async () => authStorage.removeAccessToken();
  const hanldeLogout = () => {
    removeSession();
    client.resetStore();
  };
  return (
    <View>
      <ScrollView
        horizontal
        style={[styles.scrollView, { flexDirection: 'row' }]}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View style={[styles.container]}>
          <Pressable>
            <Link to="/">
              <Text style={styles.text}>Repositories</Text>
            </Link>
          </Pressable>
        </View>
        <View style={[styles.container]}>
          {!data.me ? (
            <Link to="/login">
              <Text style={styles.text}>Login</Text>
            </Link>
          ) : (
            <Pressable onPress={() => hanldeLogout()}>
              <Text style={styles.text}>Logout</Text>
            </Pressable>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

export default AppBar;
