// import * as React from 'react';
import {
  View,
  Text,
  Pressable,
  onPress,
  StyleSheet,
  Button,
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
    const [searchResults, setSearchResults] = useState([]);
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
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text
          onPress={() => navigation.navigate("Home")}
          style={{ fontSize: 26, fontWeight: "bold" }}
        >
          <h1>Add Book</h1>{" "}
        </Text>

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

        <button onClick={create}>Submit Data </button>

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
              <br></br>
              <Text onPress={() => setChosenBook(book)}> {book.title}</Text>
              <Text>{book.author}</Text>
              <Text>{book.publishedDate}</Text>
              <br></br>
            </View>
          );
        })}
        <StatusBar style="auto" />
        <br></br>
      </View>
    );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "pink",
    alignItems: "center",
    justifyContent: "center",
  },

  textBoxes: {
    width: "90%",
    fontSize: 18,
    padding: 12,
    borderColor: "gray",
    borderWidth: 0.2,
    borderRadius: 10,
  },
});
