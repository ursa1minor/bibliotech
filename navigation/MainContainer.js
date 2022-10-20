import * as React from 'react';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import MyBooks from './components/MyBooks';
import MyBooksStack from './MyBookStack';
import RequestBookstack from './RequestBookStack';
import AddBookstack from './AddBookstack';
import ProfileStack from './ProfileStack';

const bookStack = 'Add Book';
const home = 'Book';
const myBooks = 'My Books';

const profileStack = 'My Profile ';
const requestBook = 'Browse Books';

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

						if (routeName === myBooks) {
							iconName = focused ? 'book' : 'book-outline';
						} else if (routeName === requestBook) {
							iconName = focused ? 'library' : 'library-outline';
						} else if (routeName === bookStack) {
							iconName = focused ? 'add-circle' : 'add-circle-outline';
						} else if (routeName === profileStack) {
							iconName = focused ? 'person' : 'person-outline';
						}

						return <Ionicons name={iconName} size={size} color={color} />;
					},
					tabBarLabelPosition: 'below-icon',
				})}
			>
				<Tab.Screen name={requestBook} component={RequestBookstack} />
				<Tab.Screen name={'My Books Stack'} component={MyBooksStack} />
				<Tab.Screen name={bookStack} component={AddBookstack} />
				<Tab.Screen name={profileStack} component={ProfileStack} />
			</Tab.Navigator>
		</NavigationContainer>
	);
};

export default MainContainer;
