import React, {useState, useEffect} from 'react';
import {Button, View, Text, StyleSheet, Image, FlatList} from 'react-native';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import SQLite from 'react-native-sqlite-storage';

const SearchComponent = ({onPressSearch, onPressClear}) => {
  const [inputValue, setInputValue] = useState('');
  const [definition, setDefinition] = useState([]);
  const [noDefinition, setNoDefintion] = useState(false);

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

  const ClearResults = () => {
    setDefinition([]);
    setInputValue('');
  };

  useEffect(() => {
    if (inputValue === '') {
      ClearResults();
    }
  }, [inputValue]);

  const handleSearch = () => {
    setNoDefintion(true);
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
            console.log('If', definitions);
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
    // setHistoryWord([inputValue]);
    onPressSearch();
  };

  return (
    <View>
      <View style={style.View}>
        <TextInput
          style={style.textInput}
          placeholder="Search a Word"
          placeholderTextColor="#A9A9A9"
          value={inputValue}
          onChangeText={setInputValue} // This updates the searchTerm state as you type
          returnKeyType="search"
          onSubmitEditing={handleSearch}
        />

        <TouchableOpacity
          onPress={handleSearch}
          style={{
            backgroundColor: '#3C598E',
            padding: 10,
            borderRadius: 6,
            height: 40,
            fontFamily: 'Roboto-Black',
            fontWeight: '500',
          }}>
          <Text style={{color: '#ffffff'}}>SEARCH</Text>
        </TouchableOpacity>
      </View>

      <View>
        <View>
          <FlatList
            data={definition}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (
              <Text
                style={{
                  padding: 8,
                  margin: 5,
                  backgroundColor: '#E0EAFB',
                  borderRadius: 10,
                  marginStart: 12,
                  marginEnd: 12,
                  paddingStart: 15,
                  color: '#000000',
                  fontSize: 16,
                  fontWeight: 600,
                  fontFamily: 'Roboto-Black',
                }}>
                {item}
              </Text>
            )}
            ListEmptyComponent={
              <Text
                style={{
                  padding: 8,
                  margin: 10,
                  backgroundColor: '#e08566',
                  borderRadius: 10,
                  marginStart: 12,
                  marginEnd: 12,
                  paddingStart: 75,
                  color: '#ffffff',
                  fontFamily: 'Roboto-Black',
                  fontWeight: '500',
                }}>
                No definitions Search a Word
              </Text>
            }
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
    marginStart: 5,
    marginEnd: 30,
    gap: 8,
    width: 'auto',
    marginBottom: 12,
  },
  textInput: {
    height: 40,
    width: 250,
    borderColor: 'gray',
    borderWidth: 2,
    paddingStart: 20,
    margin: 6,
    padding: 11,
    borderRadius: 10,
    alignItems: 'center',
    color: '#333333',
    fontSize: 15,
  },
});

export default SearchComponent;
