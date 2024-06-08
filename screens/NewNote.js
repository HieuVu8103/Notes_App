import { View, Text, TextInput, StyleSheet, KeyboardAvoidingView, ScrollView, Platform } from "react-native";
import IconButton from "../components/UI/IconButtonn";

function NewNote() {

    function addNoteHandler() {
        
    }

    return (
        <KeyboardAvoidingView 
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : null}
        >
            <ScrollView contentContainerStyle={styles.screen}>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        multiline
                        placeholder="Enter new note content..."
                    />
                </View>
            </ScrollView>
            <IconButton
                style={styles.saveButton}
                icon="checkmark-circle"
                size={70}
                color="skyblue"
                onPress={addNoteHandler}
            />
        </KeyboardAvoidingView>
    );
}

export default NewNote;

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
        padding: 12,
        borderColor: "#ccc",
        borderRadius: 8,
        marginBottom: 16,
        minHeight: 50,
    },
    saveButton: {
        position: "absolute",
        bottom: 20,
        right: 20,
    },
});
