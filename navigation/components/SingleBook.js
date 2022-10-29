import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/core'
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { firebase } from '../../config';
import { doc, updateDoc, addDoc, collection } from 'firebase/firestore';


const SingleBook = ({ route }) => {
    const { id } = route.params
    const db = firebase.firestore();
    const borrowerID = firebase.auth().currentUser.uid   
    const booksRef = db.collection('books');
	const usersRef = db.collection('users');
	const messagesRef = db.collection('messages');
  
    const [book, setBook] = React.useState({});
    const message = `Hi there, can I borrow ${book.title} by ${book.author}?`;
    
    const [borrower, setBorrower] = React.useState('');
    const lenderID = book.user_id;
    const [lender, setLender] = React.useState('');	
	
    const navigation = useNavigation()
 
    useEffect(() => {
        booksRef
            .doc(id)
            .get()
            .then((snapshot) => {
                setBook(snapshot.data());
            });
    }, [id]);

    useEffect(() => {
		usersRef
			.doc(borrowerID)
			.get()
			.then((snapshot) => {
				setBorrower(snapshot.data());
			});
	}, []);

    React.useEffect(() => {
		usersRef
			.doc(lenderID)
			.get()
			.then((snapshot) => {
				setLender(snapshot.data());
			});
	}, []);

    const navToHome = () => {
        navigation.navigate("Home")
    }

    function borrowBook() {
        addDoc(collection(db, 'messages'), {
			message: message,
            writer: borrowerID,
			borrower: borrowerID,
            lender: lenderID,
			createdAt: firebase.firestore.FieldValue.serverTimestamp(),
			bookID: id,
            writerName: borrower.username,
		})        
        .then(() => {
        updateDoc(doc(db, "books", id), {
            available: false,
            borrower: borrowerID, 
            pending: true,
            })
        })
            .then(() => {
                navigation.navigate("Home")
            })
            .catch((error) => {
                console.log(error);
            })
    }

    return (<ScrollView>
        <View style={styles.container}>
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
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={navToHome}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Browse More books</Text>
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
        width: '90%',
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