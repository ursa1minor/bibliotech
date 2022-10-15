// import * as React from 'react';
import {
  View,
  Text,
  Pressable,
  onPress,
  StyleSheet,
  Button,
  TouchableOpacity
} from "react-native";
import { useNavigation } from '@react-navigation/core'
import React, { Component, useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import axios from "axios";


import { TextInput, RefreshControl } from 'react-native-web'; //Added
// import { useState } from 'react/cjs/react.development';

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

    const [searchTerms, setSearchTerms] = useState("");
    const [searchResults, setSearchResults] = useState([
      {
        title: "Meteors",
        author: "Melissa Stewart",
        publishedDate: "2015" 
      },
      {
        title: "Meteors and Meteorites",
        author: "Martin Beech",
        publishedDate: "2006" 
      },
      {
        title: "Field Guid to Meteors and Meteorites",
        author: "O. Richard Norton",
        publishedDate: "2008" 
      },
    ]);
    const [chosenBook, setChosenBook] = useState({});
    const bookList = [];

    useEffect(() => {
      axios
        .get(`https://www.googleapis.com/books/v1/volumes?q=${searchTerms}`)
        .then(({ data }) => {
          // console.log(data.items[0], "<-")
          // console.log(data.items[0].volumeInfo.title);
          // console.log(data.items[0].volumeInfo.authors);
          // console.log(data.items[0].volumeInfo.publishedDate);
          // console.log(data.items[0].volumeInfo.description);

          setSearchResults([
            {
              title: data.items[0].volumeInfo.title,
              author: data.items[0].volumeInfo.authors[0],
              publishedDate: data.items[0].volumeInfo.publishedDate,
            },
            {
              title: data.items[1].volumeInfo.title,
              author: data.items[1].volumeInfo.authors[0],
              publishedDate: data.items[1].volumeInfo.publishedDate,
            },
            {
              title: data.items[2].volumeInfo.title,
              author: data.items[2].volumeInfo.authors[0],
              publishedDate: data.items[2].volumeInfo.publishedDate,
            },
          ]);
        })
        .catch((err) => {});
    }, [searchTerms, chosenBook]);

    function createBook () {

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
        
    function chooseBook () {

    }   

    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text
          onPress={() => navigation.navigate("Home")}
          style={{ fontSize: 26, fontWeight: "bold" }}
        >
          <h1>Add Book</h1>{" "}
        </Text>
      
        <TextInput
          value={searchTerms}
          onChangeText={(searchTerms) => {
            setSearchTerms(searchTerms);
          }}
          style={styles.textBoxes}
          placeholder="Search:"
        ></TextInput>
        {searchResults.map((book, index) => {
          return (
            <View key={index}>
            <TouchableOpacity style={[styles.button, styles.buttonOutline]} onPress={() => setChosenBook(book)}>
              <Text style={styles.buttonOutlineText}> {book.title}</Text>
              <Text style={styles.buttonOutlineText}>{book.author}</Text>
              <Text style={styles.buttonOutlineText}>{book.publishedDate}
              <br></br></Text>
            </TouchableOpacity>

            </View>
          );
        })}


<View>      
        <TextInput
          value={title}
          onChangeText={(title) => {
            setTitle(title);
          }}
          placeholder="Title"
        ></TextInput>

        <TextInput
          value={authorFirstName}
          onChangeText={(authorFirstName) => {
            setAuthorFirstName(authorFirstName);
          }}
          placeholder="Author first name "
        ></TextInput>

        <TextInput
          value={authorSurname}
          onChangeText={(authorSurname) => {
            setAuthorSurname(authorSurname);
          }}
          placeholder="Author surname"
        ></TextInput>

        <TextInput
          value={location}
          onChangeText={(location) => {
            setLocation(location);
          }}
          placeholder="Location "
        ></TextInput>

        <br></br>

        <button onClick={createBook}>Submit Data </button>
        </View>


        <StatusBar style="auto" />
        <br></br>
      </View>
    );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
},
inputContainer: {
    width: '100%'
},
input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
},
buttonContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 40
   
},

  textBoxes: {
    width: "90%",
    fontSize: 18,
    padding: 12,
    borderColor: "gray",
    borderWidth: 0.2,
    borderRadius: 10,
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
});
