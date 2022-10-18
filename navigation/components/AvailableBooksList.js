import React from 'react';
import { useNavigation } from '@react-navigation/core';
import {
	StyleSheet,
	Text,
	View,
	FlatList,
	Image,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

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

	const renderItem = ({ item }) => {
		if (searchPhrase === '' && item.available === true) {
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
		if (
			item.title.toUpperCase().includes(searchPhrase.toUpperCase().trim()) &&
			item.available === true
		) {
			return (
				<TouchableOpacity
					style={{ width: '100%' }}
					onPress={() => navigation.navigate('Book Card', { id: item.id })}
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
		if (
			item.author.toUpperCase().includes(searchPhrase.toUpperCase().trim()) &&
			item.available === true
		) {
			return (
				<TouchableOpacity
					style={{ width: '100%' }}
					onPress={() => navigation.navigate('Book Card', { id: item.id })}
				>

					<Item name={item.title} details={item.author} />
=======

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

	return (
			<View
				onStartShouldSetResponder={() => {
					setClicked(false);
				}}
				style={{width: '100%'}}
			>
				<FlatList
					keyExtractor={(item) => item.id}
					data={data}
					renderItem={renderItem}
				/>
			</View>
	);
};

export default List;

const styles = StyleSheet.create({
	contentContainer: {
		flex: 1,
		justifyContent: 'center',
		maxWidth: '90%',
		minWidth: '90%',
	},
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
		fontSize: 12,
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
