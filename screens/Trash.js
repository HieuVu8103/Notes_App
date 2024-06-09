import Header from '../components/layouts/Header';
import NotesOutput from '../components/NoteOutput/NotesOutput';
import { useNavigation } from '@react-navigation/native';
import { NotesContext } from '../store/notes-context';
import { useContext } from 'react';

function Trash() {
    const navigation = useNavigation();
    const notesCtx = useContext(NotesContext);
    console.log(notesCtx.trash);
    return (
        <>
            <Header title='Trash' />
            <NotesOutput
                notes={notesCtx.trash}
                fallbackText='No note created.
        Please click + button to add one!'
                type='trash'
            />
        </>
    );
}

export default Trash;
