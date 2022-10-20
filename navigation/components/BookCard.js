import * as React from 'react';
import { useNavigation } from '@react-navigation/core';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { firebase } from '../../config';
import { ScrollView } from 'react-native-gesture-handler';
import { doc, collection, updateDoc, addDoc } from 'firebase/firestore';
import { TextInput } from 'react-native-web';

const BookCard = ({ route }) => {
	const id = route.params;
	const db = firebase.firestore();
	const [book, setBook] = React.useState({});
	const [userID, setUserID] = React.useState(firebase.auth().currentUser.uid);
	const [message, setMessage] = React.useState('');
	const messagesRef = db.collection('messages');
	const usersRef = db.collection('users');
	const booksRef = db.collection('books');
	const [messageHistory, setMessageHistory] = React.useState([]);
	const [user, setUser] = React.useState('');
	const navigation = useNavigation();

	React.useEffect(() => {
		messagesRef.onSnapshot((snapshot) => {
			const messages = [];
			snapshot.forEach((doc) => {
				const { bookID, createdAt, message, user_id } = doc.data();
				messages.push({
					id: doc.id,
					bookID,
					createdAt,
					message,
					user_id,
				});
			});
			setMessageHistory(messages);
		});
	}, []);

	React.useEffect(() => {
		db.collection('users')
			.doc(userID)
			.get()
			.then((snapshot) => {
				setUser(snapshot.data());
			});
	}, []);

	React.useEffect(() => {
		db.collection('books')
			.doc(id)
			.get()
			.then((snapshot) => {
				setBook(snapshot.data());
			});
	}, [id]);

	console.log(route.params, '<- route params');
	console.log(id, '<- id');
	console.log(id, '<- id');
	const handleBack = () => {
		navigation.navigate('My Books');
	};

	function createMessage() {
		addDoc(collection(db, 'messages'), {
			message: message,
			userID: userID,
			createdAt: firebase.firestore.FieldValue.serverTimestamp(),
			bookID: id,
		})
			.then(() => {
				console.log('data submitted');
			})
			.catch((error) => {
				console.log(error);
			});
	}

	return (
		<ScrollView>
			<View style={styles.container}>
				<View>
					<Image style={styles.profileImg} source={book.cover_img} />
				</View>
				<Text style={styles.title}>{book.title} </Text>
				<Text style={styles.authorName}>{book.author}</Text>
				<br></br>
				<Text
					numberOfLines={15}
					ellipsizeMode={'tail'}
					style={styles.description}
				>
					{book.description}
				</Text>
				<br></br>
				<br></br>
				<View style={styles.messageContainer}>
					<View style={styles.messageBorrower}>
						<Text style={styles.messageBorrower}>
							Hi! Please can I borrow this book?
						</Text>
						<Text style={styles.messageBorrowerName}>
						{user.username}
						</Text>
						<br></br>
					</View>
					<View style={styles.messageLenderWrapper}>
						{messageHistory.map((message) => {
							return (
								<View key={message.id}>
									<Text style={styles.messageLender}>
										<br></br>
										{message.message}
									</Text>
									<View>
										<Text style={styles.messageLender}>{message.userID}</Text>
										<Text style={styles.messageLenderUser}>
											{user.username}
										</Text>
										<br></br>
									</View>
								</View>
							);
						})}
					</View>
					<View style={styles.sendMessage}>
						<TextInput
							style={styles.input}
							value={message}
							onChangeText={(message) => {
								setMessage(message);
							}}
							placeholder="Message..."
						></TextInput>
						<TouchableOpacity style={styles.button} onPress={createMessage}>
							<Text style={styles.textButton}> Send </Text>
						</TouchableOpacity>
					</View>
				</View>
				{/* <View style={styles.buttonContainer}>
            <TouchableOpacity
                onPress={handleBack}
                style={styles.button}
            >
                <Text style={styles.buttonText}>Request Book</Text>
            </TouchableOpacity>
        </View> */}
			</View>
		</ScrollView>
	);
};

export default BookCard;

const styles = StyleSheet.create({
	profileImg: {
		width: 440,
		height: 250,
		resizeMode: 'contain',
	},
	container: {
		marginTop: '4rem',
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	description: {
		padding: '10px',
		textAlign: 'justify',
		fontFamily: 'Roboto',
		fontSize: 18,
		marginBottom: 0,
		paddingBottom: 0,
	},
	buttonContainer: {
		width: '60%',
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 40,
	},
	title: {
		fontSize: '1.2rem',
		fontWeight: 'bold',
		marginTop: '1rem',
	},
	authorName: {
		marginTop: '.5rem',
		fontSize: '1rem',
	},
	messageBorrower: {
		marginTop: '.5rem',
		fontSize: 17,
		textAlign: 'left',
		paddingLeft: '.5rem',
	},
	messageContainer: {
		width: '90%',
		marginBottom: '1rem',
		borderRadius: '.5rem',
		borderWidth: '.1rem',
		borderColor: '#E9E9E9',
		backgroundColor: 'white',
	},
	input: {
		marginLeft: '.5rem',
		width: '80%',
		backgroundColor: '#f2f2f2',
		padding: '.3rem',
		paddingLeft: '.5rem',
		borderRadius: '0.5rem',
	},
	sendMessage: {
		flex: 1,
		flexDirection: 'row',
		marginBottom: '.5rem',
	},
	button: {
		padding: '.5rem',
		marginLeft: '.5rem',
		marginRight: '.5rem',
		alignItems: 'center',
		borderRadius: '0.5rem',
		backgroundColor: '#007fff',
	},
	textButton: {
		fontSize: '1.1rem',
		fontWeight: 'bold',
		color: 'white',
	},
	messageLenderWrapper: {
		marginRight: '.5rem',
		alignItems: 'flex-end',
	},
	messageLender: {
		marginLeft: '.5rem',
		flex: 1,
		justifyContent: 'flex-end',
		fontSize: 17,
	},
	messageLenderUser: {
		textAlign: 'right',
		fontStyle: 'italic',
	},
	messageBorrowerName: {
		textAlign: 'left',
		fontStyle: 'italic',
		marginTop: '.5rem',
		paddingLeft: '.5rem',
	}
});
