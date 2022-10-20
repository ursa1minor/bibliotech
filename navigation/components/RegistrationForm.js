import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import {
	StyleSheet,
	Text,
	TouchableOpacity,
	TextInput,
	View,
} from 'react-native';
import { firebase } from '../../config';
import { ScrollView } from 'react-native-web';
import Ionicons from 'react-native-vector-icons/Ionicons';

const RegistrationForm = () => {
	const auth = firebase.auth();
	const db = firebase.firestore();
	const [username, setUsername] = useState('');
	const [location, setLocation] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const navigation = useNavigation();

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			if (user) {
				navigation.replace('MainContainer');
			}
		});

		return unsubscribe;
	}, []);

	const handleRegister = () => {
		if (username.trim() !== '' && location.trim() !== '' && firstName.trim() !== '' && lastName.trim() !== '') {
			auth
				.createUserWithEmailAndPassword(email, password)
				.then(() => {
					db.collection('users')
						.doc(firebase.auth().currentUser.uid)
						.set({
							email: email,
							username: username,
							location: location,
							booksBorrowed: 0,
							booksForLend: 0,
							firstName: firstName,
							lastName: lastName,
						});
				})

				.catch((error) => alert(error.message));
		} else {
			alert('please make sure all felids are filled');
		}
	};
	const navToLogin = () => {
		navigation.replace('LoginScreen');
	};
	return (
		<ScrollView>
			<View style={styles.container}>
				<TouchableOpacity onPress={navToLogin}>
					<Ionicons name="arrow-back" style={styles.icon} />
				</TouchableOpacity>
				<Text style={styles.title}>Sign up</Text>
				<View style={styles.inputContainer}>
					<Text style={styles.inputText}>Email</Text>
					<TextInput
						placeholder="Email"
						onChangeText={(text) => setEmail(text)}
						style={styles.input}
					/>
					<Text style={styles.inputText}>Password</Text>
					<TextInput
						placeholder="Password"
						value={password}
						onChangeText={(text) => setPassword(text)}
						style={styles.input}
						secureTextEntry
					/>
					<Text style={styles.inputText}>Username</Text>
					<TextInput
						placeholder="Username"
						onChangeText={(text) => setUsername(text)}
						style={styles.input}
						required
					/>
					<Text style={styles.inputText}>Location</Text>
					<TextInput
						placeholder="Location"
						value={location}
						onChangeText={(text) => setLocation(text)}
						style={styles.input}
					/>
					<Text style={styles.inputText}>First name</Text>
					<TextInput
						placeholder="First name"
						value={firstName}
						onChangeText={(text) => setFirstName(text)}
						style={styles.input}
						required
					/>
					<Text style={styles.inputText}>Last name</Text>
					<TextInput
						placeholder="Last name"
						value={lastName}
						onChangeText={(text) => setLastName(text)}
						style={styles.input}
					/>
				</View>
				<View style={styles.buttonContainer}>
					<TouchableOpacity onPress={handleRegister} style={styles.button}>
						<Text style={styles.buttonText}>Complete Registration</Text>
					</TouchableOpacity>
				</View>
			</View>
		</ScrollView>
	);
};

export default RegistrationForm;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	icon: {
		marginTop: 15,
		fontSize: '2rem',
		width: '100%',
		marginLeft: '5%',
		marginBottom: 10,
	},
	title: {
		width: '100%',
		fontSize: 25,
		fontWeight: 'bold',
		marginLeft: '5%',
		marginBottom: 15,
	},
	inputContainer: {
		flex: 1,
		marginLeft: '5%',
	},
	input: {
		width: '90%',
		padding: 15,
		backgroundColor: 'white',
		marginTop: 5,
		borderRadius: '.5rem',
		color: '#979797',
	},
	inputText: {
		fontSize: 14,
		fontWeight: 'bold',
		marginTop: 15,
	},
	buttonContainer: {
		flex: 1,
		justifyContent: 'center',
		marginTop: 130,
	},
	button: {
		backgroundColor: '#0782F9',
		width: '90%',
		padding: 15,
		borderRadius: 10,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 10,
		marginLeft: '5%',
	},
	buttonText: {
		color: 'white',
		fontWeight: '700',
		fontSize: 16,
	},
});
