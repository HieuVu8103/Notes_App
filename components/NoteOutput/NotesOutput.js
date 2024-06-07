import { View, StyleSheet } from "react-native";
import NotesSumary from "./NotesSumary";
import NotesList from "./NotesList";
import { NOTES } from "../../data/dummy-data";

function NotesOutput({notes}) {
    return(
        <View style={styles.container}>
            <NotesSumary/>
            <NotesList notes={NOTES} />
        </View>
    );
}

export default NotesOutput

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})