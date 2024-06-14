import { View, StyleSheet } from "react-native";
import FoldersSumary from "./FoldesSumary";
import FoldersList from "./FoldersList";


function FoldersOutput({folders}) {
    return(
        <View style={styles.container}>
            <FoldersSumary folders={folders}/>
            <FoldersList folders={folders}/>
        </View>
    )
}

export default FoldersOutput;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});