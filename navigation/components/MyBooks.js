import React, { useState, useEffect } from 'react';
import {
	View,
	Text,
	ScrollView,
	Image,
	TouchableOpacity,
	StyleSheet,
} from 'react-native';
import { firebase } from '../../config';

const MyBooks = () => {
	const [myBookList, setMyBookList] = useState([]);
	const [isMyBooksActive, setIsMyBooksActive] = useState(false);
	const [isMyBorrowedBooksActive, setIsMyBorrowedBooksActive] = useState(false);
	const db = firebase.firestore();
	const booksRef = db.collection('books');
	const auth = firebase.auth();

	useEffect(() => {
		setIsMyBooksActive(true);
		booksRef.onSnapshot((snapshot) => {
			const books = [];
			snapshot.forEach((doc) => {
				const { title, author, user_id, cover_img, available } = doc.data();
				if (auth.currentUser?.uid === user_id) {
					books.push({
						id: doc.id,
						title,
						author,
						user_id,
						cover_img,
						available,
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
				const { title, author, user_id, cover_img, borrower, available } =
					doc.data();
				if (auth.currentUser?.uid == borrower) {
					books.push({
						id: doc.id,
						title,
						author,
						user_id,
						cover_img,
						available,
					});
				}
			});
			setIsMyBorrowedBooksActive(true);
			setIsMyBooksActive(false);
			setMyBookList(books);
		});
	};

	const handleMyBooks = () => {
		booksRef.onSnapshot((snapshot) => {
			const books = [];
			snapshot.forEach((doc) => {
				const { title, author, user_id, cover_img, available } = doc.data();
				if (auth.currentUser?.uid === user_id) {
					books.push({
						id: doc.id,
						title,
						author,
						user_id,
						cover_img,
						available,
					});
				}
			});
			setIsMyBorrowedBooksActive(false);
			setIsMyBooksActive(true);
			setMyBookList(books);
		});
	};

	return (
			<ScrollView>
		<View>
			<View style={styles.container}>
				<View
					style={
						isMyBooksActive
							? styles.innerContainerActive
							: styles.innerContainerInactive
					}
				>
					<TouchableOpacity style={styles.myBooks} onPress={handleMyBooks}>
						<Text>My Books</Text>
						<Text
							style={isMyBooksActive ? styles.textActive : styles.textInactive}
						>
							My books
						</Text>

					</TouchableOpacity>
				</View>
				<View
					style={
						isMyBorrowedBooksActive
							? styles.innerContainerActive
							: styles.innerContainerInactive
					}
				>
					<TouchableOpacity onPress={handleBorrowedBooks}>
						<Text>Borrowed Books</Text>
						<Text
							style={
								isMyBorrowedBooksActive
									? styles.textActive
									: styles.textInactive
							}
						>
							Borrowed books
						</Text>
					</TouchableOpacity>
				</View>
			</View>
				{myBookList.map((book) => {
					return (
						<View style={styles.bookCard} key={book.id}>
							<Image style={styles.bookImage} source={book.cover_img} />
							<View style={styles.detailsWrapper}>
								<Text style={styles.title}>{book.title}</Text>
								<Text style={styles.author}>{book.author}</Text>
								{book.available ? (
									<Text style={styles.availability}>
										Book available for lending
									</Text>
								) : (
									<Text style={styles.availability}>Book lent</Text>
								)}
							</View>
						</View>
					);
				})}
		</View>
			</ScrollView>
	);
};

export default MyBooks;

const styles = StyleSheet.create({
	container: {
		with: '100%',
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		marginBottom: '1rem',
	},
	textActive: {
		fontSize: '1rem',
		fontWeight: 'bold',
	},
	textInactive: {
		fontSize: '1rem',
		fontWeight: 'normal',
		color: '#979797',
	},
	innerContainerInactive: {
		alignItems: 'center',
		width: '50%',
		paddingTop: '1rem',
		paddingBottom: '1rem',
	},
	innerContainerActive: {
		alignItems: 'center',
		width: '50%',
		paddingTop: '1rem',
		paddingBottom: '1rem',
		fontSize: '2rem',
		fontWeight: 'bold',
		borderBottomWidth: 3,
		borderBottomColor: '#979797',
	},
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
	title: {
		fontSize: 17,
		fontWeight: 'bold',
		marginBottom: 5,
	},
	author: {
		fontSize: 14,
		textTransform: 'capitalize',
	},
	availability: {
		fontSize: 12,
		marginTop: 5,
		color: '#808080',
	},
});
