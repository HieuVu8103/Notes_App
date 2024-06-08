import * as React from 'react';
import NotesOutput from '../components/NoteOutput/NotesOutput';
import { useNavigation } from '@react-navigation/native';
import Header from '../components/layouts/Header';
import { NOTES } from '../data/dummy-data';

function Home() {
    const navigation = useNavigation();
    const [notes, setNotes] = React.useState(NOTES);

    const filterNote = (query) => {
        const filteredNotes = NOTES.filter((note) =>
            note.content.toLowerCase().includes(query.toLowerCase())
        );
        setNotes(filteredNotes);
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
        <>
            <Header
                isHome
                title='Notes'
                filterNote={filterNote}
            />
            <NotesOutput notes={notes} />
        </>
    );
}

export default Home;
