'use strict';
import { createContext } from 'react';

export const trashContext = createContext();

function NotesContextProvider({ children }) {
    return (
        <NotesContext.Provider
            value={{
                type: trash,
            }}>
            {children}
        </NotesContext.Provider>
    );
}
export default NotesContextProvider;
