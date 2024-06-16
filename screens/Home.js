import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import NotesOutput from '../components/NoteOutput/NotesOutput';
import Header from '../components/layouts/Header';
import IconButton from '../components/UI/IconButtonn';
import { NotesContext } from '../store/notes-context';

function Home() {
    const navigation = useNavigation();
    const notesCtx = React.useContext(NotesContext);
    const [query, setQuery] = React.useState('');
    const filterNote = (query = '') => {
        const filteredNotes = notesCtx.notes.filter((note) =>
            note.content.toLowerCase().includes(query.toLowerCase())
        );
        return filteredNotes;
    };

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerLargeTitle: true,
            headerSearchBarOption: {
                placeHolder: 'Type here...',
            },
        });
    }, [navigation]);

    return (
        <View style={[styles.container]}>
            <Header
                isHome
                title='Notes'
                setQuery={setQuery}
            />

            <NotesOutput
                query={query}
                notes={query !== '' ? filterNote(query) : notesCtx.notes}
                fallbackText='No note created. Please click + button to add one!'
            />

            <View>
                <IconButton
                    style={styles.addButton}
                    icon={'add-circle'}
                    size={70}
                    color='skyblue'
                    onPress={() => navigation.navigate('New Note')}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    addButton: {
        position: 'absolute',
        bottom: 0,
        right: 20,
    },
});

export default Home;
