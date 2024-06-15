import { createContext, useReducer } from 'react';
import { NOTES, TRASH, LABELS, FOLDERS } from '../data/dummy-data';
import Folder from '../models/folder';

function randomString() {
    const characters =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let result = '';
    for (let i = 0; i < 50; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
    }
    return result;
}

export const NotesContext = createContext();
const noteStates = {
    notes: NOTES,
    labels: LABELS,
    trash: TRASH,
    folders: FOLDERS,
};

function notesReducer(state, action) {
    switch (action.type) {
        case 'ADD': {
            const id = randomString();
            return {
                ...state,
                notes: [
                    { ...action.payload, id: id, labelIds: [] },
                    ...state.notes,
                ],
            };
        }

        case 'UPDATE': {
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
        }

        case 'DELETE': {
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
        }

        case 'RESTORE': {
            state.notes = [...state.notes, action.payload.note];
            return {
                ...state,
                trash: state.trash.filter(
                    (n) => n.id != action.payload.note.id
                ),
            };
        }

        case 'DELETE_FORRVER': {
            return {
                ...state,
                trash: state.trash.filter(
                    (n) => n.id != action.payload.id
                ),
            };
        }

        case 'CREATE_FOLDER': {
            const name = action.payload;
            state.folders.push(
                new Folder(
                    randomString(),
                    name,
                    [],
                    Date.now(),
                    Date.now()
                )
            );
            return {
                ...state,
            };
        }

        case 'ADD_NOTE_TO_FOLDER': {
            const { noteId, folderId } = action.payload;
            state.folders.forEach((f) => {
                if (f.id !== folderId) {
                    return;
                }

                f.noteIds.push(noteId);
                return;
            });

            return { ...state };
        }

        case 'REMOVE_NOTE_TO_FOLDER': {
            const { noteId, folderId } = action.payload;
            state.folders.forEach((f) => {
                if (f.id !== folderId) {
                    return;
                }

                f.noteIds = f.noteIds.filter((i) => i !== noteId);

                return;
            });

            return { ...state };
        }

        case 'ADD_LABEL': {
            const id = randomString();
            return {
                ...state,
                labels: [
                    ...state.labels,
                    {
                        id,
                        label: action.payload,
                    },
                ],
            };
        }

        case 'UPDATE_LABEL': {
            const udatedLabels = state.labels.map((l) => {
                if (l.id === action.payload.id) {
                    console.log(action.payload.content);
                    return {
                        id: l.id,
                        label: action.payload.content,
                    };
                }

                return l;
            });

            return {
                ...state,
                labels: udatedLabels,
            };
        }

        case 'DELETE_LABEL': {
            console.log(action.payload);
            return {
                ...state,
                labels: state.labels.filter(
                    (label) => label.id !== action.payload
                ),
            };
        }

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

    function createFolder(name) {
        dispatch({ type: 'CREATE_FOLDER', payload: name });
    }

    function addNoteToFolder({ folderId, noteId }) {
        dispatch({
            type: 'ADD_NOTE_TO_FOLDER',
            payload: { noteId, folderId },
        });
    }

    function removeNoteFromFolder({ folderId, noteId }) {
        dispatch({
            type: 'REMOVE_NOTE_TO_FOLDER',
            payload: { noteId, folderId },
        });
    }

    function addLabel({ content }) {
        dispatch({
            type: 'ADD_LABEL',
            payload: content,
        });
    }

    function updateLabel({ id, content }) {
        dispatch({
            type: 'UPDATE_LABEL',
            payload: {
                id,
                content,
            },
        });
    }

    function deleteLabel({ id }) {
        dispatch({
            type: 'DELETE_LABEL',
            payload: id,
        });
    }

    const value = {
        notes: notesSate.notes,
        trash: notesSate.trash,
        labels: notesSate.labels,
        folders: noteStates.folders,
        addNote: addNote,
        deleteNote: deleteNote,
        updateNote: updateNote,
        restoreNote,
        deleteForever,
        addNoteToFolder,
        removeNoteFromFolder,
        createFolder,
        addLabel,
        updateLabel,
        deleteLabel,
    };

    return (
        <NotesContext.Provider value={value}>
            {children}
        </NotesContext.Provider>
    );
}
export default NotesContextProvider;
