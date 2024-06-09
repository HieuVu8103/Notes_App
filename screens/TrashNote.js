import React, { useState, useEffect, useRef, useContext } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableWithoutFeedback,
    Animated,
    KeyboardAvoidingView,
    ScrollView,
    Platform,
    Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Entypo from '@expo/vector-icons/Entypo';
import { useNavigation, useRoute } from '@react-navigation/native';
import { LABELS } from '../data/dummy-data';
import { NotesContext } from '../store/notes-context';
import { formatDistanceToNow } from 'date-fns';
import EditFunction from '../components/NoteOutput/EditFunction';
import IconButton from '../components/UI/IconButtonn';

function TrashNote() {
    const navigation = useNavigation();
    const [isClick, setIsClick] = useState(false);
    const route = useRoute();
    const { noteId } = route.params;
    const notesCtx = React.useContext(NotesContext);
    const note = notesCtx.trash.find((n) => n.id === noteId);
    const [content, setContent] = useState(note.content);
    const fadeAnim = useRef(new Animated.Value(0)).current;

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

    useEffect(() => {
        if (isClick) {
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }).start();
        }
    }, [isClick, fadeAnim]);

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

                <KeyboardAvoidingView
                    style={styles.container}
                    behavior={Platform.OS === 'ios' ? 'padding' : null}>
                    <ScrollView>
                        <View style={styles.content}>
                            <TextInput
                                style={styles.noteContent}
                                onChangeText={handleContentChange}
                                value={content}
                                multiline
                            />
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>

                {!isClick && (
                    <>
                        <View style={styles.history_bar}>
                            <Text>
                                Deleted{' '}
                                {formatDistanceToNow(
                                    new Date(note.deletedAt),
                                    {
                                        addSuffix: true,
                                    }
                                )}
                            </Text>

                            <View style={styles.right_bar}>
                                <Entypo
                                    name='dots-three-vertical'
                                    size={18}
                                    color='black'
                                    onPress={() => setIsClick(true)}
                                />
                            </View>
                        </View>
                    </>
                )}

                {isClick && (
                    <TouchableWithoutFeedback
                        onPress={(e) => e.stopPropagation()}>
                        <Animated.View
                            style={[
                                styles.editFunctionContainer,
                                { opacity: fadeAnim },
                            ]}>
                            <View style={styles.sheet}>
                                <Pressable
                                    onPress={() => {
                                        notesCtx.restoreNote(note);
                                        navigation.navigate('Trash');
                                    }}>
                                    <Text style={styles.actionButton}>
                                        Restore
                                    </Text>
                                </Pressable>

                                <Pressable
                                    onPress={() => {
                                        notesCtx.deleteForever(note.id);
                                        navigation.navigate('Trash');
                                    }}>
                                    <Text style={styles.actionButton}>
                                        Delete forever
                                    </Text>
                                </Pressable>
                            </View>
                        </Animated.View>
                    </TouchableWithoutFeedback>
                )}
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    actionButton: {
        backgroundColor: 'gray',
        width: 140,
        textAlign: 'center',
        paddingVertical: 12,
        borderRadius: 10,
        overflow: 'hidden',
        color: 'white'
    },
    sheet: {
        height: 100,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
        backgroundColor: '#f0f0f0',
    },
    content: {
        flex: 1,
        padding: 20,
    },
    noteContent: {
        fontSize: 16,
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
    history_bar: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 25,
        fontSize: 18,
        backgroundColor: '#f9f9f9',
        shadowColor: 'gray',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    right_bar: {
        display: 'flex',
        flexDirection: 'row',
        gap: 50,
    },
    saveButton: {
        position: 'absolute',
        bottom: 80,
        right: 30,
    },
});

export default TrashNote;
