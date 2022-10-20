import React from 'react'
import { firebase } from '../../config'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/core';

const DeleteProfile = () => {
    const db = firebase.firestore()
    const auth = firebase.auth();
    const navigation = useNavigation()
    const user = auth.currentUser

    const navToProfile = () => {
        navigation.replace("Profile")
    }

    const handleDelete = () => {
        db.collection('users').doc(auth.currentUser.uid).delete({

        })
            .then(() => {
                user.delete()

                    .then(() => {
                        navigation.replace("LoginScreen")
                    })
            })

            .catch(error => alert(error.message))
    }
    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={navToProfile}
                style={styles.button}
            >
                <Text style={styles.buttonText}>NO WAIT I CHANGED MY MIND </Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={handleDelete}
                style={styles.button}
            >
                <Text style={styles.buttonText}>DELETE PROFILE</Text>
            </TouchableOpacity>
        </View>
    )
}


export default DeleteProfile

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