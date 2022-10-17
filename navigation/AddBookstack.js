import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SingleBook from './components/SingleBook';
import AddBook from './components/AddBook';
const singleBook = 'Single book'
const addBook = 'Add Book';
const Stack = createNativeStackNavigator();
export const AddBookstack = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    options={{ headerShown: false }}
                    name={addBook} component={AddBook}

                />
                <Stack.Screen
                    options={{ headerShown: false }}
                    name={singleBook} component={SingleBook}
                />

            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AddBookstack