import { View, StyleSheet, Text } from 'react-native';
import NotesSumary from './NotesSumary';
import NotesList from './NotesList';

function NotesOutput({ notes, fallbackText, type, tab }) {
    let content = <Text style={styles.inforText}>{fallbackText}</Text>;

    if (notes.length > 0) {
        content = (
            <NotesList
                notes={notes}
                type={type}
            />
        );
    }

    return (
        <View style={styles.container}>
            <NotesSumary notes={notes} content={tab}/>
            {content}
        </View>
    );
}

export default NotesOutput;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    inforText: {
        color: 'black',
        fontSize: 16,
        textAlign: 'center',
        marginTop: 32,
    },
});
