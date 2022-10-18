import React from 'react';
import { useNavigation } from '@react-navigation/core';
import {
	StyleSheet,
	Text,
	View,
	FlatList,
	ScrollView,
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
					onPress={() => navigation.navigate('Book Card', { id: item.id })}
				>

					<Item
						style={styles.item}
						name={item.title}
						author={item.author}
						cover_img={item.cover_img}
					/>

					<Item name={item.title} details={item.author} />
				</TouchableOpacity>
			);
		}
		if (
			item.author.toUpperCase().includes(searchPhrase.toUpperCase().trim()) &&
			item.available === true
		) {
			return (
				<TouchableOpacity
					onPress={() => navigation.navigate('Book Card', { id: item.id })}
				>
					<Item name={item.title} details={item.author} />

				</TouchableOpacity>
			);
		}
	};

	return (
		<ScrollView>
			<View
				onStartShouldSetResponder={() => {
					setClicked(false);
				}}
			>
				<FlatList
					keyExtractor={(item) => item.id}
					data={data}
					renderItem={renderItem}
				/>
			</View>
		</ScrollView>
	);
};

export default List;

const styles = StyleSheet.create({
	contentContainer: {
		flex: 1,
		justifyContent: 'center',
		maxWidth: '90%',
		minWidth: '90%',
		// alignItems: 'center',
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
		// flexShrink: 'none',
	},
	title: {
		fontSize: 20,
		fontWeight: 'bold',
		marginBottom: 5,
	},
	itemHeading: {
		fontWeight: 'bold',
	},
	itemText: {
		fontWeight: '300',
	},
	coverImage: {
		marginTop: '1rem',
		marginBottom: '1rem',
		width: 100,
		height: 75,
		resizeMode: 'contain',
	},
});
