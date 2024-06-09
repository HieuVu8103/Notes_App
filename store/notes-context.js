import { createContext, useReducer } from 'react';
import { NOTES, TRASH, LABELS } from '../data/dummy-data';

export const NotesContext = createContext();
const noteStates = {
    notes: NOTES,
    labels: LABELS,
    trash: TRASH,
};

function notesReducer(state, action) {
    switch (action.type) {
        case 'ADD':
            const id = new Date().toString() + Math.random().toString();
            return {
                ...state,
                notes: [
                    { ...action.payload, id: id, labelIds: [] },
                    ...state.notes,
                ],
            };
        case 'UPDATE':
            const updatedNotes = state.notes.map((note) => {
                if (note.id === action.payload.id) {
                    return {
                        ...note,
                        ...action.payload.data,
                        updateAt: Date.now(),
                    };
                }

                return note;
            });

            return {
                ...state,
                notes: updatedNotes,
            };
        case 'DELETE':
            const deletedNote = state.notes.find(
                (n) => n.id == action.payload
            );
            state.trash = [
                ...state.trash,
                {
                    ...deletedNote,
                    deletedAt: Date.now(),
                },
            ];
            return {
                ...state,
                trash: state.trash,
                notes: state.notes.filter(
                    (note) => note.id !== action.payload
                ),
            };
        case 'RESTORE':
            state.notes = [...state.notes, action.payload.note];
            return {
                ...state,
                trash: state.trash.filter(
                    (n) => n.id != action.payload.note.id
                ),
            };

        case 'DELETE_FORRVER':
            return {
                ...state,
                trash: state.trash.filter(
                    (n) => n.id != action.payload.id
                ),
            };
        default:
            return state;
    }
}

function NotesContextProvider({ children }) {
    const [notesSate, dispatch] = useReducer(notesReducer, noteStates);

    function addNote(noteData) {
        dispatch({ type: 'ADD', payload: noteData });
    }

    function deleteNote(id) {
        dispatch({ type: 'DELETE', payload: id });
    }

    function updateNote(id, noteData) {
        dispatch({ type: 'UPDATE', payload: { id: id, data: noteData } });
    }

    function restoreNote(note) {
        dispatch({ type: 'RESTORE', payload: { note } });
    }

    function deleteForever(id) {
        dispatch({ type: 'DELETE_FORRVER', payload: { id } });
    }

    const value = {
        notes: notesSate.notes,
        trash: notesSate.trash,
        addNote: addNote,
        deleteNote: deleteNote,
        updateNote: updateNote,
        restoreNote,
        deleteForever,
    };

    return (
        <NotesContext.Provider value={value}>
            {children}
        </NotesContext.Provider>
    );
}
export default NotesContextProvider;
