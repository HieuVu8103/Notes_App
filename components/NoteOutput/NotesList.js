import { FlatList } from 'react-native';
import NoteItem from './NoteItems';

function renderNoteItem(itemData) {
    return;
}

function NotesList({ notes, type }) {
    return (
        <FlatList
            data={notes}
            renderItem={({ item }) => (
                <NoteItem
                    type={type}
                    {...item}
                />
            )}
            keyExtractor={(item) => item.id}
        />
    );
}

export default NotesList;
