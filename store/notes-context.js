import { createContext, useReducer } from 'react';
import { NOTES } from '../data/dummy-data';

export const NotesContext = createContext({
    notes: [],
    filteredNotes: [],
    addNote: ({ content, updateAt }) => {},
    deleteNote: (id) => {},
    updateNote: (
        id,
        { color, labelIds, content, updateAt, isBookmarked }
    ) => {},
});

function notesReducer(state, action) {
    switch (action.type) {
        case 'ADD':
            const id = new Date().toString() + Math.random().toString();
            return [{ ...action.payload, id: id }, ...state];
        case 'UPDATE':
            const updatableNoteindex = state.findIndex(
                (note) => note.id === action.payload.id
            );
            const updatableNote = state[updatableNoteindex];
            const updatedItem = {
                ...updatableNote,
                ...action.payload.data,
            };
            const updatedNotes = [...state];
            updatedNotes[updatableNoteindex] = updatedItem;
            return updatedNotes;
        case 'DELETE':
            return state.filter((note) => note.id !== action.payload);
        default:
            return state;
    }
}

function NotesContextProvider({ children }) {
    const [notesSate, dispatch] = useReducer(notesReducer, NOTES);

    function addNote(noteData) {
        dispatch({ type: 'ADD', payload: noteData });
    }

    function deleteNote(id) {
        dispatch({ type: 'DELETE', payload: id });
    }

    function updateNote(id, noteData) {
        dispatch({ type: 'UPDATE', payload: { id: id, data: noteData } });
    }

    const value = {
        notes: notesSate,
        addNote: addNote,
        deleteNote: deleteNote,
        updateNote: updateNote,
    };

    return (
        <NotesContext.Provider value={value}>
            {children}
        </NotesContext.Provider>
    );
}
export default NotesContextProvider;
