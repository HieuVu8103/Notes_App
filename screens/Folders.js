import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import Header from '../components/layouts/Header';
import FoldersOutput from '../components/FolderOutput/FoldersOutput';
import { FOLDERS } from '../data/dummy-data';

function Folders() {
    return (
        <>
            <Header title='Folder' style={styles.safeArea} />
            <FoldersOutput folders={FOLDERS}/>
        </>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    }
});

export default Folders;
