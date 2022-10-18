import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SingleBook from './components/SingleBook';
import AddBook from './components/AddBook';
import BookCard from './components/BookCard';
const bookCard = 'Book card'
const singleBook = 'Single book'
const addBook = 'Add Book';
const Stack = createNativeStackNavigator();
export const AddBookstack = () => {
    return (

        <Stack.Navigator>
            <Stack.Screen
                options={{ headerShown: false }}
                name={addBook} component={AddBook}

            />
            <Stack.Screen
                options={{ headerShown: false }}
                name={singleBook} component={SingleBook}
            />
            <Stack.Screen
                options={{ headerShown: false }}
                name={bookCard} component={BookCard}
            />

        </Stack.Navigator>

    )
}

export default AddBookstack