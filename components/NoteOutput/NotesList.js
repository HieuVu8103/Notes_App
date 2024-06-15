import { FlatList } from 'react-native';
import NoteItem from './NoteItems';

function renderNoteItem(itemData) {
    return;
}

function NotesList({ notes, type, folderId }) {
    return (
        <FlatList
            data={notes}
            renderItem={({ item }) => (
                <NoteItem
                    type={type}
                    {...item}
                    folderId={folderId}
                />
            )}
            keyExtractor={(item) => item.id}
        />
    );
}

export default NotesList;
