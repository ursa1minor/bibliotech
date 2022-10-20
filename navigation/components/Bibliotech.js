import React from 'react';
import { View, StyleSheet, Image } from 'react-native';

const Bibliotech = () => {
	return (
		<View style={styles.container}>
			<Image style={styles.logo} source={require('../../assets/bibliotech-transparent.png')} />
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
