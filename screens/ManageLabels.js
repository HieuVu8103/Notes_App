import React, { useContext, useState, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { NotesContext } from "../store/notes-context";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { LABELS } from "../data/dummy-data";
import { Button } from "react-native";

function ManageLabels() {
  const navigation = useNavigation();
  const route = useRoute();
  const noteId = route.params.note.id;
  const notesContext = useContext(NotesContext);
  const note = notesContext.notes.find((note) => note.id === noteId);
  const [chosenLabels, setChosenLabels] = useState(note.labelIds);

  function handleLabel(labelId) {
    setChosenLabels((prev) => {
      let updatedLabels;
      if (prev.includes(labelId)) {
        updatedLabels = prev.filter((id) => id !== labelId);
      } else {
        updatedLabels = [...prev, labelId];
      }
      return updatedLabels;
    });
  }

  function pushLabel() {
    const updatedLabels = chosenLabels.filter(labelId => LABELS.some(label => label.id === labelId));
    notesContext.updateNote(noteId, { labelIds: updatedLabels });
    navigation.navigate('Notes');
  }

  useEffect(() => {
    const labelsToRemove = note.labelIds.filter(labelId => !chosenLabels.includes(labelId));
    if (labelsToRemove.length > 0) {
      notesContext.updateNote(noteId, { labelIds: chosenLabels });
    }
  }, []);

  const renderLabelItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.labelContainer,
        chosenLabels.includes(item.id) && styles.labelContainerChosen,
      ]}
      onPress={() => handleLabel(item.id)}
    >
      <Text style={styles.labelText}>{item.label}</Text>
    </TouchableOpacity>
  );

  return (
    <>
      <View>
        <TextInput style={styles.input} placeholder="Search Labels" />
      </View>
      <View style={styles.container}>
        <FlatList
          data={LABELS}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderLabelItem}
          numColumns={3}
        />
      </View>
        <View style={styles.button} >
          <Button onPress={pushLabel} title="Confirm" />
        </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f0f0f0",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  labelContainer: {
    flex: 1,
    backgroundColor: "skyblue",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    margin: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  labelContainerChosen: {
    backgroundColor: "blue",
  },
  labelText: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
  },
  button: {
    marginBottom: 30,
  }
});

export default ManageLabels;
