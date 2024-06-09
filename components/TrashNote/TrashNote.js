import React, { useState, useEffect, useRef, useContext } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableWithoutFeedback,
    KeyboardAvoidingView,
    ScrollView,
    Platform,
    Pressable,
    Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Entypo from '@expo/vector-icons/Entypo';
import { useNavigation, useRoute } from '@react-navigation/native';
import { LABELS } from '../../data/dummy-data';
import { NotesContext } from '../../store/notes-context';
import { formatDistanceToNow } from 'date-fns';

function TrashNote() {
    const navigation = useNavigation();
    const [isClick, setIsClick] = useState(false);
    const route = useRoute();
    const { noteId } = route.params;
    const notesCtx = useContext(NotesContext);
    const note = notesCtx.trash.find((n) => n.id === noteId);
    const [content, setContent] = useState(note.content);

    function getLabelByValue(value) {
        const label = LABELS.find((label) => label.id === value);
        return label ? label.label : null;
    }

    function handleContentChange(text) {
        setContent(text);
    }

    if (!note) {
        return <Text>Note not found</Text>;
    }

    return (
        <TouchableWithoutFeedback onPress={() => setIsClick(false)}>
            <View style={styles.container}>
                <View style={styles.noteLabel}>
                    {note.labelIds?.map((labelId, index) => (
                        <Text
                            key={index}
                            style={styles.noteLabelText}>
                            {getLabelByValue(labelId)}
                        </Text>
                    ))}
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
    },
    noteLabel: {
        backgroundColor: '#f0f0f0',
        display: 'flex',
        flexDirection: 'row',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        marginRight: 8,
        marginBottom: 4,
        marginTop: 10,
        fontSize: 12,
    },
    noteLabelText: {
        backgroundColor: '#f9f9f9',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        marginRight: 8,
        marginBottom: 4,
        maxWidth: 150,
        fontSize: 12,
    },
});

export default TrashNote;
