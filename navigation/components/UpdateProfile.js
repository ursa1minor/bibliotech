
import React, { useState } from 'react'
import { firebase } from '../../config'
import { StyleSheet, Text, TouchableOpacity, TextInput, View } from 'react-native'
import { useNavigation } from '@react-navigation/core';
export const UpdateProfile = () => {
    const db = firebase.firestore()
    const auth = firebase.auth();
    const [username, setUsername] = useState('')
    const [location, setLocation] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const navigation = useNavigation()
    const user = auth.currentUser



    React.useEffect(() => {
        db.collection('users')
            .doc(auth.currentUser?.uid)
            .get()
            .then((snapshot) => {
                setUsername(snapshot.data().username)
                setFirstName(snapshot.data().firstName)
                setLastName(snapshot.data().lastName)
                setLocation(snapshot.data().location)
                setEmail(snapshot.data().email)
            });
    }, []);
    const handleUpdate = () => {
        user.updatePassword(password)
            .then(() => {
                user.updateEmail(email)
                    .then(() => {

                        firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).update({
                            email: email,
                            username: username,
                            location: location,
                            firstName: firstName,
                            lastName: lastName

                        })
                            .then(() => {
                                navigation.replace('Profile')
                            })
                    })

            })

            .catch(error => alert(error.message))
    }
    const navToProfile = () => {
        navigation.replace("Profile")
    }
    const navToDelete = () => {
        navigation.replace("Delete Profile")
    }

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Email"
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
                onPress={handleUpdate}
                style={styles.button}
            >
                <Text style={styles.buttonText}>Update Details</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={navToDelete}
                style={styles.button}
            >
                <Text style={styles.buttonText}>Delete Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={navToProfile}
                style={styles.button}
            >
                <Text style={styles.buttonText}>Go back to profile</Text>
            </TouchableOpacity>

        </View>
    )
}


export default UpdateProfile

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