'use strict';

import IconButton from '../components/UI/IconButtonn';
import { useContext, useState } from 'react';
import { NotesContext } from '../store/notes-context';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    KeyboardAvoidingView,
    ScrollView,
    Platform,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import NotesList from '../components/NoteOutput/NotesList';

function NotesWithFolder() {
    const navigation = useNavigation();
    const notesCtx = useContext(NotesContext);

    const route = useRoute();
    const { folderId } = route.params;

    return (
        <View>
            <NotesList
                notes={notesCtx.notes}
                type={'folder'}
                folderId={folderId}
            />
        </View>
    );
}

export default NotesWithFolder;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    screen: {
        flexGrow: 1,
        padding: 16,
        justifyContent: 'flex-end',
    },
    inputContainer: {
        flex: 1,
    },
    input: {
        fontSize: 16,
        borderColor: '#ccc',
        borderRadius: 8,
        marginBottom: 16,
        minHeight: 30,
    },
    saveButton: {
        position: 'absolute',
        bottom: 30,
        right: 20,
    },
});
