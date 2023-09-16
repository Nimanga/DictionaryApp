import { View, Text, Button, StyleSheet ,TouchableOpacity } from 'react-native'
import React from 'react'
import {  TextInput } from 'react-native-gesture-handler'
import MainFlatList from '../components/mainFlatList'
import DirectionBtn from '../components/directionBtn'
import SearchComponent from '../components/searchComponent'
// import TestDb from './testDb'




const HomeScreen = () => {
  return (
    <>
    <View style={style.mainView}>
     <View style={style.View}>
       <TextInput placeholder='Search for definition' style={style.textInput} />
       <Button title='Search' />
     </View>
    </View>
    <DirectionBtn/>
    {/* <TestDb/> */}
    <SearchComponent/>
    <MainFlatList/>
  

    </>
  )
}

const style = StyleSheet.create({
  View: {
    flex:1,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center'
    
    
  },
  textInput:{
    height:40,
    width: 220,
    borderColor:'gray',
    borderColor: 'gray', 
    borderWidth: 1,
    margin: 10,
    padding: 10,
    borderRadius: 10,
    textAlign:'center'
  },
  mainView:{
    height:100
  }
})

export default HomeScreen