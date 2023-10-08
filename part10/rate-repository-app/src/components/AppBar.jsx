import React from 'react';
import {
  Text, View, StyleSheet, Pressable, ScrollView,
} from 'react-native';
import Constants from 'expo-constants';
import { Link } from 'react-router-native';

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
  return (
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
        <Pressable>
          <Link to="/login">
            <Text style={styles.text}>SignIn</Text>
          </Link>
        </Pressable>
      </View>
    </ScrollView>
  );
}

export default AppBar;
