import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { Feather, Entypo } from '@expo/vector-icons';

const SearchBar = ({ clicked, searchPhrase, setSearchPhrase, setClicked }) => {
	return (
		<View style={styles.container}>
			<View
				style={
					clicked ? styles.searchBar__clicked : styles.searchBar__unclicked
				}
			>
				<Feather
					name="search"
					size={20}
					color="black"
					style={{ marginLeft: 1 }}
				/>
				<TextInput
					style={styles.input}
					placeholder="Enter book or author..."
					value={searchPhrase}
					onChangeText={setSearchPhrase}
					onFocus={() => {
						setClicked(true);
					}}
				/>
				{clicked && (
					<Entypo
						name="cross"
						size={20}
						color="black"
						onPress={() => {
							setSearchPhrase('');
						}}
					/>
				)}
			</View>
		</View>
	);
};
export default SearchBar;

const styles = StyleSheet.create({
	container: {
		margin: 15,
		alignItems: 'center',
		flexDirection: 'row',
		width: '90%',
	},
	searchBar__unclicked: {
		padding: 10,
		flexDirection: 'row',
		width: '100%',
		backgroundColor: '#d9dbda',
		borderRadius: '.5rem',
		alignItems: 'center',
	},
	searchBar__clicked: {
		padding: 10,
		flexDirection: 'row',
		width: '100%',
		backgroundColor: '#d9dbda',
		borderRadius: '.5rem',
		alignItems: 'center',
	},
	input: {
		fontSize: 15,
		marginLeft: '5%',
		width: '100%',
	},
});
