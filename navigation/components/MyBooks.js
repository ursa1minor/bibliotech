import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import Header from '../components/Header';
import { firebase } from '../../config';

const MyBooks = ({ navigation }) => {
	const [myBookList, setMyBookList] = useState([]);
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

	console.log(myBookList, '<<< mybook');
	return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<ScrollView>
				{myBookList.map((book) => {
					return (
						<View key={book.id}>
							<Text>{book.title}</Text>
							<Image source={book.cover_img} />
						</View>
					);
				})}
			</ScrollView>
		</View>
	);
};

export default MyBooks;
