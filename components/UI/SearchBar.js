import React from 'react';
import { TextInput, StyleSheet, View } from 'react-native';
import IconButton from './IconButtonn';

function SearchBar({ searchText, setQuery, hiddenSearch, filterNote }) {
    return (
        <View style={styles.searchBar}>
            <IconButton
                style={styles.wrapper}
                icon={'arrow-back-outline'}
                size={24}
                color='gray'
                onPress={() => {
                    setQuery('');
                    hiddenSearch();
                }}
            />

            <TextInput
                style={styles.input}
                placeholder='Type here...'
                onChangeText={(value) => setQuery(value)}
                value={searchText}
            />

            <IconButton
                style={styles.close}
                icon={'close-outline'}
                size={24}
                color='gray'
                onPress={() => setQuery('')}
            />
        </View>
    );
}

export default SearchBar;

const styles = StyleSheet.create({
    searchBar: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: 'white',

        flexDirection: 'row',
    },
    input: {
        flex: 1,
    },
    close: {
        marginLeft: 'auto',
    },
});
