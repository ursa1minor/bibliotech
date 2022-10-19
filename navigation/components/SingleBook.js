import * as React from 'react';
import { useNavigation } from '@react-navigation/core'
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { firebase } from '../../config';

import Ionicons from 'react-native-vector-icons/Ionicons';
import { doc, collection, updateDoc } from 'firebase/firestore';


const SingleBook = ({ route }) => {
    const { id } = route.params
    const db = firebase.firestore();
    const [book, setBook] = React.useState({});
    const [user, setUser] = React.useState(firebase.auth().currentUser.uid);
  
    const navigation = useNavigation()

    React.useEffect(() => {
        db.collection('books')
            .doc(id)
            .get()
            .then((snapshot) => {
                setBook(snapshot.data());
            });
    }, [id]);

//     const handleBorrow = () => {
//         db.collection('books')
//         .doc(id)
//         .update({
//         available: false,
//         borrower: auth.currentUser?.uidU
//     })
//     navigation.replace("Home")
// }
    
function borrowBook() {
    updateDoc(doc(db, "books", id), {
        available: false,
        borrower: user
    })
    .then(() => {
        console.log('data submitted');
        navigation.replace("Home")
    })
    .catch((error) => {
        console.log(error);
    })
    
}

    return (<ScrollView>
    <View style={styles.container}>
        <Text style={styles.title}> Book added</Text>
        <View>

            <Image
                style={styles.profileImg}
                source={book.cover_img}
            />

        </View>
        <Text style={styles.title}>{book.title} </Text>
        <Text style={styles.authorName}>{book.author}</Text>
        <Text numberOfLines={15} ellipsizeMode={'tail'} style={styles.description}>{book.description}</Text>
        <View style={styles.buttonContainer}>
            <TouchableOpacity
                onPress={borrowBook}
                style={styles.button}
            >
                <Text style={styles.buttonText}>Request</Text>
            </TouchableOpacity>
        </View>

    </View>
    </ScrollView>
    )
}

export default SingleBook

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
    description: {
        padding: '10px',
        textAlign: 'justify',
        fontFamily: 'Roboto',
        fontSize: 18,
        marginBottom: 0,
        paddingBottom: 0,
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
        marginTop: 2,
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