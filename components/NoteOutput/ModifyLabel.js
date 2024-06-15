import { View, TextInput } from 'react-native';
import { useState } from 'react';
import { StyleSheet, Button } from 'react-native';

function ModifyLabel({ label, onLabelChange, onDeleteLabel }) {
    const [text, setText] = useState(label.label);

    const handleChange = (newText) => {
        setText(newText);
    };

    return (
        <View style={styles.container}>
            <TextInput
                value={text}
                onChangeText={handleChange}
                placeholder='Replace text...'
                style={styles.inputText}
            />
            <View style={styles.buttonContainer}>
                <Button
                    onPress={() => onLabelChange(label.id, text)}
                    title='Save'
                    color='#007bff'
                />
                <Button
                    onPress={() => onDeleteLabel(label.id)}
                    title='Delete'
                    color='#dc3545'
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        width: '70%',
        paddingVertical: 20,
        paddingHorizontal: 20,
        height: 120,
        shadowColor: 'grey',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    inputText: {
        fontSize: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
    },
});

export default ModifyLabel;
