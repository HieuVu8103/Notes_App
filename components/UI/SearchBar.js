import React from 'react';
import { TextInput, StyleSheet, View, TouchableOpacity } from 'react-native';
import IconButton from './IconButtonn';

function SearchBar({ searchText, value }) {

  return (
    <View style={styles.searchBar}>
      <TextInput
        style={styles.input}
        placeholder="Type here..."        
        onChangeText={searchText}
        value={searchText}
      />
    </View>
  );
}

export default SearchBar;

const styles = StyleSheet.create({
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'gray',
    width: 350,
    height: 100
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 8,
  },
});