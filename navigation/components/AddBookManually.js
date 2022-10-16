import { View, Text, Pressable, onPress, StyleSheet, Button,TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/core';
import React, { Component, useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";

import { TextInput, RefreshControl } from 'react-native-web'; 
import { addDoc, collection } from "firebase/firestore"; 
import { firebase } from '../../config';

const navigation = useNavigation();

const AddBookManually = () => {
    
    const [author, setAuthor] = useState('');
    const [available, setAvailable] = useState(true);
    const [cover_img, setCover_img] = useState('');
    const [numberOfReviews, setNumberOfReviews] = useState(0);
    const [title, setTitle] = useState('');
    const [location, setLocation] = useState('Manchester');
    const [user_id, setUser_id] = useState(firebase.auth().currentUser.uid);
    const [description, setDescription] = useState('');
    const [categories, setCategories] = useState([]);

   const db = firebase.firestore()

   function createBook() {

      addDoc(collection(db, "books"), {
          title: title,
          author: author,
          publishedDate: publishedDate,
          description: description,
          categories: categories,
          cover_img: cover_img,
          user_id: user_id,
          available: available,
          numberOfReviews: numberOfReviews,
          location: location   
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
          <h1>Add Book Manually</h1>{" "}
        </Text>
      
        <View>      
        <TextInput
          value={title}
          onChangeText={(title) => {
            setTitle(title);
          }}
          placeholder="Title"
        ></TextInput>

        <TextInput
          value={author}
          onChangeText={(author) => {
            setAuthor(author);
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

        <TouchableOpacity 
          style={[styles.button, styles.buttonOutline]}
          onPress={createBook}>
          <Text style={styles.buttonOutlineText}> Submit Data </Text>
        </TouchableOpacity>
        </View>

        <StatusBar style="auto" />
     
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

export default AddBookManually;
