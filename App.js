import { StatusBar } from 'expo-status-bar';
import React, { useState, useRef } from 'react';
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
import SearchBar from './components/UI/SearchBar';
import NotesContextProvider from './store/notes-context';


const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function NotesApp({ navigation }) {
  return (
    <View style={{ flex: 1 }}>
      <Drawer.Navigator
        screenOptions={{
          headerTitleAlign: 'left',
          headerRight: () => (
            <IconButton
              icon={'search-outline'}
              size={24}
              color="gray"
              onPress={() => navigation.navigate('Search')}
            />
          ),
        }}
      >
        <Drawer.Screen name="Notes" component={Home} />
        <Drawer.Screen name="Labels" component={Labels} />
        <Drawer.Screen name="Folders" component={Folders} />
        <Drawer.Screen name="Trash" component={Trash} />
      </Drawer.Navigator>
    </View>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <NotesContextProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen 
              name="Notes App" 
              component={NotesApp} 
              options={{
                headerShown: false
              }}
            />
            <Stack.Screen name='New Note' component={NewNote} options={{presentation: 'modal'}}/>    
            <Stack.Screen name='Edit Note' component={EditNote}/>   
            <Stack.Screen name='Manage Labels' component={ManageLabels}/>   
          </Stack.Navigator>
        </NavigationContainer>
      </NotesContextProvider>
    </>
  );
};

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
