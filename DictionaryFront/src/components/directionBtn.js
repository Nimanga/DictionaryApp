import { View, Text, StyleSheet } from 'react-native'
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useState } from 'react';


const DirectionBtn = ({changeEnData, changeSnData}) => {

    const [activeBtn , setActiveBtn] = useState(false);

    const handlePress = (value) =>{
        setActiveBtn(value);
        if(value){
            changeSnData();
        }else{
            changeEnData();
        }
        // to be implement data display
    }

  return (
    <View style={styles.btn}>
        <TouchableOpacity onPress={()=> handlePress(false)}>
            <Text style={[activeBtn === false ? styles.text : null, {fontSize:16, fontWeight:800}]} >
                ENGLISH
            </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=> handlePress(true)}>
            <Text style={[activeBtn === true ? styles.text : null, {fontSize:16, fontWeight:800}]} >
                SINHALA
            </Text>
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
 text: {
    // textDecorationLine: 'underline',
    backgroundColor:'#324B77',
    padding:8,
    paddingStart:20,
    paddingEnd:20,
    borderRadius:10,
    color:'#ffffff'

 },
 btn: {
    flexDirection: 'row',
    // width: '100%',
    justifyContent: 'center', // Align button content horizontally
    alignItems: 'center', // Align button content vertically
    backgroundColor: '#B2CAF6',
    padding: 6,
    margin:5,
    borderRadius: 8,
    marginStart:25,
    marginEnd:25,
    gap:100,
  },

})


export default DirectionBtn