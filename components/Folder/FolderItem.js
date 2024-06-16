import { Pressable, View, StyleSheet, Text } from 'react-native';
import { formatDistanceToNow, format } from 'date-fns';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

function FolderItem({ id, name, noteIds, createAt, updateAt }) {
    const navigate = useNavigation();

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

    const formattedDate = formatDate(updateAt);

    const notePressHandler = () => {
        navigate.navigate('NotesInsideFolder', {
            folderId: id,
        });
    };

    return (
        <Pressable
            onPress={notePressHandler}
            style={({ pressed }) => [
                styles.container,
                pressed && styles.pressed,
            ]}>
            <View style={styles.content}>
                <View style={styles.textContainer}>
                    <Text style={styles.folderName}>{name}</Text>
                    <View style={styles.detailsContainer}>
                        <View style={styles.noteCount}>
                            <Text style={styles.noteCountText}>
                                {noteIds.length} notes
                            </Text>
                        </View>
                        <Text style={styles.date}>{formattedDate}</Text>
                    </View>
                </View>
                <View style={styles.iconContainer}>
                    <Ionicons
                        name='chevron-forward'
                        size={40}
                        color='gray'
                    />
                </View>
            </View>
        </Pressable>
    );
}

export default FolderItem;

const styles = StyleSheet.create({
    container: {
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
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    textContainer: {
        flex: 1,
    },
    folderName: {
        fontSize: 16,
        marginBottom: 8,
    },
    detailsContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    noteCount: {
        paddingHorizontal: 8,
        paddingVertical: 4,
    },
    noteCountText: {
        color: 'lightseagreen',
        fontWeight: 'bold',
    },
    date: {
        color: 'gray',
        marginLeft: 8,
    },
    iconContainer: {
        marginLeft: 16,
        justifyContent: 'center',
    },
    pressed: {
        opacity: 0.5,
    },
});
