import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

const Header = () => {
	return (
		<View style={styles.container}>
			<Image style={styles.logo} source={require('../assets/bibliotech.png')} />
			<Ionicons name="chatbubbles-outline" size={24} color="black" />
		</View>
	);
};

const styles = StyleSheet.create({
	logo: {
		width: 150,
		height: 45,
		resizeMode: 'contain',
	},
	container: {
		paddingTop: 25,
		paddingRight: 15,
		paddingBottom: 5,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		// // shadowColor: '#4D4D4D',
		// // shadowOpacity: 0.8,
		// // shadowRadius: 20,
		// // shadowOffset: {
		// // 	height: 10,
		// // 	width: 10,
		// },
	},
});

export default Header;
