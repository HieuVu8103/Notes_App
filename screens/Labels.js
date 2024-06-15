import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Modal,
} from 'react-native';
import Header from '../components/layouts/Header';
import ModifyLabel from '../components/NoteOutput/ModifyLabel';
import { useContext } from 'react';
import { NotesContext } from '../store/notes-context';

function Labels() {
    const noteCtx = useContext(NotesContext);
    const [chosenLabels, setChosenLabels] = useState([]);
    const [inputText, setInputText] = useState('');
    const [filteredLabels, setFilteredLabels] = useState(noteCtx.labels);
    const [isDialogVisible, setIsDialogVisible] = useState(false);
    const [selectedLabel, setSelectedLabel] = useState(null);

    function handleLabel(labelId) {
        setChosenLabels((prev) => {
            if (prev.includes(labelId)) {
                return prev.filter((id) => id !== labelId);
            } else {
                return [labelId];
            }
        });

        const label = noteCtx.labels.find((label) => label.id === labelId);
        setSelectedLabel(label);
        setIsDialogVisible(true);
    }

    function searchLabel(labelNames) {
        const searchResult = noteCtx.labels.filter((label) =>
            label.label.toLowerCase().includes(labelNames.toLowerCase())
        );
        setFilteredLabels(searchResult);
    }

    function addLabel() {
        noteCtx.addLabel({
            content: inputText,
        });
        setInputText('');
    }

    const onDeleteLabel = (labelId) => {
        noteCtx.deleteLabel({
            id: labelId,
        });
        setIsDialogVisible(false);
    };

    function handleLabelChange(labelId, newText) {
        noteCtx.updateLabel({
            id: labelId,
            content: newText,
        });
        setIsDialogVisible(false);
    }

    useEffect(() => {
        searchLabel(inputText);
    }, [inputText]);

    const renderLabelItem = ({ item }) => (
        <TouchableOpacity
            style={[
                styles.labelContainer,
                chosenLabels.includes(item.id) &&
                    styles.labelContainerChosen,
            ]}
            onPress={() => handleLabel(item.id)}>
            <Text style={styles.labelText}>{item.label}</Text>
        </TouchableOpacity>
    );

    return (
        <>
            <Header title='Labels' />
            <View>
                <TextInput
                    style={styles.input}
                    placeholder='Search or create labels...'
                    onChangeText={setInputText}
                    value={inputText}
                />
            </View>
            <View style={{ marginLeft: 10, marginBottom: 10 }}>
                <Text>{filteredLabels.length} totals</Text>
            </View>
            {inputText.length > 0 && (
                <TouchableOpacity
                    style={{ marginLeft: 10 }}
                    onPress={addLabel}>
                    <Text style={{ color: 'skyblue', fontWeight: 'bold' }}>
                        + Create label {inputText}
                    </Text>
                </TouchableOpacity>
            )}
            <View style={styles.container}>
                <FlatList
                    data={
                        inputText !== '' ? filteredLabels : noteCtx.labels
                    }
                    keyExtractor={(item) => item.id}
                    renderItem={renderLabelItem}
                    numColumns={3}
                />
            </View>
            <Modal
                visible={isDialogVisible}
                animationType='slide'
                transparent={true}
                onRequestClose={() => setIsDialogVisible(false)}>
                <View style={styles.modalContainer}>
                    <ModifyLabel
                        label={selectedLabel}
                        onLabelChange={handleLabelChange}
                        onDeleteLabel={onDeleteLabel}
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
