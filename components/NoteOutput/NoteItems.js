import { Pressable, View, Text, StyleSheet } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { formatDistanceToNow, format } from 'date-fns';
import { LABELS } from "../../data/dummy-data";
import { useNavigation } from "@react-navigation/native";

function NoteItem({ id, color, labelIds = [], content, updateAt, isBookmarked }) {
    const labels = labelIds.map(labelId => {
        const label = LABELS.find(label => label.id === labelId);
        return label ? label.label : null;
    }).filter(Boolean);

    const formattedDate = formatDate(updateAt);
    const navigation = useNavigation();

    function notePressHanlder() {
        navigation.navigate("Edit Note")
    }

    return (
        <Pressable 
            onPress={notePressHanlder}
            style={({pressed})=> pressed && styles.pressed}
        >
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={[styles.dot, { backgroundColor: color }]} />
                    <Text style={styles.date}>{formattedDate}</Text>
                    {isBookmarked && (
                        <Ionicons name="bookmark" size={24} color="gray" />
                    )}
                </View>
                <View style={styles.labelsContainer}>
                    {labels.map((label, index) => (
                        <Text key={index} style={styles.label}>
                            {label}
                        </Text>
                    ))}
                </View>
                <Text style={styles.content}>{content}</Text>
            </View>
        </Pressable>
    );
}

const formatDate = (date) => {
    const now = new Date();
    const diffInHours = Math.abs(now - date) / (1000 * 60 * 60);
    if (diffInHours < 24) {
        return formatDistanceToNow(date, { addSuffix: true, includeSeconds: true }).replace('about ', '');
    } else {
        return format(date, 'dd/MM/yyyy');
    }
};

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
        opacity: 0.5
    }
});

export default NoteItem;
