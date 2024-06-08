import {
    View,
    Text,
    TextInput,
    StyleSheet,
    KeyboardAvoidingView,
    ScrollView,
    Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import IconButton from '../components/UI/IconButtonn';
import { useContext, useState } from 'react';
import { NotesContext } from '../store/notes-context';

function NewNote() {
    const navigation = useNavigation();
    const notesCtx = useContext(NotesContext);
    const [content, setContent] = useState('');

    function addNoteHandler() {
        const trimmedContent = content.trim();
        if (trimmedContent === '') {
            notesCtx.addNote({
                content: 'An empty note!',
                updateAt: new Date(),
            });
        } else {
            notesCtx.addNote({
                content: trimmedContent,
                updateAt: new Date(),
            });
        }
        navigation.goBack();
    }

    function contentChangeHandler(enteredContent) {
        setContent(enteredContent);
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : null}>
            <ScrollView contentContainerStyle={styles.screen}>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        multiline
                        placeholder='Enter new note content...'
                        onChangeText={contentChangeHandler}
                        value={content}
                    />
                </View>
            </ScrollView>
            <IconButton
                style={styles.saveButton}
                icon='checkmark-circle'
                size={70}
                color='skyblue'
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
        borderColor: '#ccc',
        borderRadius: 8,
        marginBottom: 16,
        minHeight: 30,
    },
    saveButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
    },
});
