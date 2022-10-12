import { useNavigation } from '@react-navigation/core'
import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, SafeAreaView, ActivityIndicator } from 'react-native'
import { firebase } from '../../config'
import SearchBar from './SearchBar'
import List from './AvailableBooksList'

const HomeScreen = () => {
    const auth = firebase.auth()
    const navigation = useNavigation()
    const [searchPhrase, setSearchPhrase] = useState("");
    const [clicked, setClicked] = useState(false);
    const [fakeData, setFakeData] = useState();

    const handleSignOut = () => {
        auth
            .signOut()
            .then(() => {
                navigation.navigate('App')
            })
            .catch(error => alert(error.message))
    }

    useEffect(() => {
        const getData = async () => {
            const apiResponse = await fetch(
                "https://my-json-server.typicode.com/kevintomas1995/logRocket_searchBar/languages"
            );
            const data = await apiResponse.json();
            setFakeData(data);
        };
        getData();
    }, []);
    return (
        <View>
            <View style={styles.container}>

                <TouchableOpacity
                    onPress={handleSignOut}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Sign out</Text>
                </TouchableOpacity>

            </View>
            <SafeAreaView style={styles.root}>
                {!clicked && <Text style={styles.title}>Available Books</Text>}

                <SearchBar
                    searchPhrase={searchPhrase}
                    setSearchPhrase={setSearchPhrase}
                    clicked={clicked}
                    setClicked={setClicked}
                />
                {!fakeData ? (
                    <ActivityIndicator size="large" />
                ) : (
                    <List
                        searchPhrase={searchPhrase}
                        data={fakeData}
                        setClicked={setClicked}
                    />
                )}
            </SafeAreaView>
        </View>
    );

}


export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    button: {
        backgroundColor: "#0782F9",
        width: "60%",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 40,
    },
    buttonText: {
        color: "white",
        fontWeight: "700",
        fontSize: 16,
    },
    root: {
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        width: "100%",
        marginTop: 20,
        fontSize: 25,
        fontWeight: "bold",
        marginLeft: "10%",
    },
});