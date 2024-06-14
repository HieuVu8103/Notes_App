import { FlatList } from "react-native";
import FolderItem from "./FolderItem";

function FoldersList({folders}) {
    return(
        <FlatList
            data={folders}
            renderItem={({ item }) => (
                <FolderItem
                    {...item}
                />
            )}
            keyExtractor={(item) => item.id}
        />
    )
}

export default FoldersList;