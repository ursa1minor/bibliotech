import { useNavigation } from '@react-navigation/core';
import React, { useState, useEffect } from 'react';
import {
	StyleSheet,
	Text,
	TouchableOpacity,
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
	const booksRef = db.collection('books')
	const navigation = useNavigation();
	const [searchPhrase, setSearchPhrase] = useState('');
	const [clicked, setClicked] = useState(false);
	const [bookList, setBookList] = useState([]);



	useEffect(() => {
		booksRef
			.onSnapshot(
				snapshot => {
					const books = []
					snapshot.forEach((doc) => {

						const { title, authorFirstName, authorSurname } = doc.data()

						books.push({
							id: doc.id,
							title,
							authorFirstName,
							authorSurname
						})
					})
					setBookList(books)

				}
			)
	}, [searchPhrase]);
	console.log(searchPhrase)
	return (
		<View>
			<SafeAreaView style={styles.root}>
				{!clicked && <Text style={styles.title}>Available Books</Text>}

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
						keyExtractor={(item, index) => item.id}
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
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
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
	root: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	title: {
		width: '100%',
		marginTop: 20,
		fontSize: 25,
		fontWeight: 'bold',
		marginLeft: '10%',
	},
});
