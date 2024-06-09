import React, { useEffect, useContext } from 'react';
import { View, StyleSheet, Text, Pressable } from 'react-native';
import { COLORS, LABELS, NOTES, EDITNAME } from '../../data/dummy-data';
import { ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { NotesContext } from '../../store/notes-context';
import { useNavigation } from '@react-navigation/native';

function EditFunction({ isClick }) {
    const route = useRoute();
    const { noteId } = route.params;
    const notesCtx = React.useContext(NotesContext);
    const note = notesCtx.notes.find((n) => n.id === noteId);
    const navigation = useNavigation();

    function getLabelByValue(value) {
        const label = LABELS.find((label) => label.id === value);
        return label ? label.label : null;
    }

    function handler({ funcName }) {
        if (funcName == 'Delete') {
            return () => {
                notesCtx.deleteNote(note.id);
                navigation.navigate('Notes App');
            };
        }

        if (funcName == 'Make a copy') {
            return () => {
                notesCtx.addNote({
                    ...note,
                    isBookmarked: false,
                    updateAt: Date.now(),
                });
                navigation.navigate('Notes App');
            };
        }

        if (funcName == 'Change color') {
            return (color) => {
                notesCtx.updateNote(note.id, {
                    ...note,
                    updateAt: Date.now(),
                    color,
                });
                navigation.navigate('Notes App');
            };
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.scrollBar}>
                <ScrollView horizontal>
                    <View style={styles.color_bar}>
                        <View style={styles.emptyCircle}>
                            <Text
                                style={{
                                    textAlign: 'center',
                                    fontSize: 12,
                                }}>
                                No color
                            </Text>
                        </View>
                        {COLORS.map((color, index) => (
                            <Pressable
                                style={({ pressed }) => pressed && styles.pressed}
                                key={index}
                                onPress={() => {
                                    handler({
                                        funcName: 'Change color',
                                    })(color);
                                }}>
                                <View
                                    key={index}
                                    style={[
                                        styles.colorCircle,
                                        { backgroundColor: color },
                                    ]}
                                />
                            </Pressable>
                        ))}
                    </View>
                </ScrollView>
            </View>
            <View style={styles.noteLabel}>
                {note.labelIds.map((labelId, index) => (
                    <Text
                        key={index}
                        style={styles.noteLabelText}>
                        {getLabelByValue(labelId)}
                    </Text>
                ))}
                <Pressable
                    style={({ pressed }) => pressed && styles.pressed}
                    onPress={() => {
                        navigation.navigate('Manage Labels', { note });
                    }}>
                    <Text style={styles.noteLabelText}>
                        {' '}
                        + Manage Labels
                    </Text>
                </Pressable>
            </View>
            <View>
                {EDITNAME.map((edit, index) => (
                    <Pressable
                        style={({ pressed }) => pressed && styles.pressed}
                        onPress={handler({ funcName: edit.editName })}>
                        <View
                            key={index}
                            style={styles.editCategory}>
                            <Ionicons
                                name={edit.img}
                                size={18}
                                color='grey'></Ionicons>
                            <Text style={{ fontSize: 18, color: 'grey' }}>
                                {edit.editName}
                            </Text>
                        </View>
                    </Pressable>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
    },
    scrollBar: {},
    color_bar: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
        shadowColor: 'grey',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
        gap: 10,
    },
    colorCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    emptyCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: 'black',
    },
    noteLabel: {
        display: 'flex',
        flexDirection: 'row',
        paddingHorizontal: 8,
        paddingVertical: 8,
        borderRadius: 12,
        marginRight: 8,
        fontSize: 12,
    },
    noteLabelText: {
        backgroundColor: '#f9f9f9',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        marginRight: 8,
        marginBottom: 4,
        maxWidth: 150,
        fontSize: 12,
        color: 'gray',
    },
    editCategory: {
        display: 'flex',
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center',
        gap: 10,
    },
    pressed: {
        opacity: 0.5,
    },
});

export default EditFunction;
