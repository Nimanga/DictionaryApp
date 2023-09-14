import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import homeScreen from "../screens/homeScreen";
import contactScreen from "../screens/contactScreen";
import AboutScreen from "../screens/aboutScreen";
import HelpScreen from "../screens/helpScreen";
import SettingsScreen from "../screens/settingsScreen";
import CustomDrawer from "./customDrawer";
import dicIcon from '../assets/images/book.png';
import contactIcon from '../assets/images/contact.png';
import settingsIcon from '../assets/images/settings.png';
import aboutIcon from '../assets/images/about.png';
import helpIcon from '../assets/images/help.png';
import { Image, StatusBar } from 'react-native';





const Drawer = createDrawerNavigator();

function AppDrawer() {
    return(
        <>
        <StatusBar backgroundColor='#5A86D5' />
        <Drawer.Navigator  screenOptions={{headerStyle:{backgroundColor:'#5A86D5'}, 
         headerTitleStyle:{color:'#ffffff',flex:1,}, headerStatusBarHeight:30,
         headerLeftContainerStyle:{marginBottom:25}}} drawerContent={props => <CustomDrawer {...props} />}>
           <Drawer.Screen name="Dictionary" component={homeScreen}
            options={{
                drawerIcon: ()=> (
                    <Image
                     source={dicIcon}
                     style={{width:25, height:25} }
                    />
                )
            }}
           />
           <Drawer.Screen name="Contact" component={contactScreen} 
             options={{
                drawerIcon: ()=> (
                    <Image
                     source={contactIcon}
                     style={{width:25, height:25} }
                    />
                )
            }}
           />
           <Drawer.Screen name="Settings" component={SettingsScreen}
             options={{
                drawerIcon: ()=> (
                    <Image
                     source={settingsIcon}
                     style={{width:25, height:25} }
                    />
                )
            }}
           />
           <Drawer.Screen name="About" component={AboutScreen}
             options={{
                drawerIcon: ()=> (
                    <Image
                     source={aboutIcon}
                     style={{width:25, height:25} }
                    />
                )
            }}
           />
           <Drawer.Screen name="Help" component={HelpScreen} 
             options={{
                drawerIcon: ()=> (
                    <Image
                     source={helpIcon}
                     style={{width:25, height:25} }
                    />
                )
            }}
           />
        </Drawer.Navigator>
        </>
    )
}



export default AppDrawer;