import React, { useState, useEffect } from 'react';
import {
	View,
	Text,
	ScrollView,
	Image,
	TouchableOpacity,
	StyleSheet,
} from 'react-native';
import { Button } from 'react-native-web';
import { firebase } from '../../config';

const MyBooks = ({ navigation }) => {
	const [myBookList, setMyBookList] = useState([]);
	const [isPressed, setIsPressed] = useState(false);
	const db = firebase.firestore();
	const booksRef = db.collection('books');
	const auth = firebase.auth();

	useEffect(() => {
		booksRef.onSnapshot((snapshot) => {
			const books = [];
			snapshot.forEach((doc) => {
				const { title, author, user_id, cover_img } = doc.data();
				if (auth.currentUser?.uid === user_id) {
					books.push({
						id: doc.id,
						title,
						author,
						user_id,
						cover_img,
					});
				}
			});
			setMyBookList(books);
		});
	}, []);


	const handleBorrowedBooks = () => {
		booksRef.onSnapshot((snapshot) => {
			const books = [];
			snapshot.forEach((doc) => {
				const { title, author, user_id, cover_img, borrower } = doc.data();
				if (auth.currentUser?.uid == borrower) {
					books.push({
						id: doc.id,
						title,
						author,
						user_id,
						cover_img,
					});
				}
			});
			console.log(auth.currentUser?.uid);

			setMyBookList(books);
			console.log(books);
		});
	};

	const handleMyBooks = () => {
		booksRef.onSnapshot((snapshot) => {
			const books = [];
			snapshot.forEach((doc) => {
				const { title, author, user_id, cover_img } = doc.data();
				if (auth.currentUser?.uid === user_id) {
					books.push({
						id: doc.id,
						title,
						author,
						user_id,
						cover_img,
					});
				}
			});
			setMyBookList(books);
		});
	};

=======

	return (
		<View>
			<View style={styles.container}>
				<View style={styles.innerContainerBooks}>
					<TouchableOpacity style={styles.myBooks} onPress={handleMyBooks}>
						<Text>My books</Text>
					</TouchableOpacity>
				</View>
				<View style={styles.innerContainerBorrowed}>
					<TouchableOpacity onPress={handleBorrowedBooks}>
						<Text>Borrowed books</Text>
					</TouchableOpacity>
				</View>
			</View>
			<ScrollView>
				{myBookList.map((book) => {
					return (
						<View style={styles.bookCard} key={book.id}>
							<Image style={styles.bookImage} source={book.cover_img} />
							<Text>{book.title}</Text>
						</View>
					);
				})}
			</ScrollView>
		</View>
	);
};

export default MyBooks;

const styles = StyleSheet.create({
	container: {
		with: '100%',
		flexDirection: 'row',
		justifyContent: 'space-evenly',
	},
	innerContainerBooks: {
		alignItems: 'center',
		width: '50%',
		paddingTop: '1rem',
		paddingBottom: '1rem',
		backgroundColor: 'gray',
	},
	innerContainerBorrowed: {
		alignItems: 'center',
		width: '50%',
		paddingTop: '1rem',
		paddingBottom: '1rem',
	},
	myBooks: {},
	bookCard: {
		marginLeft: '5%',
		marginRight: '5%',
		maxWidth: '90%',
		minWidth: '90%',
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: 'white',
		borderRadius: '.5rem',
		borderBottomWidth: 2,
		borderBottomColor: 'lightgrey',
		marginBottom: '.5rem',
	},
	bookImage: {
		marginTop: '1rem',
		marginBottom: '1rem',
		width: 100,
		height: 75,
		resizeMode: 'contain',
	},
});
