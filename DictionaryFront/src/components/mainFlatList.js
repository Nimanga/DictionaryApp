import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import DatabaseOperations from './dataBaseConnection';
import DirectionBtn from './directionBtn';
import SQLite from 'react-native-sqlite-storage';

const MainFlatList = () => {
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

  const [temEnWordLists, setTemEnWordLists] = useState([]);
  const [temSnWordLists, setTemSnWordLists] = useState([]);
  const [changeLists, setChangeLists] = useState([]);
  const [mainListDefinition, setMainListDefinition] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [itemWord, setItemWord] = useState('');
  const [loading, setLoading] = useState(false);

  const [visibleData, setVisibleData] = useState([]);
  const [startIdx, setStartIdx] = useState(0);
  const [endIdx, setEndIdx] = useState(15);

  // const fetchData = () => {
  //   console.log('FetchData');
  //   const newData = Array.from({length: 2000}, (_, index) => `Loadings..`);
  //   setChangeLists(newData);
  // };

  const updateVisibleData = () => {
    console.log('updateVisibleData');

    setVisibleData(changeLists.slice(startIdx, endIdx));
  };

  console.log(visibleData);

  const handleEndReached = () => {
    setStartIdx(prevStartIdx => prevStartIdx + 1);
    setEndIdx(prevEndIdx => prevEndIdx + 50);
    updateVisibleData();
  };

  console.log('index', startIdx);

  useEffect(() => {
    // fetchData();
    handleEndReached();
  }, []);

  const handleEnWordsListed = wordList1 => {
    setTemEnWordLists(wordList1);
    setChangeLists(wordList1);
  };

  const handleSnWordsListed = wordList2 => {
    setTemSnWordLists(wordList2);
  };

  const changeEnData = () => {
    setChangeLists(temEnWordLists);
  };
  const changeSnData = () => {
    setChangeLists(temSnWordLists);
  };

  const handleSearch = item => {
    setItemWord(item);
    setLoading(true);
    const isSinhala = !/^[a-zA-Z0-9\s]*$/.test(item);

    console.log('handleEnSearch');

    db.transaction(tx => {
      const sqlQuery = !isSinhala
        ? 'SELECT definition FROM enWords WHERE word = ?'
        : 'SELECT definition FROM snWords WHERE word = ?';

      tx.executeSql(
        sqlQuery,
        [item.toLowerCase()],
        (tx, results) => {
          setLoading(false);
          console.log(results.rows.length);
          if (results.rows.length > 0) {
            const definitions = results.rows.item(0).definition;
            console.log('If', definitions);
            setMainListDefinition(JSON.parse(definitions));
          } else {
            console.log('No definitions found for', searchTerm);
          }
        },
        error => {
          console.log('Error searching:', error);
        },
      );
    });
    setMainListDefinition([]);
    setShowModal(true);
    setLoading(true);
  };

  const renderLoader = () => {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#65a765" />
      </View>
    );
  };
  console.log(mainListDefinition);

  return (
    <>
      <View style={{flex: 1, gap: 12}}>
        <DatabaseOperations
          onSnWordsListed={handleSnWordsListed}
          onEnWordsListed={handleEnWordsListed}
        />

        <DirectionBtn changeEnData={changeEnData} changeSnData={changeSnData} />

        <View style={styles.flatListContainer}>
          <FlatList
            data={changeLists}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (
              <View
                style={{
                  padding: 8,
                  margin: 4,
                  backgroundColor: '#E0EAFB',
                  borderRadius: 10,
                  marginStart: 12,
                  marginEnd: 12,
                  paddingStart: 15,
                }}>
                <TouchableOpacity onPress={() => handleSearch(item)}>
                  <Text
                    style={{
                      color: '#000000',
                      marginStart: 5,
                      fontWeight: 600,
                      fontSize: 16,
                      fontFamily: 'Roboto-Black',
                    }}>
                    {item}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
            onEndReached={handleEndReached}
            onEndReachedThreshold={0.1}
          />
        </View>
        <View>
          <Modal
            animationType={'fade'}
            transparent={true}
            visible={showModal}
            onRequestClose={() => setShowModal(false)}>
            <View
              style={{
                backgroundColor: '#000000aa',
                flex: 1,
                display: 'flex',
                justifyContent: 'center',
              }}>
              <View style={styles.modalContainer}>
                <Text style={styles.modalHeaderText}>{itemWord}</Text>
                {!loading ? (
                  <FlatList
                    data={mainListDefinition}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item}) => (
                      <Text style={styles.modalDefinitionText}>{item}</Text>
                    )}
                    ListEmptyComponent={
                      <Text style={styles.modalNoDefinitionText}>
                        No definitions. Search a Word.
                      </Text>
                    }
                  />
                ) : (
                  <>
                    <View style={{marginTop: '30%', marginBottom: '59%'}}>
                      <ActivityIndicator size="small" color="#65a765" />
                    </View>
                  </>
                )}
                <TouchableOpacity
                  onPress={() => setShowModal(false)}
                  style={styles.closeButton}>
                  <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  flatListContainer: {
    flex: 1,
    width: '100%',
  },
  modalContainer: {
    backgroundColor: '#324B77',
    borderRadius: 20,
    padding: 16,
    width: '80%',
    height: '60%',
    alignSelf: 'center',
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  modalHeaderText: {
    backgroundColor: '#22886E',
    fontFamily: 'Roboto-Black',
    color: '#ffffff',
    margin: 12,
    marginBottom: 20,
    paddingStart: 20,
    padding: 10,
    borderRadius: 10,
    fontSize: 17,
    fontWeight: '600',
  },
  modalDefinitionText: {
    padding: 8,
    margin: 5,
    backgroundColor: '#E0EAFB',
    borderRadius: 10,
    color: '#000000',
    fontSize: 16,
    fontWeight: '600',
    paddingStart: 15,
    fontFamily: 'Roboto-Black',
  },
  modalNoDefinitionText: {
    padding: 8,
    margin: 10,
    backgroundColor: '#e08566',
    borderRadius: 10,
    color: '#ffffff',
    fontFamily: 'Roboto-Black',
    fontWeight: '500',
  },
  closeButton: {
    backgroundColor: '#e08566',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    marginTop: 20,
    alignSelf: 'center',
  },
  closeButtonText: {
    color: '#ffffff',
    fontFamily: 'Roboto-Black',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default MainFlatList;
