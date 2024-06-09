import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, Text, FlatList, StyleSheet, TextInput, TouchableOpacity, Modal } from 'react-native';
import { LABELS } from '../data/dummy-data';
import Header from '../components/layouts/Header';
import Label from '../models/label';
import ModifyLabel from '../components/NoteOutput/ModifyLabel';

function Labels() {
    const [chosenLabels, setChosenLabels] = useState([]);
    const [inputText, setInputText] = useState('');
    const [filteredLabels, setFilteredLabels] = useState(LABELS);
    const [labelCounter, setLabelCounter] = useState(LABELS.length + 1);  
    const [isDialogVisible, setIsDialogVisible] = useState(false);
    const [selectedLabel, setSelectedLabel] = useState(null); 
    
    function handleLabel(labelId) {
        setChosenLabels((prev) => {
            if (prev.includes(labelId)) {
                return prev.filter(id => id !== labelId);
            } else {
                return [labelId];
            }
        });

        const label = LABELS.find(label => label.id === labelId);
        setSelectedLabel(label);
        setIsDialogVisible(true);
    }

    function searchLabel(labelNames) {
        const searchResult = LABELS.filter(label => 
            label.label.toLowerCase().includes(labelNames.toLowerCase())
        );
        setFilteredLabels(searchResult);
    }

    function addLabel() {
        const newLabel = new Label(`l${labelCounter}`, inputText);
        LABELS.push(newLabel);
        setFilteredLabels([...LABELS]);
        setInputText('');
        setLabelCounter(labelCounter + 1);
    }

    const onDeleteNote = (labelId) => {
        const updatedLabels = LABELS.filter(label => label.id !== labelId);
        setFilteredLabels(updatedLabels);
        setIsDialogVisible(false);
    };


    function handleLabelChange(labelId, newText){
        setFilteredLabels(prevLabels => {
            return prevLabels.map(label => {
                if (label.id === labelId) {
                    label.label = newText;
                }
                return label;
            });
        });
        setIsDialogVisible(false);
    };

    useEffect(() => {
        searchLabel(inputText);
    }, [inputText]);

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
            <Header title="Labels" />
            <View>
                <TextInput 
                    style={styles.input} 
                    placeholder="Search or create labels..." 
                    onChangeText={setInputText} 
                    value={inputText}
                />
            </View>
            <View style={{ marginLeft: 10, marginBottom: 10 }}>
                <Text>{filteredLabels.length} totals</Text>
            </View>
            {inputText.length > 0 && (
                <TouchableOpacity style={{ marginLeft: 10 }} onPress={addLabel}>
                    <Text style={{ color: 'skyblue', fontWeight: 'bold' }}>
                        + Create label {inputText}
                    </Text>
                </TouchableOpacity>
            )}
            <View style={styles.container}>
                <FlatList
                    data={filteredLabels}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderLabelItem}
                    numColumns={3}
                />
            </View>
            <Modal
                visible={isDialogVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setIsDialogVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <ModifyLabel
                        label={selectedLabel}
                        onLabelChange={handleLabelChange}
                        onDeleteNote={onDeleteNote}
                    />
                </View>
            </Modal>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f9f9f9',
    },
    input: {
        height: 40,
        backgroundColor: 'white',
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
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
});

export default Labels;
