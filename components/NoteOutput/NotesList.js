import { FlatList } from "react-native";
import NoteItem from "./NoteItems";

function renderNoteItem(itemData) {
    return(
        <NoteItem {...itemData.item}/>
    )
}

function NotesList({notes}) {
    return <FlatList 
        data={notes} 
        renderItem={renderNoteItem} 
        keyExtractor={(item) => item.id}/>
}

export default NotesList;