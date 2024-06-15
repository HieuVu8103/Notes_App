import {
    View,
    StyleSheet,
    Modal,
    Text,
    Pressable,
    TouchableOpacity,
} from 'react-native';
import FoldersSumary from './FoldesSumary';
import FoldersList from './FoldersList';
import IconButton from '../UI/IconButtonn';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { TextInput } from 'react-native-gesture-handler';
import { useContext } from 'react';
import { NotesContext } from '../../store/notes-context';

function FoldersOutput({ folders }) {
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);
    const [folderName, setFolderName] = useState('');

    const noteCtx = useContext(NotesContext);

    return (
        <View style={styles.container}>
            <FoldersSumary folders={folders} />
            <FoldersList folders={folders} />

            <Modal
                animationType='fade'
                visible={modalVisible}
                transparent={true}
                onRequestClose={() => setModalVisible(false)}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <TextInput
                            style={styles.input}
                            onChangeText={setFolderName}
                            value={folderName}
                            placeholder='Enter the folder name....'
                        />

                        <View style={styles.buttonWrap}>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => {
                                    noteCtx.createFolder(folderName);
                                    setModalVisible(false);
                                    setFolderName('');
                                }}>
                                <Text style={styles.buttonText}>
                                    Create
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[
                                    styles.button,
                                    styles.buttonSecondary,
                                ]}
                                onPress={() => {
                                    setModalVisible(false);
                                    setFolderName('');
                                }}>
                                <Text
                                    style={[
                                        styles.buttonText,
                                        styles.buttonTextSecondary,
                                    ]}>
                                    Cancel
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            <View>
                <IconButton
                    style={styles.addButton}
                    icon={'add-circle'}
                    size={70}
                    color='skyblue'
                    onPress={() => setModalVisible(true)}
                />
            </View>
        </View>
    );
}

export default FoldersOutput;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
    },

    addButton: {
        position: 'absolute',
        bottom: 0,
        right: 20,
    },

    input: {
        height: 40,
        width: '100%',
        paddingHorizontal: 10,
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
        borderRadius: 4,
        padding: 14,
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

    buttonWrap: {
        flexDirection: 'row',
        justifyContent: 'center',
        columnGap: 30,
        width: '100%',
        alignItems: 'center',
        marginTop: 20,
    },
    button: {
        backgroundColor: '#3498db',
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginHorizontal: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 14,
        textAlign: 'center',
    },
    buttonSecondary: {
        backgroundColor: '#2ecc71',
    },
    buttonTextSecondary: {
        color: '#fff',
    },
});
