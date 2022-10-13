import * as React from 'react';
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/core'

import { TextInput } from 'react-native-web'; //Added
import { useState } from 'react/cjs/react.development'; //Added

import { addDoc, collection } from "firebase/firestore"; //Added from Firebase
import { firebase } from '../../config';

export default function AddBook({ navigation }) {

    const [authorFirstName, setAuthorFirstName] = useState('');
    const [authorSurname, setAuthorSurname] = useState('');
    const [available, setAvailable] = useState(true);
    const [cover_img, setCover_img] = useState('');
    const [numberOfReviews, setNumberOfReviews] = useState(0);
    const [title, setTitle] = useState('');
    const [location, setLocation] = useState('');
    const [user_id, setUser_id] = useState(firebase.auth().currentUser.uid);

    const db = firebase.firestore()


    function create () {

        addDoc(collection(db, "books"), {
          authorFirstName: authorFirstName,
          authorSurname: authorSurname,
          available: available,
          cover_img: cover_img,
          numberOfReviews: numberOfReviews,
          title: title,
          user_id: user_id
        }).then(() => {
          console.log('data submitted');
        }).catch((error) => {
          console.log(error);
        });
        };
        
        

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text
                onPress={() => navigation.navigate('Home')}
                style={{ fontSize: 26, fontWeight: 'bold' }}
            >
                <h1>Add Book</h1> </Text>

                <TextInput value={authorFirstName} onChangeText={(authorFirstName) => {setAuthorFirstName(authorFirstName)}} placeholder="Author first name " ></TextInput>

                <TextInput value={authorSurname} onChangeText={(authorSurname) => {setAuthorSurname(authorSurname)}} placeholder="Author surname" ></TextInput>

                <TextInput value={available} onChangeText={(available) => {setAvailable(available)}} placeholder="Cover image " ></TextInput>

                <TextInput value={cover_img} onChangeText={(cover_img) => {setCover_img(cover_img)}} placeholder="Cover image " ></TextInput>

                <TextInput value={location} onChangeText={(location) => {setLocation(location)}} placeholder="Location " ></TextInput>

                <TextInput value={numberOfReviews} onChangeText={(numberOfReviews) => {setNumberOfReviews(0)}} placeholder="Cover image " ></TextInput>

                <TextInput value={title} onChangeText={(title) => {setTitle(title)}} placeholder="Title" ></TextInput>

                <button onClick={create}>Submit Data </button>

           
        </View>
    );
};

