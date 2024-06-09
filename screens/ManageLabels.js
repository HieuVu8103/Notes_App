import React, { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, Text, FlatList, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { LABELS } from '../data/dummy-data';

function ManageLabels() {
    const navigation = useNavigation();
    const route = useRoute();
    const { note } = route.params;

    const [chosenLabels, setChosenLabels] = useState([]);

    function handleLabel(labelId) {
        setChosenLabels((prev) => {
            if (prev.includes(labelId)) {
                return prev.filter(id => id !== labelId);
            } else {
                return [...prev, labelId];
            }
        });
    }

    const renderLabelItem = ({ item }) => (
        <TouchableOpacity 
            style={[styles.labelContainer, chosenLabels.includes(item.id) && styles.labelContainerChosen]} 
            onPress={() => handleLabel(item.id)}
        >
            <Text style={styles.labelText}>{item.label}</Text>
        </TouchableOpacity>
    );

    return (
        <>
            <View>
                <TextInput style={styles.input} placeholder="Search Labels" />
            </View>
            <View style={styles.container}>
                <FlatList
                    data={LABELS}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderLabelItem}
                    numColumns={3}
                    
                />
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f0f0f0',
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 16,
        paddingHorizontal: 8,
    },
    labelContainer: {
        flex: 1,
        backgroundColor: 'skyblue',
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        margin: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    labelContainerChosen: {
        backgroundColor: 'blue',
    },
    labelText: {
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold',
    },
});

export default ManageLabels;
