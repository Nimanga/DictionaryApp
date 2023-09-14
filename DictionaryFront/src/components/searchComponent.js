import React,{useState} from "react";
import { Button, View , Text} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import SQLite from 'react-native-sqlite-storage';

const SearchComponent = ()=>{
    const [inputValue , setInputValue] = useState('');
    // const [definition, setDefinition] = useState(null);
    const [definition , setDefinition] = useState([]);
    // const [words, setWords] = useState([]);

    const db = SQLite.openDatabase({
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
  console.log('HandleSearch')
   await db.transaction((tx) => {
     tx.executeSql(
        'SELECT definition FROM enWords WHERE word = ?',
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
  };

      
    // console.log(definition);
    return(
        <View>
        <TextInput
          placeholder="Search a Word"
          value={inputValue}
          onChangeText={setInputValue} // This updates the searchTerm state as you type
        />
        <Button title="Search" onPress={handleSearch} />
  
        <View>
          {definition !== null ? (
            definition.map((definition, index) => (
              <Text key={index}>{definition}</Text>
            ))
          ) : (
            <Text>No definitions available</Text>
          )}
        </View>
    
      </View>
    
    )
}

export default SearchComponent;