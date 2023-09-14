import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-reanimated';
import AppDrawer from './src/navigation/appDrawer';



const Drawer = createDrawerNavigator();

function App() {
  return (

    <NavigationContainer>
      <AppDrawer/>
    </NavigationContainer>

  );
}

export default App;
