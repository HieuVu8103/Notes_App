import { useNavigation, useRoute } from '@react-navigation/native';
import { View, Text } from 'react-native';

function ManageLabels() {
    const navigation = useNavigation();
    const route = useRoute();
    const { note } = route.params;
    console.log(note);

    return <Text>Manage Labels</Text>;
}

export default ManageLabels;
