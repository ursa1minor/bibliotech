import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

const Bibliotech = () => {
	return (
		<View style={styles.container}>
			<Image style={styles.logo} source={require('../../bibliotech-transparent.png')} />
			{/* <Ionicons name="chatbubbles-outline" size={24} color="black" /> */}
		</View>
	);
};

const styles = StyleSheet.create({
	logo: {
		width: 150,
		height: 55,
		alignItems: 'center',
	},
	container: {
		paddingTop: 5,
		paddingRight: 5,
		paddingBottom: 5,
		paddingLeft: 5,
		justifyContent: 'space-between',
		backgroundColor: '#e5e5e5',
		alignItems: 'center'
	},
});

export default Bibliotech;
