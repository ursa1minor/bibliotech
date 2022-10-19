import React, { useState } from 'react';
import { firebase } from '../../config';
import {
	StyleSheet,
	Text,
	TouchableOpacity,
	TextInput,
	View,
} from 'react-native';
import { useNavigation } from '@react-navigation/core';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ScrollView } from 'react-native-web';

export const UpdateProfile = () => {
	const db = firebase.firestore();
	const auth = firebase.auth();
	const [username, setUsername] = useState('');
	const [location, setLocation] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const navigation = useNavigation();
	const user = auth.currentUser;

	React.useEffect(() => {
		db.collection('users')
			.doc(auth.currentUser?.uid)
			.get()
			.then((snapshot) => {
				setUsername(snapshot.data().username);
				setFirstName(snapshot.data().firstName);
				setLastName(snapshot.data().lastName);
				setLocation(snapshot.data().location);
				setEmail(snapshot.data().email);
			});
	}, []);
	const handleUpdate = () => {
		user
			.updatePassword(password)
			.then(() => {
				user.updateEmail(email).then(() => {
					firebase
						.firestore()
						.collection('users')
						.doc(firebase.auth().currentUser.uid)
						.update({
							email: email,
							username: username,
							location: location,
							firstName: firstName,
							lastName: lastName,
						})
						.then(() => {
							navigation.replace('Profile');
						});
				});
			})

			.catch((error) => alert(error.message));
	};
	const navToProfile = () => {
		navigation.replace('Profile');
	};
	const navToDelete = () => {
		navigation.replace('Delete Profile');
	};

	return (
		<ScrollView>
			<View style={styles.container}>
				<TouchableOpacity onPress={navToProfile}>
					<Ionicons name="arrow-back" style={styles.icon} />
				</TouchableOpacity>
				<Text style={styles.title}>Update profile</Text>
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
					<TouchableOpacity onPress={handleUpdate} style={styles.button}>
						<Text style={styles.buttonText}>Save</Text>
					</TouchableOpacity>
					<View style={styles.deleteWrapper}>
						<Text style={styles.text}>Don't want to share books anymore?</Text>
						<TouchableOpacity onPress={navToDelete}>
							<Text style={styles.deleteText}>Delete account</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</ScrollView>
	);
};

export default UpdateProfile;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// alignItems: 'center',
	},
	inputContainer: {
		flex: 1,
		marginLeft: '5%',
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
	input: {
		width: '90%',
		padding: 15,
		backgroundColor: 'white',
		marginTop: 5,
		borderRadius: '.5rem',
		color: '#979797',
	},
	buttonContainer: {
		flex: 1,
		justifyContent: 'center',
		marginTop: 210,
	},
	inputText: {
		fontSize: 14,
		fontWeight: 'bold',
		marginTop: 15,
	},
	text: {
		marginTop: 20,
	},
	deleteText: {
		marginTop: 10,
		color: 'red',
		fontWeight: 'bold',
	},
	deleteWrapper: {
		flex: 1,
		alignItems: 'center',
	},
});
