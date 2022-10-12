import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';


import MyBooks from './components/MyBooks';
import AddBook from './components/AddBook';
import Profile from './components/Profile';
import HomeScreen from './components/HomeScreen';

//screen names
const homeName = 'HomeScreen';
const myBooksName = 'My Books';
const addBookName = 'Add Book';
const profileName = 'Profile';

const Tab = createBottomTabNavigator();

const MainContainer = () => {
    return (

        <NavigationContainer independent={true}>

            <Tab.Navigator
                initialRouteName={homeName}
                screenOptions={({ route }) => ({
                    headerShown: false,
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;
                        let routeName = route.name;

                        if (routeName === homeName) {
                            iconName = focused ? 'home' : 'home-outline';
                        } else if (routeName === myBooksName) {
                            iconName = focused ? 'library' : 'library-outline';
                        } else if (routeName === addBookName) {
                            iconName = focused ? 'add-circle' : 'add-circle-outline';
                        } else if (routeName === profileName) {
                            iconName = focused ? 'person' : 'person-outline';
                        }

                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                    tabBarLabelPosition: 'below-icon',
                })}
            >
                <Tab.Screen name={homeName} component={HomeScreen} />
                <Tab.Screen name={myBooksName} component={MyBooks} />
                <Tab.Screen name={addBookName} component={AddBook} />
                <Tab.Screen name={profileName} component={Profile} />
            </Tab.Navigator>


        </NavigationContainer>
    );
};

export default MainContainer;