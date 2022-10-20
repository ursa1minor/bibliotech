import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BookCard from './components/BookCard';
import MyBooks from './components/MyBooks';

const bookCard = 'Book Card';

const myBooks = 'My Books';
const Stack = createNativeStackNavigator();

export const MyBooksStack = () => {
	return (
		<Stack.Navigator>
			<Stack.Screen
				options={{ headerShown: false }}
				name={myBooks}
				component={MyBooks}
			/>
			<Stack.Screen
				options={{ headerShown: false }}
				name={bookCard}
				component={BookCard}
			/>
		</Stack.Navigator>
	);
};

export default MyBooksStack;
