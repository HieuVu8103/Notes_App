import { View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import { NotesContext } from "../store/notes-context";

import NotesOutput from "../components/NoteOutput/NotesOutput";
import IconButton from "../components/UI/IconButtonn";


function Home() {
    const navigation = useNavigation();
    const notesCtx = useContext(NotesContext);



    return (
        <>
        <NotesOutput notes={notesCtx.notes} fallbackText="No note created. 
        Please click + button to add one!"/>  
        <View>
            <IconButton
                style={styles.addButton}
                icon={'add-circle'}
                size={70}
                color="skyblue"
                onPress={() => navigation.navigate('New Note')} 
            />   
        </View> 
        </>
    );
};

export default Home;

const styles = StyleSheet.create({
    addButton: {
      position: 'absolute',
      bottom: 20,
      right: 20,
    },
  });