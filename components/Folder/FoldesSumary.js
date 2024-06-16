import { View, Text, StyleSheet } from 'react-native';

function FoldersSumary({ folders }) {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{folders.length} folders </Text>
        </View>
    );
}

export default FoldersSumary;

const styles = StyleSheet.create({
    container: {
        padding: 8,
    },
    text: {
        color: 'lightseagreen',
        fontWeight: 'bold',
    },
});
