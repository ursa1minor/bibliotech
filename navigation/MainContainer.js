import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import MyBooks from './components/MyBooks'

import Profile from './components/Profile';
import Home from './components/HomeScreen';
import RequestBookstack from './RequestBookStack';
import AddBookstack from './AddBookstack';
const bookStack = 'Add Book'
const home = 'Home';
const myBooks = 'My Books';
const addBook = 'Add Book';
const profile = 'Profile';
const requestBook = 'Request Book'

const Tab = createBottomTabNavigator();

const MainContainer = () => {
	return (
		<NavigationContainer independent={true}>
			<Tab.Navigator
				initialRouteName={home}
				screenOptions={({ route }) => ({
					headerShown: false,

					tabBarStyle: {
						height: 60,
						padding: 8,
					},
					tabBarIcon: ({ focused, color, size }) => {
						let iconName;
						let routeName = route.name;

						if (routeName === home) {
							iconName = focused ? 'home' : 'home-outline';
						} else if (routeName === myBooks) {
							iconName = focused ? 'library' : 'library-outline';
						} else if (routeName === addBook) {
							iconName = focused ? 'add-circle' : 'add-circle-outline';
						} else if (routeName === profile) {
							iconName = focused ? 'person' : 'person-outline';
						}

						return <Ionicons name={iconName} size={size} color={color} />;
					},
					tabBarLabelPosition: 'below-icon',
				})}
			>
				<Tab.Screen name={requestBook} component={RequestBookstack} />
				<Tab.Screen name={myBooks} component={MyBooks} />
				<Tab.Screen name={bookStack} component={AddBookstack} />
				<Tab.Screen name={profile} component={Profile} />


			</Tab.Navigator>
		</NavigationContainer>
	);
};

export default MainContainer;
