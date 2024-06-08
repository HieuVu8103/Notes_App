import { View, Text, StyleSheet } from "react-native";
import { COLORS, NOTES } from "../../data/dummy-data";

function NotesSumary({notes}) {  
    return(
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
        color: "lightseagreen",
        fontWeight: "bold"
    }
})