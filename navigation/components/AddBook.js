import * as React from 'react';
import { View, Text } from 'react-native';

const AddBook = ({ navigation }) => {
    return (
        <View atyle={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text
                onPress={() => navigation.navigate('Home')}
                style={{ fontSize: 26, fontWeight: 'bold' }}
            >
                Add Book
            </Text>
        </View>
    );
};

export default AddBook;