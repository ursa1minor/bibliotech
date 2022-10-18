import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AddBook from './components/AddBook';
import BookCard from './components/BookCard';
const bookCard = 'Book card'
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
                name={bookCard} component={BookCard}
            />

        </Stack.Navigator>

    )
}

export default AddBookstack