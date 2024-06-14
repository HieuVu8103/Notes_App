import { View, Text } from 'react-native';
import Header from '../components/layouts/Header';
import FoldersOutput from '../components/FolderOutput/FoldersOutput';
import { FOLDERS } from '../data/dummy-data';

function Folders() {
    return (
        <>
            <Header title='Folder' />
            <FoldersOutput folders={FOLDERS}/>
        </>
    );
}

export default Folders;
