import {View, Text, Button, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import MainFlatList from '../components/mainFlatList';
import SearchComponent from '../components/searchComponent';

const HomeScreen = () => {
  const [isMainFlatListEnable, setIsFlatListEnable] = useState(true);

  const onPressSearch = () => {
    setIsFlatListEnable(false);
  };
  const onPressClear = () => {
    setIsFlatListEnable(true);
  };
  return (
    <>
      <View
        style={{
          flex: 1,
          gap: 20,
          marginTop: 30,
          marginStart: 15,
          marginEnd: 20,
        }}>
        <SearchComponent
          onPressSearch={onPressSearch}
          onPressClear={onPressClear}
        />
        {isMainFlatListEnable && <MainFlatList />}
      </View>
    </>
  );
};

const style = StyleSheet.create({
  View: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    height: 40,
    width: 220,
    borderColor: 'gray',
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
    padding: 10,
    borderRadius: 10,
    textAlign: 'center',
  },
  mainView: {
    height: 100,
  },
});

export default HomeScreen;
