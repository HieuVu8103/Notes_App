import { View, Text } from 'react-native';
import Header from '../components/layouts/Header';
import Folder from '../components/Folder';
import { FOLDERS } from '../data/dummy-data';

function FolderScreen() {
    return (
        <>
            <Header title='Folder' />
            <Folder folders={FOLDERS} />
        </>
    );
}

export default FolderScreen;
