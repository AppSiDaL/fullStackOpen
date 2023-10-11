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
    alignItems: 'center',
    width: 150,
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
        {!data?.me ? (
          <>
            <View style={[styles.container]}>
              <Pressable>
                <Link to="/login">
                  <Text style={styles.text}>Login</Text>
                </Link>
              </Pressable>
            </View>
            <View style={[styles.container]}>
              <Pressable>
                <Link to="/signUp">
                  <Text style={styles.text}>Sign Up</Text>
                </Link>
              </Pressable>
            </View>
          </>
        ) : (
          <>
            <View style={[styles.container]}>
              <Pressable>
                <Link to="/review">
                  <Text style={styles.text}>Create Review</Text>
                </Link>
              </Pressable>
            </View>
            <View style={[styles.container]}>
              <Pressable>
                <Link to="/myReviews">
                  <Text style={styles.text}>My Reviews</Text>
                </Link>
              </Pressable>
            </View>
            <View style={[styles.container]}>
              <Pressable onPress={() => hanldeLogout()}>
                <Text style={styles.text}>Logout</Text>
              </Pressable>
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
}

export default AppBar;
