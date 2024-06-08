import { View, StyleSheet, Text } from 'react-native';
import IconButton from '../UI/IconButton';
import { useNavigation } from '@react-navigation/native';
import SearchBar from '../UI/SearchBar';
import { useState } from 'react';

function Header({ title = 'Notes', isHome, filterNote }) {
    const navigation = useNavigation();
    const [isShownSearch, setIsShownSearch] = useState(false);

    return (
        <View style={styles.wrapper}>
            <IconButton
                style={styles.wrapper}
                icon={'menu-outline'}
                size={24}
                color='gray'
                onPress={() => navigation.openDrawer()}
            />

            <Text style={styles.title}>Notes</Text>

            {isHome && (
                <IconButton
                    style={styles.search}
                    icon={'search-outline'}
                    size={24}
                    color='gray'
                    onPress={() => setIsShownSearch(true)}
                />
            )}

            {isShownSearch && (
                <SearchBar
                    hiddenSearch={() => setIsShownSearch(false)}
                    filterNote={filterNote}
                />
            )}
        </View>
    );
}

export default Header;

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'row',
        alignContent: '',
        alignItems: 'center',
        backgroundColor: 'white',
        position: 'relative',
    },

    title: {
        fontSize: 16,
        fontWeight: 700,
    },

    search: {
        marginLeft: 'auto',
    },
});
