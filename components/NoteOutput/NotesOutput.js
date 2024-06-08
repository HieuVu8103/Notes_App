import { View, StyleSheet } from 'react-native';
import NotesSumary from './NotesSumary';
import NotesList from './NotesList';

function NotesOutput({ notes, isFilteredNotes }) {
    return (
        <View style={styles.container}>
            <NotesSumary notes={notes} />
            <NotesList notes={notes} />
        </View>
    );
}

export default NotesOutput;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
