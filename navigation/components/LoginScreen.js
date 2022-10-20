import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import {
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native';
import { firebase } from '../../config';

const LoginScreen = () => {
	const auth = firebase.auth();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const navigation = useNavigation();

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			if (user) {
				navigation.replace('MainContainer');
			}
		});

		return unsubscribe;
	}, []);

	const handleSignUp = () => {
		navigation.replace('RegistrationForm');
	};

	const handleLogin = () => {
		auth
			.signInWithEmailAndPassword(email, password)
			.then((userCredentials) => {
				const user = userCredentials.user;
			})
			.catch((error) => alert(error.message));
	};

	return (
		<View style={styles.container} behavior="padding">
			<View style={styles.inputContainer}>
				<Text style={styles.inputText}>Email</Text>
				<TextInput
					placeholder="Email"
					value={email}
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
			</View>

			<View style={styles.buttonContainer}>
				<TouchableOpacity onPress={handleLogin} style={styles.button}>
					<Text style={styles.buttonText}>Login</Text>
				</TouchableOpacity>

				<View style={styles.registerWrapper}>
					<Text style={styles.text}>
						Don't have an account yet?
						<TouchableOpacity style={styles.signUp} onPress={handleSignUp}>
							<Text>
								{' '}
								Sign Up{' '}
							</Text>
						</TouchableOpacity>
					</Text>
				</View>
			</View>
		</View>
	);
};

export default LoginScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	inputContainer: {
		width: '90%',
	},
	input: {
		width: '100%',
		padding: 15,
		backgroundColor: 'white',
		marginTop: 5,
		borderRadius: '.5rem',
		color: '#979797',
	},
	buttonContainer: {
		width: '90%',
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 40,
	},
	button: {
		backgroundColor: '#0782F9',
		width: '100%',
		padding: 15,
		borderRadius: '.5rem',
		alignItems: 'center',
	},
	buttonOutline: {
		backgroundColor: 'white',
		marginTop: 5,
		borderColor: '#0782F9',
		borderWidth: 2,
	},
	buttonText: {
		color: 'white',
		fontWeight: '700',
		fontSize: 16,
	},
	buttonOutlineText: {
		color: '#0782F9',
		fontWeight: '700',
		fontSize: 16,
	},
	inputText: {
		fontSize: 14,
		fontWeight: 'bold',
		marginTop: 15,
	},
	text: {
		marginTop: 20,
	},
	registerWrapper: {
		flex: 1,
		alignItems: 'center',
	},
	signUp: {
		fontWeight: 'bold',
		paddingLeft: '.2rem',
	},
});
