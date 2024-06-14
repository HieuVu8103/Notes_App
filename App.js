import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { StyleSheet, View } from 'react-native';

import Home from './screens/Home';
import Labels from './screens/Labels';
import Folders from './screens/Folders';
import Trash from './screens/Trash';
import NewNote from './screens/NewNote';
import EditNote from './screens/EditNote';
import ManageLabels from './screens/ManageLabels';
import IconButton from './components/UI/IconButtonn';
import NotesContextProvider from './store/notes-context';
import { SafeAreaView } from 'react-native-safe-area-context';
import TrashNote from './components/TrashNote/TrashNote';
import NotesInFolder from './screens/NotesInFolder';
import NotesWithFolder from './screens/NotesWithFolder';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function NotesApp({ navigation }) {
    return (
        <SafeAreaView style={{ flex: 1, position: 'relative' }}>
            <Drawer.Navigator
                screenOptions={{
                    headerShown: false,
                }}>
                <Drawer.Screen
                    name='Notes'
                    component={Home}
                />
                <Drawer.Screen
                    name='Labels'
                    component={Labels}
                />
                <Drawer.Screen
                    name='Folders'
                    component={FolderStack}
                />
                <Drawer.Screen
                    name='Trash'
                    component={Trash}
                />
            </Drawer.Navigator>
        </SafeAreaView>
    );
}

export default function App() {
    return (
        <>
            <StatusBar style='auto' />
            <NotesContextProvider>
                <NavigationContainer>
                    <Stack.Navigator>
                        <Stack.Screen
                            name='Notes App'
                            component={NotesApp}
                            options={{
                                headerShown: false,
                            }}
                        />
                        <Stack.Screen
                            name='New Note'
                            component={NewNote}
                            options={{ presentation: 'modal' }}
                        />
                        <Stack.Screen
                            name='Edit Note'
                            component={EditNote}
                        />
                        <Stack.Screen
                            name='Trash Note'
                            component={TrashNote}
                        />
                        <Stack.Screen
                            name='Manage Labels'
                            component={ManageLabels}
                        />
                    </Stack.Navigator>
                </NavigationContainer>
            </NotesContextProvider>
        </>
    );
}

function FolderStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name='Folders stack'
                component={Folders}
                options={{ headerShown: false, title: 'folders' }}
            />
            <Stack.Screen
                name='NotesInFolder'
                component={NotesInFolder}
                options={{ headerShown: true, title: null }}
            />

            <Stack.Screen
                name='Notes with folder'
                component={NotesWithFolder}
                options={{ title: 'Notes' }}
            />
        </Stack.Navigator>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    addButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
    },
});
