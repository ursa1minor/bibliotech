import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, TextInput, View } from 'react-native'
import { firebase } from '../config'
import { v4 as uuidv4 } from 'uuid';

const RegistrationForm = () => {

    const auth = firebase.auth()
    const db = firebase.database()
    const [username, setUsername] = useState('')
    const [location, setLocation] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigation = useNavigation()

    const handleRegister = () => {
        auth
        .createUserWithEmailAndPassword(email, password)
        .then(user => {
                user.uid = uuidv4()
                db.ref('users/' + user.uid).set({
                    email: email,
                    username: username,
                    location: location
                })
                .then(() => {
                    if (user.username && user.email && user.location) {
                        navigation.replace("Home")
                    } else {
                        if (!username.trim()) {
                            alert('Please Enter Username');
                            return;
                            }
                        if (!location.trim()) {
                            alert('Please Enter Location');
                            return;
                            }
                    }
                })
            })
            .catch(error => alert(error.message))
    }

    // if (!username.trim()) {
    //     alert('Please Enter Username');
    //     return;
    //   }

    // if (!location.trim()) {
    //     alert('Please Enter Location');
    //     return;
    //   }


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
            />
            <TextInput
                    placeholder="Location"
                    value={location}
                    onChangeText={text => setLocation(text)}
                    style={styles.input}
            />
            <Text>Go away!!</Text>

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
})