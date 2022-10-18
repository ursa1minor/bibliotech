import * as React from 'react';
import { useNavigation } from '@react-navigation/core'
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { firebase } from '../../config';

const BookCard = ({ route }) => {
    const { id } = route.params
    const db = firebase.firestore();
    const [book, setBook] = React.useState({});


    const navigation = useNavigation()

    React.useEffect(() => {
        db.collection('books')
            .doc(id)
            .get()
            .then((snapshot) => {
                setBook(snapshot.data());
            });
    }, [id]);

    const handleBack = () => {
        navigation.replace("Home")
    }

    return (<View style={styles.container}>
        <Text style={styles.title}> Book added</Text>
        <View >

            <Image
                style={styles.profileImg}
                source={book.cover_img}
            />

        </View >
        <Text style={styles.title}>{book.title} </Text>
        <Text style={styles.authorName}>{book.author}</Text>
        <Text>{book.description}</Text>
        <View style={styles.buttonContainer}>
            <TouchableOpacity
                onPress={handleBack}
                style={styles.button}
            >
                <Text style={styles.buttonText}>request book</Text>
            </TouchableOpacity>
        </View>

    </View>
    )
}

export default BookCard

const styles = StyleSheet.create({
    profileImg: {
        width: 440,
        height: 250,
        resizeMode: 'contain',
    },
    container: {
        marginTop: '4rem',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonContainer: {
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },
    button: {
        backgroundColor: '#0782F9',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonOutline: {
        backgroundColor: 'white',
        marginTop: 5,
        borderColor: '#0782F9',
        borderWidth: 2,
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },
    buttonOutlineText: {
        color: '#0782F9',
        fontWeight: '700',
        fontSize: 16,
    },
    title: {
        fontSize: '1.2rem',
        fontWeight: 'bold',
        marginTop: '1rem',
    },
    authorName: {
        marginTop: '.5rem',
        fontSize: '1rem',
    },
})