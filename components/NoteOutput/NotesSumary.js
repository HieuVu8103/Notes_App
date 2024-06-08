import { View, Text, StyleSheet } from 'react-native';

function NotesSumary({ notes, isFilteredNotes }) {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{notes.length} notes</Text>
        </View>
    );
}

export default NotesSumary;

const styles = StyleSheet.create({
    container: {
        padding: 8,
    },
    text: {
        color: 'lightseagreen',
        fontWeight: 'bold',
    },
});
