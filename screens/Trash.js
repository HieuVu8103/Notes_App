import Header from '../components/layouts/Header';
import NotesOutput from '../components/NoteOutput/NotesOutput';
import TrashActions from '../components/TrashNote/TrashActions';
import { useNavigation } from '@react-navigation/native';
import { NotesContext } from '../store/notes-context';
import { useContext } from 'react';
import { View, StyleSheet } from 'react-native';

function Trash() {
  const navigation = useNavigation();
  const notesCtx = useContext(NotesContext);

  return (
    <>
      <Header title="Trash" />
      <View style={styles.container}>
        <TrashActions style={styles.container}/>
        <NotesOutput
            notes={notesCtx.trash}
            fallbackText="There is no deleted note"
            type="trash"
            tab="in trash"
        />
      </View>
    </>
  );
}

export default Trash;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    button: {
        color: 'black'
    }
})

