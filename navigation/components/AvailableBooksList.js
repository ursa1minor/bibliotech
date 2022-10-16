
import React from "react";
import { useNavigation } from '@react-navigation/core'
import { StyleSheet, Text, View, FlatList, SafeAreaView, Pressable } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const Item = ({ name, details }) => (
    <View style={styles.item}>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.details}>{details}</Text>
    </View>
);


const List = ({ searchPhrase, setClicked, data }) => {
    const navigation = useNavigation();

    const renderItem = ({ item }) => {

        if (searchPhrase === "" && item.available === true) {
            return (<TouchableOpacity
                onPress={() => navigation.navigate('Single book', { id: item.id })}>

                <Item name={item.title} details={item.author} />
            </TouchableOpacity>
            )
        }
        if (
            item.title
                .toUpperCase()
                .includes(searchPhrase.toUpperCase().trim())
            && item.available === true) {
            return (<TouchableOpacity onPress={() => navigation.navigate('Single book', { id: item.id })}>

                <Item name={item.title} details={item.author} />
            </TouchableOpacity>
            )
        }
        if (
            item.author
                .toUpperCase()
                .includes(searchPhrase.toUpperCase().trim())
            && item.available === true
        ) {
            return (<TouchableOpacity onPress={() => navigation.navigate('Single book', { id: item.id })}>

                <Item name={item.title} details={item.author} />
            </TouchableOpacity>
            )
        }
    };

    return (
        <SafeAreaView style={styles.list__container}>
            <View
                onStartShouldSetResponder={() => {
                    setClicked(false);
                }}
            >
                <FlatList
                    keyExtractor={(item, index) => item.id}
                    data={data}
                    renderItem={renderItem}
                />
            </View>
        </SafeAreaView>
    );
};

export default List;

const styles = StyleSheet.create({
    list__container: {
        margin: 10,
        height: "85%",
        width: "100%",
    },
    item: {
        margin: 30,
        borderBottomWidth: 2,
        borderBottomColor: "lightgrey",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 5,
        fontStyle: "italic",
    },
    container: {
        backgroundColor: '#e5e5e5',
        padding: 15,
        borderRadius: 15,
        margin: 5,
        marginHorizontal: 10,
    },
    innerContainer: {
        alignItems: 'center',
        flexDirection: 'column',
    },
    itemHeading: {
        fontWeight: 'bold'
    },
    itemText: {
        fontWeight: '300'
    }
});