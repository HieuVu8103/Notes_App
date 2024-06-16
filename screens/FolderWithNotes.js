'use strict';

import IconButton from '../components/UI/IconButtonn';
import { useContext } from 'react';
import { NotesContext } from '../store/notes-context';
import { View, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import NotesList from '../components/NoteOutput/NotesList';

function FolderWithNotes() {
    const navigation = useNavigation();
    const notesCtx = useContext(NotesContext);

    const route = useRoute();
    const { folderId } = route.params;

    const folder = notesCtx.folders.find((f) => f.id === folderId);
    const NotesInsideFolder = notesCtx.notes.filter((n) =>
        folder.noteIds.includes(n.id)
    );
    const notesNotInFolder = notesCtx.notes.filter(
        (n) => !notesCtx.folders.some((f) => f.noteIds.includes(n.id))
    );

    function addNoteHandler() {
        navigation.goBack();
    }

    return (
        <View style={styles.container}>
            <NotesList
                notes={[...notesNotInFolder, ...NotesInsideFolder]}
                type={'noteInFolder'}
                folderId={folderId}
            />
            <IconButton
                style={styles.saveButton}
                icon='checkmark-circle'
                size={70}
                color='skyblue'
                onPress={addNoteHandler}
            />
        </View>
    );
}

export default FolderWithNotes;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    saveButton: {
        position: 'absolute',
        bottom: 30,
        right: 20,
    },
});
