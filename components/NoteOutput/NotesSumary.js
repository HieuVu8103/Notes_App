import { View, Text, StyleSheet } from "react-native";
import { COLORS, NOTES } from "../../data/dummy-data";

function NotesSumary() {  
    return(
        <View style={styles.container}>
            <Text style={styles.text}>{NOTES.length} notes</Text>
        </View>
    );
}

export default NotesSumary;

const styles = StyleSheet.create({
    container: {
        padding: 8,
    },
    text: {
        color: "lightseagreen",
        fontWeight: "bold"
    }
})