import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { firebase } from '../../config';
import { ScrollView } from 'react-native-gesture-handler';
import { doc, collection, updateDoc, addDoc, query, orderBy, limit, where, getDocs } from 'firebase/firestore';
import { TextInput } from 'react-native-web';

const Messages = ( {book} ) => {

	const db = firebase.firestore();
	const userID = firebase.auth().currentUser.uid
	const booksRef = db.collection('books');
	const usersRef = db.collection('users');
	const messagesRef = db.collection('messages');

	const [message, setMessage] = useState('');
	const [messageHistory, setMessageHistory] = useState([]);

	const [user, setUser] = useState(''); 
	//const lenderID = book.user_id;
	//const borrowerID = book.borrower;
	//const [borrower, setBorrower] = useState('');
	const [lender, setLender] = useState('');	

	useEffect(() => {
		messagesRef
			.where('writerName', '==', 'Pippi')
			.orderBy('createdAt')
			.get()
			.onSnapshot((snapshots) => {
				setMessageHistory(snapshots.docs.map((doc) => doc.data()))
		});
	}, []);

	useEffect(() => {
		usersRef
			.doc(userID)
			.get()
			.then((snapshot) => {
				setUser(snapshot.data());
			});
	}, []);

	// useEffect(() => {
	// 	usersRef
	// 		.doc(lenderID)
	// 		.get()
	// 		.then((snapshot) => {
	// 			setLender(snapshot.data());
	// 		});
	// }, []);

	// useEffect(() => {
	// 	usersRef
	// 		.doc(borrowerID)
	// 		.get()
	// 		.then((snapshot) => {
	// 			setBorrower(snapshot.data());
	// 		});
	// }, []);

	// function createMessage() {
	// 	addDoc(collection(db, 'messages'), {
	// 		message: message,
	// 		writer: userID,
	// 		borrower: borrowerID,
	// 		lender: lenderID,
	// 		createdAt: firebase.firestore.FieldValue.serverTimestamp(),
	// 		bookID: id,
	// 		writerName: user.username,
	// 	})
	// 	setMessage('')
	// 		.catch((error) => {
	// 			console.log(error);
	// 		});
	// }

	return (
		<ScrollView>
	 		<View style={styles.container}>

				<br></br>
	 			<br></br>
	 			<View style={styles.messageContainer}>
	 				<View >

						
	 					{messageHistory.map((message) => {
							if (message.message.length > 0) 
							 
								{
							return (
								<View key={message.id}>
									<Text style={styles.messageLender}>
										<br></br>
										{message.message}
									</Text>
									<View>
										<Text style={styles.messageBorrower}>{message.userID}</Text>
										<Text style={styles.messageBorrowerName}>
											{message.writerName}
										</Text>
										<br></br>
									</View>
								</View>
							)
						}
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
						{/* <TouchableOpacity style={styles.button} onPress={createMessage}>
							<Text style={styles.textButton}> Send </Text>
						</TouchableOpacity> */}
					</View>
				</View>
			</View>
		</ScrollView>
	);
};

export default Messages;

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
	messageBorrowerWrapper: {
		marginLeft: '.5rem',
		alignItems: 'flex-end',
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
