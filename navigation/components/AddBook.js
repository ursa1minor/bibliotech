
import {
	View,
	Text,
	Pressable,
	onPress,
	StyleSheet,
	Button,
	TouchableOpacity,
} from 'react-native';
import React, { Component, useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import axios from 'axios';
import { useNavigation } from '@react-navigation/core';
import { TextInput, RefreshControl } from 'react-native-web';

import { addDoc, collection } from 'firebase/firestore';
import { firebase } from '../../config';

export default function AddBook() {
	const db = firebase.firestore();
	const navigation = useNavigation();

	const [author, setAuthor] = useState('');
	const [available, setAvailable] = useState(true);
	const [cover_img, setCover_img] = useState('');
	const [numberOfReviews, setNumberOfReviews] = useState(0);
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [categories, setCategories] = useState([]);
	const [user_id, setUser_id] = useState(firebase.auth().currentUser.uid);
	const [location, setLocation] = useState('Manchester');
	const [borrower, setBorrower] = useState('');

	const [searchTerms, setSearchTerms] = useState('');
	const [searchResults, setSearchResults] = useState([
		{
			title: 'The Name of the Rose',
			author: 'Umberto Eco',
		},
		{
			title: 'The Anubis Gates',
			author: 'Tim Powers',
		},
		{
			title: 'Meteor Showers',
			author: 'Gary W Kronk',
		},
	]);
	const [chosenBook, setChosenBook] = useState({});

	useEffect(() => {
		axios
			.get(`https://www.googleapis.com/books/v1/volumes?q=${searchTerms}`)
			.then(({ data }) => {

				setSearchResults([
					{
						title: data.items[0].volumeInfo.title,
						author: data.items[0].volumeInfo.authors[0],
						publishedDate: data.items[0].volumeInfo.publishedDate,
						description: data.items[0].volumeInfo.description,
						categories: data.items[0].volumeInfo.categories,
						cover_img: data.items[0].volumeInfo.imageLinks.smallThumbnail,
					},
					{
						title: data.items[1].volumeInfo.title,
						author: data.items[1].volumeInfo.authors[0],
						publishedDate: data.items[1].volumeInfo.publishedDate,
						description: data.items[1].volumeInfo.description,
						categories: data.items[1].volumeInfo.categories,
						cover_img: data.items[1].volumeInfo.imageLinks.smallThumbnail,
					},
					{
						title: data.items[2].volumeInfo.title,
						author: data.items[2].volumeInfo.authors[0],
						publishedDate: data.items[2].volumeInfo.publishedDate,
						description: data.items[2].volumeInfo.description,
						categories: data.items[2].volumeInfo.categories,
						cover_img: data.items[2].volumeInfo.imageLinks.smallThumbnail,
					},
				]);
			})
			.catch((err) => {});
	}, [searchTerms, chosenBook]);

	function chooseBook() {
		addDoc(collection(db, 'books'), {
			title: chosenBook.title,
			author: chosenBook.author,
			publishedDate: chosenBook.publishedDate,
			description: chosenBook.description,
			categories: chosenBook.categories,
			cover_img: chosenBook.cover_img,
			user_id: user_id,
			available: available,
			numberOfReviews: numberOfReviews,
			location: location,
			borrower: borrower,
		})
			.then(() => {
				console.log('data submitted');
			})
			.catch((error) => {
				console.log(error);
			});
	}

	return (
		<View style={{ flex: 1, alignItems: 'center' }}>
			<Text style={styles.title}>Add Book</Text>

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
						<TouchableOpacity
							style={[styles.button, styles.buttonOutline]}
							onPress={() => setChosenBook(book)}
						>
							<Text style={styles.buttonOutlineText}> {book.title}</Text>
							<Text style={styles.buttonOutlineText}>{book.author}</Text>
						</TouchableOpacity>
					</View>
				);
			})}

			<View>
				<TouchableOpacity
					style={[styles.button, styles.buttonOutline]}
					onPress={() => {
						chooseBook(chosenBook);
						navigation.navigate('My Books');
					}}
				>
					<Text style={styles.buttonOutlineText}>
						{' '}
						Choose Book: {chosenBook.title}{' '}
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	inputContainer: {
		width: '100%',
	},
	title: {
		width: '100%',
		marginTop: 20,
		fontSize: 25,
		fontWeight: 'bold',
		marginLeft: '10%',
		marginBottom: 15,
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
		marginBottom: 40,
	},
	textBoxes: {
		width: '90%',
		fontSize: 18,
		padding: 12,
		borderColor: 'gray',
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
