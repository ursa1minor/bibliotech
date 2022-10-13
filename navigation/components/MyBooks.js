import * as React from 'react';
import { View, Text } from 'react-native';

const MyBooks = ({ navigation }) => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text
                onPress={() => navigation.navigate('Home')}
                style={{ fontSize: 26, fontWeight: 'bold' }}
            >
                My Books
            </Text>
        </View>
    );
};

export default MyBooks;