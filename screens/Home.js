import * as React from "react";
import NotesOutput from "../components/NoteOutput/NotesOutput";
import { useNavigation } from "@react-navigation/native";

function Home() {
    const navigation = useNavigation();

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerLargeTitle: true,
            headerSearchBarOption: {
                placeHolder: "Type here..."
            }
        })
    }, [navigation])
    return (
        <NotesOutput/>       
    );
};

export default Home;