import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigation } from '@react-navigation/core';
import { TextInput } from 'react-native-web';

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

	const [isPending, setIsPending] = useState(false);

  	const [createdAt, setCreatedAt] = useState('');


	const [searchTerms, setSearchTerms] = useState('');
	const [searchResults, setSearchResults] = useState([
		{
			title: 'Coding for Dummies',
			author: 'Nikhil Abraham',
		},
		{
			title: 'Diary of a Wombat',
			author: 'Bruce Watley',
		},
		{
			title: 'Business Secrets of the Pharoahs',
			author: 'Mark Corrigan',
		},
	]);
	const [chosenBook, setChosenBook] = useState({});
	const [isSelected, setIsSelected] = useState(false);

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

			pending: pending,
			createdAt: firebase.firestore.FieldValue.serverTimestamp(),

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
				placeholder="Enter book or author..."
			></TextInput>
			<br></br>
			<Text style={{ fontSize: 14, marginBottom: '1rem' }}>
				Select your book:
			</Text>

			{searchResults.map((book, index) => {
				return (
					<TouchableOpacity onPress={() => setChosenBook(book)}>
						<View
							style={
								isSelected ? styles.bookOptionsSelected : styles.bookOptions
							}
							key={index}
						>
							<Text
								numberOfLines={2}
								ellipsizeMode={'tail'}
								style={styles.textOptionsTitle}
							>
								{book.title}
							</Text>
							<Text style={styles.textOptionsAuthor}>{book.author}</Text>
						</View>
					</TouchableOpacity>
				);
			})}

			<View>
				<TouchableOpacity
					onPress={() => {
						chooseBook(chosenBook);
						navigation.navigate('My Books');
					}}
				>
					<Text style={styles.button}>Add book for lend</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	title: {
		width: '100%',
		marginTop: 20,
		fontSize: 25,
		fontWeight: 'bold',
		marginLeft: '10%',
		marginBottom: 15,
	},
	// input: {
	// 	backgroundColor: 'white',
	// 	paddingHorizontal: 15,
	// 	paddingVertical: 10,
	// 	borderRadius: 10,
	// 	marginTop: 5,
	// 	backgroundColor: 'yellow',
	// },

	textBoxes: {
		width: '90%',
		fontSize: 18,
		padding: 12,
		borderColor: 'gray',
		borderWidth: 0.2,
		borderRadius: 10,
	},
	button: {
		textAlign: 'center',
		backgroundColor: '#0782F9',
		color: 'white',
		width: '335px',
		padding: 15,
		borderRadius: '.5rem',
		alignItems: 'center',
		marginTop: '1rem',
		fontWeight: 'bold',
		fontSize: '1.1rem',
	},
	bookOptions: {
		justifyContent: 'center',
		alignItems: 'center',
		width: '335px',
		backgroundColor: 'white',
		borderRadius: '.5rem',
		marginBottom: '.5rem',
		padding: '.5rem',
	},
	bookOptionsSelected: {
		justifyContent: 'center',
		alignItems: 'center',
		width: '335px',
		backgroundColor: 'white',
		borderRadius: '.5rem',
		marginBottom: '.5rem',
		padding: '.5rem',
		borderWidth: 2,
		borderColor: '#0782F9',
	},
	textOptionsTitle: {
		fontSize: 17,
		fontWeight: 'bold',
		numberOfLines: 1,
		marginBottom: 5,
	},
	textOptionsAuthor: {
		fontSize: 14,
		textTransform: 'capitalize',
	},
});
