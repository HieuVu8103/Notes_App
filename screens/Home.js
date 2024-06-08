import { View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import NotesOutput from "../components/NoteOutput/NotesOutput";
import IconButton from "../components/UI/IconButtonn";

function Home() {
    const navigation = useNavigation();

    return (
        <>
        <NotesOutput/>  
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