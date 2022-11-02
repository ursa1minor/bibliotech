import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { firebase } from '../../config';
import { doc, collection, updateDoc, addDoc, query, orderBy, limit, where, getDocs } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const MyBooks = () => {
	const [myBookList, setMyBookList] = useState([]);
	const [isMyBooksActive, setIsMyBooksActive] = useState(false);
	const [isMyBorrowedBooksActive, setIsMyBorrowedBooksActive] = useState(false);
	const db = firebase.firestore();
	const booksRef = db.collection('books');
	const auth = firebase.auth();
	const navigation = useNavigation();

	useEffect(() => {
		setIsMyBooksActive(true);
		booksRef.onSnapshot((snapshot) => {
			const books = [];
			snapshot.forEach((doc) => {
				const { title, author, user_id, cover_img, available, pending, borrower, } = doc.data();
				if (auth.currentUser?.uid === user_id) {
					books.push({
						id: doc.id,
						title,
						author,
						user_id,
						cover_img,
						available,
						pending,
						borrower,
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
				const { title, author, user_id, cover_img, borrower, available, pending } =
					doc.data();
				if (auth.currentUser?.uid == borrower) {
					books.push({
						id: doc.id,
						title,
						author,
						user_id,
						cover_img,
						available,
						pending, 
						borrower,
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
				const { title, author, user_id, cover_img, available, pending, borrower } = doc.data();
				if (auth.currentUser?.uid === user_id) {
					books.push({
						id: doc.id,
						title,
						author,
						user_id,
						cover_img,
						available,
						pending,
						borrower
					});
				}
			});
			setIsMyBorrowedBooksActive(false);
			setIsMyBooksActive(true);
			setMyBookList(books);
		});
	};

	const deleteBook = (id) => {
		booksRef
			.doc(id)
			.delete()
			.then(() => {
				console.log('deleted');
			})
			.catch((error) => alert(error.message));
	};

	const cancelLoanRequest = (id) => {
		updateDoc(doc(db, "books", id), {
			available: true,
			borrower: "", 
			pending: false,
			})
		.then(() => {
			const messageQuery = db.collection('messages')
			.where('bookID','==',id);
			messageQuery
				.get()
				.then(function(querySnapshot) {
					  querySnapshot.forEach(function(doc) {
					doc.ref.delete();
					})
				})
        	})
			.catch((error) => alert(error.message));
    };

	return (
		<ScrollView>
			<View>
				<View style={styles.container}>
					<View
						style={isMyBooksActive ? styles.innerContainerActive : styles.innerContainerInactive}
					>
						<TouchableOpacity style={styles.myBooks} onPress={handleMyBooks}> 
							<Text style={isMyBooksActive ? styles.textActive : styles.textInactive}>Books for Loan</Text>
						</TouchableOpacity>
					</View>
					<View
						style={isMyBorrowedBooksActive ? styles.innerContainerActive : styles.innerContainerInactive}
					>
						<TouchableOpacity onPress={handleBorrowedBooks}>
							<Text style={isMyBorrowedBooksActive ? styles.textActive : styles.textInactive}>Borrowed Books</Text>
						</TouchableOpacity>
					</View>
				</View>
				{myBookList.map((book) => {
					return (
						<View style={styles.bookCard} key={book.id}>
							
						<TouchableOpacity
							style={styles.bookContainer}
								onPress={() => {
									navigation.navigate('Book Card', book.id);
								}}
							>
							<Image style={styles.bookImage} source={book.cover_img} />
								<View style={styles.detailsWrapper}>
									<Text style={styles.title}>{book.title}</Text>
									<Text style={styles.author}>{book.author}</Text>
									{ book.available && 
										<Text style={styles.availability}>
										Available for lending
									</Text>}
									{ book.pending && !book.available &&
									  <Text style={styles.availability}>
										Loan request pending
									</Text>}
									{ !book.available && !book.pending &&
									  <Text style={styles.availability}>
										On loan
									</Text>}
								</View>
								
								<View style={styles.deleteWrapper}>		
									{(book.user_id === auth.currentUser?.uid) && book.available &&
										<TouchableOpacity
											onPress={() => {
												deleteBook(book.id);
											}}
										><Ionicons name="trash-outline" style={styles.icon} />
										</TouchableOpacity>
									}
									{(book.borrower === auth.currentUser?.uid) && book.pending &&
										<TouchableOpacity
											onPress={() => {
												cancelLoanRequest(book.id);
											}}
										><Ionicons name="trash-outline" style={styles.icon} />
										</TouchableOpacity>
									}

								</View>
							</TouchableOpacity>
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
	bookContainer: {
		flex: 3,
		width: '100%',
		flexDirection: 'row',
		alignItems: 'center',
	},
	bookCard: {
		marginLeft: '5%',
		marginRight: '5%',
		maxWidth: '90%',
		minWidth: '90%',
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
	detailsWrapper: {
		flexShrink: 1,
		width: '13rem',
	},
	deleteWrapper: {
		marginRight: '.5rem',
		alignItems: 'flex-end',
		// borderWidth: 1,
		padding: '.15rem',
		// borderRadius: '.2rem',
		// borderColor: '#808080',
	},
	icon: {
		fontSize: '1.1rem',
		color: '#808080',
	},
});
