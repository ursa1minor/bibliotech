import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, TextInput, View } from 'react-native'
import { firebase } from '../../config'


const RegistrationForm = () => {

    const auth = firebase.auth()
    const db = firebase.firestore()
    const [username, setUsername] = useState('')
    const [location, setLocation] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')


    const navigation = useNavigation()


    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                navigation.replace("Home")
            }
        })

        return unsubscribe
    }, [])


    const handleRegister = () => {
        if (username.trim() !== '') {


            auth
                .createUserWithEmailAndPassword(email, password)
                .then(() => {

                    firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).set({
                        email: email,
                        username: username,
                        location: location,
                        booksBorrowed: 0,
                        booksForLend: 0,
                        firstName: firstName,
                        lastName: lastName

                    })

                })

                .catch(error => alert(error.message))
        } else {
            alert('please enter a valid username')
        }


    }




    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={text => setEmail(text)}
                style={styles.input}
            />
            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={text => setPassword(text)}
                style={styles.input}
                secureTextEntry
            />
            <TextInput
                placeholder="Username"
                value={username}
                onChangeText={text => setUsername(text)}
                style={styles.input}
                required />
            <TextInput
                placeholder="Location"
                value={location}
                onChangeText={text => setLocation(text)}
                style={styles.input}
            />
            <TextInput
                placeholder="First name"
                value={firstName}
                onChangeText={text => setFirstName(text)}
                style={styles.input}
                required />
            <TextInput
                placeholder="Last name"
                value={lastName}
                onChangeText={text => setLastName(text)}
                style={styles.input}
            />


            <TouchableOpacity
                onPress={handleRegister}
                style={styles.button}
            >
                <Text style={styles.buttonText}>Complete Registration</Text>
            </TouchableOpacity>
        </View>
    )

}

export default RegistrationForm

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        backgroundColor: '#0782F9',
        width: '60%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 40,
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,


    },
})