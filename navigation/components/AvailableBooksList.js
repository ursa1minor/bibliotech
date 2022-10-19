import React from 'react';
import { useNavigation } from '@react-navigation/core';
import { StyleSheet, Text, View, FlatList, Image, SafeAreaView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { firebase } from '../../config'

const Item = ({ name, author, cover_img }) => (
	<View style={styles.itemCard}>
		<Image style={styles.coverImage} source={cover_img} />
		<View style={styles.detailsWrapper}>
			<Text style={styles.title}>{name}</Text>
			<Text style={styles.author}>{author}</Text>
		</View>
	</View>
);

const List = ({ searchPhrase, setClicked, data }) => {
	const navigation = useNavigation();
	const user = firebase.auth().currentUser.uid;

	const renderItem = ({ item }) => {

		if (item.available === true && item.user_id !== user) {


			if ((searchPhrase === '') ||
				item.title.toUpperCase().includes(searchPhrase.toUpperCase().trim()) ||
				item.author.toUpperCase().includes(searchPhrase.toUpperCase().trim())
			) {

				return (
					<TouchableOpacity

						style={{ width: '100%' }}
						onPress={() => navigation.navigate('Single book', { id: item.id })}
					>
						<Item
							style={styles.item}
							name={item.title}
							author={item.author}
							cover_img={item.cover_img}
						/>

					</TouchableOpacity>
				);
			}
		};
	}


	return (

		<SafeAreaView
			onStartShouldSetResponder={() => {
				setClicked(false);
			}}
			style={{ width: '100%', flex: 1 }}
		>
			<FlatList
				keyExtractor={(item) => item.id}
				data={data}
				renderItem={renderItem}
				style={{ width: '100%', flex: 1 }}
			/>
		</SafeAreaView>
	);
};

export default List;

const styles = StyleSheet.create({
	itemCard: {
		marginLeft: '5%',
		marginRight: '5%',
		maxWidth: '90%',
		minWidth: '90%',
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: 'white',
		borderRadius: '.5rem',
		borderBottomWidth: 2,
		borderBottomColor: 'lightgrey',
		marginBottom: '.5rem',
		display: 'auto',
	},
	title: {
		fontSize: 17,
		fontWeight: 'bold',
		marginBottom: 5,
	},
	author: {
		fontSize: 14,
		textTransform: 'capitalize',
	},
	itemHeading: {
		fontWeight: 'bold',
	},
	itemText: {
		fontWeight: '100',
	},
	detailsWrapper: {
		flexShrink: 1,
	},
	coverImage: {
		marginTop: '1rem',
		marginBottom: '1rem',
		width: 100,
		height: 75,
		resizeMode: 'contain',
	},
});
