import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';

const SettingsScreen = () => {
  return (
    <View>
      <TouchableOpacity>
        <Text style={style.main_Header}>Database Settings</Text>
      </TouchableOpacity>
    </View>
  );
};

const style = StyleSheet.create({
  main_Header: {
    fontSize: 14,
    fontWeight: '700',
  },
});

export default SettingsScreen;
