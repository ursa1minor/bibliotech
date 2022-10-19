import { useNavigation } from '@react-navigation/core';
import React, { useState, useEffect } from 'react';
import {
	StyleSheet,
	Text,
	View,
	SafeAreaView,
	ActivityIndicator,
} from 'react-native';
import { firebase } from '../../config';
import SearchBar from './SearchBar';
import List from './AvailableBooksList';

const HomeScreen = () => {
	const auth = firebase.auth();
	const db = firebase.firestore();
	const booksRef = db.collection('books');
	const navigation = useNavigation();
	const [searchPhrase, setSearchPhrase] = useState('');
	const [clicked, setClicked] = useState(false);
	const [bookList, setBookList] = useState([]);

	useEffect(() => {
		booksRef.onSnapshot((snapshot) => {
			const books = [];
			snapshot.forEach((doc) => {
				const { title, author, available, cover_img, user_id } = doc.data();
				books.push({
					id: doc.id,
					title,
					author,
					available,
					cover_img,
					user_id

				});
			});
			setBookList(books);
		});
	}, [searchPhrase]);

	return (
		<View style={styles.root}>
			<SafeAreaView style={styles.root}>
				<Text style={styles.title}>Available Books</Text>

				<SearchBar
					searchPhrase={searchPhrase}
					setSearchPhrase={setSearchPhrase}
					clicked={clicked}
					setClicked={setClicked}
				/>
				{!bookList ? (
					<ActivityIndicator size="large" />
				) : (
					<List
						keyExtractor={(item) => item.id}
						searchPhrase={searchPhrase}
						data={bookList}
						setClicked={setClicked}
					/>
				)}
			</SafeAreaView>
		</View>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({

	root: {
		alignItems: 'center',
		flex: 1,
		flexGrow: 1,
		width: '100%'
	},
	title: {
		width: '100%',
		marginTop: 20,
		fontSize: 25,
		fontWeight: 'bold',
		marginLeft: '10%',
	},
});
