import * as React from 'react';
import { View, Text } from 'react-native';

const Profile = ({ navigation }) => {
    return (
        <View className="flex-1 justify-content-center align-center bg-purple-50">
            <Text
                onPress={() => navigation.navigate('Home')}
                className="pt-10 text-blue-400"
            >
                Profile
            </Text>
        </View>
    );
};

export default Profile;