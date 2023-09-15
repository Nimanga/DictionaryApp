import React,{useState} from "react";
import { Button, View , Text , StyleSheet} from "react-native";
import { TextInput ,TouchableOpacity } from "react-native-gesture-handler";
import SQLite from 'react-native-sqlite-storage';


const SearchComponent =  ({onPressSearch})=>{
    const [inputValue , setInputValue] = useState('');
    // const [definition, setDefinition] = useState(null);
    const [definition , setDefinition] = useState([]);
    // const [words, setWords] = useState([]);

    const db =  SQLite.openDatabase({
        name:'dictionaryData.db',
      },
      ()=>{
        console.log('Database connected');
      },
      (error)=>{
        console,log('Database Error', error);
      }
      );


const handleSearch = async() => {

  const isSinhala = !/^[a-zA-Z0-9\s]*$/.test(inputValue)

  console.log('handleEnSearch')


   await db.transaction((tx) => {
    const sqlQuery = !isSinhala?
    'SELECT definition FROM enWords WHERE word = ?'
    :'SELECT definition FROM snWords WHERE word = ?'

     tx.executeSql(
      sqlQuery,
        [inputValue],
        (tx, results) => {
          if (results.rows.length > 0) {
            const definitions = results.rows.item(0).definition;
            setDefinition(JSON.parse(definitions));
          } else {
            console.log('No definitions found for', searchTerm);
          }
        },
        (error) => {
          console.log('Error searching:', error);
        }
      );
    });
    onPressSearch();
  };

    return(
        <View>
          <View style={style.View}>
           <TextInput style={style.textInput}
             placeholder="Search a Word"
             value={inputValue}
             onChangeText={setInputValue} // This updates the searchTerm state as you type
           />
          <TouchableOpacity onPress={handleSearch}>
            <Text>Search</Text>
          </TouchableOpacity>
         </View>
         <View>
          {definition !== null ? (
            definition.map((definition, index) => (
              <Text style={{color:'#333333'}} key={index}>{definition}</Text>
            ))
          ) : (
            <Text>No definitions available</Text>
          )}
        </View>
    
      </View>
    
    )
}

const style =StyleSheet.create({
  View: {
    flexDirection:'row',
    alignItems:'center',
    marginStart:22,
    marginEnd:30,
    gap:20,
    width:'auto',
  },
  textInput:{
    height:40,
    width: 200,
    borderColor:'gray',
    borderColor: 'gray', 
    borderWidth: 1,
    margin: 10,
    padding: 10,
    borderRadius: 10,
    textAlign:'center',
    color:'#333333'
  },
})

export default SearchComponent;