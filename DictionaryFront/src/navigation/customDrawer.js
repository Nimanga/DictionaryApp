import {View, Text, Image, StatusBar} from 'react-native';
import React from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import logo from '../assets/images/logo5.png';

const CustomDrawer = props => {
  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: '#081348',
          height: 120,
        }}>
        <Image
          source={logo}
          style={{width: 76, height: 76, marginStart: 15, marginTop: 20}}
        />
        <View style={{flex: 1, justifyContent: 'center'}}>
          <Text
            style={{
              padding: 15,
              fontSize: 18,
              color: '#ffffff',
              fontFamily: 'Roboto-Bold',
              fontWeight: '800',
              flexWrap: 'wrap',
            }}>
            ENGLISH-SINHALA DICTIONARY
          </Text>
        </View>
      </View>

      <View style={{flex: 1}}>
        <DrawerContentScrollView
          {...props}
          contentContainerStyle={{backgroundColor: '#3C598E'}}>
          <View
            style={{
              backgroundColor: '#ffffff',
              flex: 1,
              gap: 5,
              paddingTop: 25,
            }}>
            <DrawerItemList {...props} />
          </View>
        </DrawerContentScrollView>
      </View>
    </>
  );
};

export default CustomDrawer;
