import { View, StyleSheet, Text } from 'react-native';
import IconButton from '../UI/IconButtonn';
import { useNavigation } from '@react-navigation/native';
import SearchBar from '../UI/SearchBar';
import { useState } from 'react';

function Header({ title = 'Notes', isHome, setQuery }) {
    const navigation = useNavigation();
    const [isShownSearch, setIsShownSearch] = useState(false);

    return (
        <View style={styles.wrapper}>
            <IconButton
                style={styles.wrapper}
                icon={'menu-outline'}
                size={30}
                color='gray'
                onPress={() => navigation.openDrawer()}
            />

            <Text style={styles.title}>{title}</Text>

            {isHome && (
                <IconButton
                    style={styles.search}
                    icon={'search-outline'}
                    size={24}
                    color='gray'
                    onPress={() => {
                        setIsShownSearch(true);
                    }}
                />
            )}

            {isShownSearch && (
                <SearchBar
                    hiddenSearch={() => {
                        setIsShownSearch(false);
                    }}
                    setQuery={setQuery}
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
        padding: 5,
    },

    title: {
        fontSize: 16,
    },

    search: {
        marginLeft: 'auto',
    },
});
