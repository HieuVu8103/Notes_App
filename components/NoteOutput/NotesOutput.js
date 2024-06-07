import { View } from "react-native";
import NotesSumary from "./NotesSumary";
import NotesList from "./NotesList";
import { NOTES } from "../../data/dummy-data";

function NotesOutput({notes}) {
    return(
        <View>
            <NotesSumary/>
            <NotesList notes={NOTES} />
        </View>
    );
}

export default NotesOutput