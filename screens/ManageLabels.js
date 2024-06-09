import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { LABELS } from '../data/dummy-data';
import { Dimensions } from 'react-native';
import { TextInput } from 'react-native';
function ManageLabels() {
    const navigation = useNavigation();
    const route = useRoute();
    const { note } = route.params;
    const { width } = Dimensions.get('window');
    const windowWidth = width;
    function getLabelByValue(value) {
        const label = LABELS.find((label) => label.id === value);
        return label ? label.label : null;
    }

    const renderLabelItem = ({ item }) => (
        <View style={styles.labelContainer}>
            <Text style={styles.labelText}>{item.label}</Text>
        </View>
    );

    return (
        <>
        <View>
        <TextInput>

        </TextInput>  
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
        display: 'grid',
        padding: 16,
        backgroundColor: '#fff',
    },
    labelContainer: {
        backgroundColor: 'skyblue',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        borderRadius: 10,
        marginRight: 20,
        marginBottom: 10,
    },
    labelText: {
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold',
    },
});

export default ManageLabels;
