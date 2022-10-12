import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './navigation/components/LoginScreen';
import HomeScreen from './navigation/components/HomeScreen';
import RegistrationForm from './navigation/components/RegistrationForm';
import MainContainer from './navigation/MainContainer';
import Fetch from './src/Fetch';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={LoginScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Home"
          component={HomeScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="RegistrationForm"
          component={RegistrationForm} />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Nav"
          component={MainContainer}
        />
      </Stack.Navigator>
      <MainContainer />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});