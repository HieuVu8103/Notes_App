import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { NotesContext } from '../../store/notes-context';

const TrashActions = () => {
  const notesCtx = useContext(NotesContext);

  const restoreAllNotes = () => {
    notesCtx.trash.forEach((note) => notesCtx.restoreNote(note));
  };

  const deleteAllNotes = () => {
    notesCtx.trash.forEach((note) => notesCtx.deleteForever(note.id));
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.restoreButton} onPress={restoreAllNotes}>
        <Text style={styles.buttonText}>Restore</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.deleteButton} onPress={deleteAllNotes}>
        <Text style={styles.buttonText}>Empty</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginVertical: 10,
    marginHorizontal: 10
  },
  restoreButton: {
    backgroundColor: 'gray',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    // position: 'absolute',
    // top: 5,
    // right: 90
  },
  deleteButton: {
    backgroundColor: 'red',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    marginLeft: 5
    // position: 'absolute',
    // top: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default TrashActions;