import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './navigation/components/LoginScreen';
import RegistrationForm from './navigation/components/RegistrationForm';
import MainContainer from './navigation/MainContainer';
import Bibliotech from './navigation/components/Bibliotech';
// import AddBookManually from './navigation/components/AddBookManually';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <View style={{ flex: 1}}>
    <Bibliotech />
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name="LoginScreen"
          component={LoginScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="MainContainer"
          component={MainContainer}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="RegistrationForm"
          component={RegistrationForm} />
      </Stack.Navigator>
    </NavigationContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});