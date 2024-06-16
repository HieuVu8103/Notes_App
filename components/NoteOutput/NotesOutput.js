import { View, StyleSheet, Text } from 'react-native';
import NotesSumary from './NotesSumary';
import NotesList from './NotesList';
import { useContext } from 'react';
import { NotesContext } from '../../store/notes-context';

function NotesOutput({ notes, type, tab, query }) {
    const noteCtx = useContext(NotesContext);
    return (
        <View style={styles.container}>
            <NotesSumary
                notes={notes}
                content={tab}
            />
            {notes.length > 0 && (
                <NotesList
                    notes={notes}
                    type={type}
                />
            )}

            {noteCtx.notes.length === 0 && (
                <Text style={styles.inforText}>
                    Please add a new note ...
                </Text>
            )}

            {noteCtx.notes.length !== 0 && notes.length === 0 && (
                <Text style={styles.inforText}>Not found ...</Text>
            )}
        </View>
    );
}

export default NotesOutput;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    inforText: {
        color: 'gray',
        fontSize: 16,
        marginTop: 32,
        marginLeft: 20,
    },
});
