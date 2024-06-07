import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from './screens/Home';
import Labels from './screens/Labels';
import Folders from './screens/Folders';
import Trash from './screens/Trash';
import NewNote from './screens/NewNote';
import EditNote from './screens/EditNote';
import ManageLabels from './screens/ManageLabels';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function NotesApp() {
  return(
    <Drawer.Navigator>
      <Drawer.Screen name="Notes" component={Home} />
      <Drawer.Screen name="Lables" component={Labels} />
      <Drawer.Screen name="Folders" component={Folders} />
      <Drawer.Screen name="Trash" component={Trash} />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen 
            name="Notes App" 
            component={NotesApp} 
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen name='New Note' component={NewNote}/>    
          <Stack.Screen name='Edit Note' component={EditNote}/>   
          <Stack.Screen name='Manage Labels' component={ManageLabels}/>   
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};
