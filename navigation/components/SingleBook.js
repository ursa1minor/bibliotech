import * as React from 'react';
import { useNavigation } from '@react-navigation/core'
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { firebase } from '../../config';
import Ionicons from 'react-native-vector-icons/Ionicons';

const SingleBook = ({ route, navigation }) => {
    const { id } = route.params
    const auth = firebase.auth();
    const db = firebase.firestore();
    const [book, setBook] = React.useState({});


    React.useEffect(() => {
        db.collection('books')
            .doc(id)
            .get()
            .then((snapshot) => {
                setBook(snapshot.data());
            });
    }, [id]);


    return (<View>
        <View style={styles.container}>

            <Image
                style={styles.profileImg}
                source={book.cover_img}
            />
            <Text>{book.title} </Text>
            <Text>{book.author}</Text>

        </View>
        <Text>{book.description}</Text>


    </View>
    )
}

export default SingleBook

const styles = StyleSheet.create({
    profileImg: {
        width: 220,
        height: 125,
        resizeMode: 'contain',
    },
    container: {
        marginTop: '4rem',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})