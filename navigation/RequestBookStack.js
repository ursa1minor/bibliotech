import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SingleBook from "./components/SingleBook";
import BookCard from './components/BookCard';
import Home from './components/HomeScreen';
const bookCard = 'Book Card'
const singleBook = "Single book";
const home = 'Home';
const Stack = createNativeStackNavigator();
export const RequestBookstack = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name={home}
          component={Home}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name={singleBook}
          component={SingleBook}
        />

        <Stack.Screen
          options={{ headerShown: false }}
          name={bookCard}
          component={BookCard}
        />
      </Stack.Navigator>
    );
}

export default RequestBookstack