import React, {useState} from 'react';
import {Button, View, Text, StyleSheet, Image, FlatList} from 'react-native';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import SQLite from 'react-native-sqlite-storage';

const SearchComponent = ({onPressSearch, onPressClear}) => {
  const [inputValue, setInputValue] = useState('');
  const [definition, setDefinition] = useState([]);
  const [historyWord, setHistoryWord] = useState('');
  // const [searchPressed, setSearchPressed] = useState(false);

  const db = SQLite.openDatabase(
    {
      name: 'dictionaryData.db',
    },
    () => {
      console.log('Database connected');
    },
    error => {
      console, log('Database Error', error);
    },
  );

  const handleSearch = () => {
    const isSinhala = !/^[a-zA-Z0-9\s]*$/.test(inputValue);

    console.log('handleEnSearch');

    db.transaction(tx => {
      const sqlQuery = !isSinhala
        ? 'SELECT definition FROM enWords WHERE word = ?'
        : 'SELECT definition FROM snWords WHERE word = ?';

      tx.executeSql(
        sqlQuery,
        [inputValue.toLowerCase()],
        (tx, results) => {
          if (results.rows.length > 0) {
            const definitions = results.rows.item(0).definition;
            setDefinition(JSON.parse(definitions));
          } else {
            console.log('No definitions found for', searchTerm);
          }
        },
        error => {
          console.log('Error searching:', error);
        },
      );
    });
    setHistoryWord([inputValue]);
    onPressSearch();
  };

  const clearInput = () => {
    setInputValue('');
    onPressClear();
    // setDefinition([]);
  };

  return (
    <View>
      <View style={style.View}>
        <TextInput
          style={style.textInput}
          placeholder="Search a Word"
          placeholderTextColor="#000000"
          value={inputValue}
          onChangeText={setInputValue} // This updates the searchTerm state as you type
        />

        <TouchableOpacity
          onPress={handleSearch}
          style={{backgroundColor: '#3C598E', padding: 10, borderRadius: 10}}>
          <Text style={{color: '#ffffff'}}>SEARCH</Text>
        </TouchableOpacity>
      </View>

      <View>
        <View>
          <View>
            <Text style={{color: '#000000', fontWeight: '400'}}>
              Recent Search Word :
            </Text>
            <View>
              <Text
                style={{
                  backgroundColor: '#324B77',
                  color: '#ffffff',
                  marginTop: 12,
                  paddingStart: 140,
                  marginBottom: 1,
                  marginStart: 12,
                  marginEnd: 12,
                  padding: 7,
                  borderRadius: 10,
                  fontWeight: 600,
                  fontSize: 17,
                }}>
                {historyWord}
              </Text>
            </View>
          </View>

          <FlatList
            data={definition}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (
              <Text
                style={{
                  padding: 7,
                  margin: 10,
                  backgroundColor: '#486baa',
                  borderRadius: 10,
                  marginStart: 12,
                  marginEnd: 12,
                  paddingStart: 15,
                  color: '#ffffff',
                }}>
                {item}
              </Text>
            )}
            ListEmptyComponent={<Text></Text>}
          />
        </View>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  View: {
    flexDirection: 'row',
    alignItems: 'center',
    marginStart: 22,
    marginEnd: 30,
    gap: 10,
    width: 'auto',
  },
  textInput: {
    height: 40,
    width: 200,
    borderColor: 'gray',
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
    padding: 10,
    borderRadius: 10,
    textAlign: 'center',
    color: '#333333',
    fontSize: 15,
  },
});

export default SearchComponent;
