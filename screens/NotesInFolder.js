'use strict';
import { useRoute } from '@react-navigation/native';
import { Pressable, View, Text, StyleSheet } from 'react-native';
import { useContext } from 'react';
import { NotesContext } from '../store/notes-context';
import IconButton from '../components/UI/IconButtonn';
import { useNavigation } from '@react-navigation/native';
import NotesList from '../components/NoteOutput/NotesList';

function NotesInFolder() {
    const route = useRoute();
    const navigation = useNavigation();
    const noteCtx = useContext(NotesContext);
    const { folderId } = route.params;

    const folder = noteCtx.folders.find((f) => f.id === folderId);
    const notesInFolder = noteCtx.notes.filter((n) =>
        folder.noteIds.includes(n.id)
    );

    return (
        <>
            {notesInFolder.length === 0 ? (
                <View style={styles.container}>
                    <Text style={styles.text}>
                        No notes is in this folder
                    </Text>
                    <Text style={styles.text}>
                        Tap + icon to add notes in this folder
                    </Text>
                </View>
            ) : (
                <View>
                    <NotesList
                        notes={notesInFolder}
                        folderId={folderId}
                        type={'folder'}
                    />
                </View>
            )}

            <View style={styles.container}>
                <IconButton
                    style={styles.addButton}
                    icon={'add-circle'}
                    size={70}
                    color='skyblue'
                    onPress={() => {
                        navigation.navigate('Notes with folder', {
                            folderId,
                        });
                    }}
                />
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        textAlign: 'center',
        fontSize: 16,
        marginBottom: 10,
        color: 'gray',
    },

    addButton: {
        position: 'absolute',
        bottom: 0,
        right: 20,
    },
});

export default NotesInFolder;
