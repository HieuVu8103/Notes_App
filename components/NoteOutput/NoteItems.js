import {
    Pressable,
    View,
    Text,
    StyleSheet,
    Modal,
    TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { formatDistanceToNow, format } from 'date-fns';
import { LABELS } from '../../data/dummy-data';
import { useNavigation } from '@react-navigation/native';
import { useState, useContext } from 'react';
import { NotesContext } from '../../store/notes-context';
import { AntDesign } from '@expo/vector-icons';

function NoteItem({
    id,
    color,
    labelIds = [],
    content,
    updateAt,
    isBookmarked,
    type,
    folderId,
}) {
    const labels = labelIds
        .map((labelId) => {
            const label = LABELS.find((label) => label.id === labelId);
            return label ? label.label : null;
        })
        .filter(Boolean);
    const formattedDate = formatDate(updateAt);
    const navigation = useNavigation();
    const notesCtx = useContext(NotesContext);
    const [modalVisible, setModalVisible] = useState(false);

    const folder = notesCtx.folders.find((f) => f.id === folderId);
    const isInFolder = folder?.noteIds.find((i) => i === id);
    const [checked, setChecked] = useState(isInFolder);

    function notePressHandler() {
        if (type === 'trash') {
            setModalVisible(true);
            return;
        }

        if (type === 'folder') {
            setChecked((prev) => !prev);
            if (checked) {
                notesCtx.removeNoteFromFolder({
                    folderId,
                    noteId: id,
                });
                return;
            }

            notesCtx.addNoteToFolder({
                folderId,
                noteId: id,
            });
            return;
        }

        navigation.navigate('Edit Note', { noteId: id });
    }

    const restoreNote = () => {
        notesCtx.restoreNote({
            id,
            color,
            labelIds,
            content,
            updateAt,
            isBookmarked,
        });
        setModalVisible(false);
    };

    const deleteForever = () => {
        notesCtx.deleteForever(id);
        setModalVisible(false);
    };

    return (
        <>
            <Pressable
                onPress={notePressHandler}
                style={({ pressed }) => pressed && styles.pressed}>
                <View
                    style={{
                        ...styles.container,
                    }}>
                    <View style={styles.header}>
                        <View
                            style={[
                                styles.dot,
                                { backgroundColor: color},
                            ]}
                        />

                        <Text style={styles.date}>{formattedDate}</Text>

                        {isBookmarked && (
                            <Ionicons
                                name='bookmark'
                                size={24}
                                color='gray'
                            />
                        )}

                        {type == 'folder' && (
                            <TouchableOpacity
                                style={styles.checkbox}
                                onPress={() => {
                                    setChecked(true);
                                }}>
                                <View
                                    style={[
                                        styles.checkboxIcon,
                                        checked && styles.checked,
                                    ]}>
                                    {checked && (
                                        <AntDesign
                                            name='check'
                                            size={16}
                                            color='white'
                                        />
                                    )}
                                </View>
                            </TouchableOpacity>
                        )}
                    </View>
                    <View style={styles.labelsContainer}>
                        {labels.map((label, index) => (
                            <Text
                                key={index}
                                style={styles.label}>
                                {label}
                            </Text>
                        ))}
                    </View>
                    <Text style={styles.content}>{content}</Text>
                </View>
            </Pressable>

            <Modal
                visible={modalVisible}
                transparent={true}
                onRequestClose={() => setModalVisible(false)}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Pressable
                            style={styles.closeButton}
                            onPress={() => setModalVisible(false)}>
                            <Ionicons
                                name='close'
                                size={24}
                                color='black'
                            />
                        </Pressable>
                        <Pressable
                            style={[styles.button, styles.buttonRestore]}
                            onPress={restoreNote}>
                            <Text style={styles.textStyle}>Restore</Text>
                        </Pressable>

                        <Pressable
                            style={[styles.button, styles.buttonDelete]}
                            onPress={deleteForever}>
                            <Text style={styles.textStyle}>
                                Delete forever
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </>
    );
}

const formatDate = (date) => {
    const now = new Date();
    const diffInHours = Math.abs(now - date) / (1000 * 60 * 60);
    if (diffInHours < 24) {
        return formatDistanceToNow(date, {
            addSuffix: true,
            includeSeconds: true,
        }).replace('about ', '');
    } else {
        return format(date, 'dd/MM/yyyy');
    }
};

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        marginVertical: 8,
        marginHorizontal: 16,
        padding: 16,
        backgroundColor: 'white',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    dot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        marginRight: 8,
    },
    date: {
        flex: 1,
        fontSize: 14,
        color: 'gray',
    },
    labelsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 8,
    },
    label: {
        backgroundColor: '#f0f0f0',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        marginRight: 8,
        marginBottom: 4,
        fontSize: 12,
    },
    content: {
        fontSize: 16,
    },
    pressed: {
        opacity: 0.5,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: 300,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        marginVertical: 5,
        width: '100%',
        alignItems: 'center',
    },
    buttonRestore: {
        backgroundColor: '#2196F3',
    },
    buttonDelete: {
        backgroundColor: '#f44336',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    closeButton: {
        position: 'absolute',
        top: 2,
        right: 2,
    },
    closeButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
    },

    checkbox: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
        position: 'absolute',

        right: 0,
        top: 50,
    },
    checkboxIcon: {
        width: 20,
        height: 20,
        borderWidth: 1,
        borderColor: '#999',
        borderRadius: 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checked: {
        backgroundColor: 'blue',
    },
});

export default NoteItem;
