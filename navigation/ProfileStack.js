import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Profile from './components/Profile';
import UpdateProfile from './components/UpdateProfile';
import DeleteProfile from './components/DeleteProfile';
const profile = 'Profile';
const update = 'Update Profile'
const deleteProfile = "Delete Profile"
const Stack = createNativeStackNavigator();
export const ProfileStack = () => {

    return (

        <Stack.Navigator>
            <Stack.Screen
                options={{ headerShown: false }}
                name={profile} component={Profile}

            />

            <Stack.Screen
                options={{ headerShown: false }}
                name={update} component={UpdateProfile}
            />
            <Stack.Screen
                options={{ headerShown: false }}
                name={deleteProfile} component={DeleteProfile}
            />

        </Stack.Navigator>

    )

}

export default ProfileStack