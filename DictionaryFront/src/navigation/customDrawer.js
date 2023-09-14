import { View, Text } from 'react-native'
import React from 'react';
import { DrawerContentScrollView , DrawerItemList } from '@react-navigation/drawer';

const CustomDrawer = (props) => {
  return (

    <View style={{flex:1}}>
     <DrawerContentScrollView {...props} contentContainerStyle={{backgroundColor:'#3C598E',}}>
        <View style={{backgroundColor:'#3C598E'}}>
        <Text style={{padding:25,marginLeft:2, flex:1, flexDirection: 'column',  alignItems: 'center', 
          fontSize: 18, textAlign: 'center', color:'#ffffff',}}>ENGLISH-SINHALA DICTIONARY</Text>
        </View>
       
        <View style={{backgroundColor:'#ffffff' , flex:1, gap:5, paddingTop:20}}>
         <DrawerItemList {...props} />
        </View> 
     </DrawerContentScrollView>
   
    </View>
 )
}


export default CustomDrawer;