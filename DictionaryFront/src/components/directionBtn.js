import {View, Text, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useState} from 'react';

const DirectionBtn = ({changeEnData, changeSnData}) => {
  const [activeBtn, setActiveBtn] = useState(false);

  const handlePress = value => {
    setActiveBtn(value);
    if (value) {
      changeSnData();
    } else {
      changeEnData();
    }
    // to be implement data display
  };

  return (
    <View style={styles.btn}>
      <TouchableOpacity onPress={() => handlePress(false)}>
        <Text
          style={[
            !activeBtn
              ? styles.text
              : {fontSize: 16, fontWeight: 800, color: '#000000'},
          ]}>
          ENGLISH
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handlePress(true)}>
        <Text
          style={[
            activeBtn
              ? styles.text
              : {fontSize: 16, fontWeight: 800, color: '#000000'},
          ]}>
          SINHALA
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    // textDecorationLine: 'underline',
    backgroundColor: '#324B77',
    padding: 1,
    paddingStart: 15,
    paddingEnd: 15,
    margin: 8,
    borderRadius: 5,
    color: '#ffffff',
    fontSize: 15,
  },
  btn: {
    flexDirection: 'row',
    // width: '100%',
    justifyContent: 'center', // Align button content horizontally
    alignItems: 'center', // Align button content vertically
    backgroundColor: '#7b9edd',
    padding: 3,
    borderRadius: 8,
    marginStart: 25,
    marginEnd: 25,
    gap: 100,
  },
});

export default DirectionBtn;
