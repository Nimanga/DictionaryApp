import React, {useEffect, useState} from 'react';
import {
  Alert,
  Text,
  View,
  ActivityIndicator,
  Modal,
  ImageBackground,
  Image,
  StatusBar,
} from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import RemoteDatabase from './remoteDatabase';

const DatabaseConnection = ({onEnWordsListed, onSnWordsListed}) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const db = SQLite.openDatabase(
      {
        name: 'dictionaryData.db',
        createFromLocation: 1,
      },
      () => {
        console.log('Database Connected');

        db.transaction(tx => {
          tx.executeSql(
            "SELECT name FROM sqlite_master WHERE type='table' AND name IN ('enWords', 'snWords' , 'versionInfo')",
            [],
            (tx, resultSet) => {
              if (resultSet.rows.length === 3) {
                // Both tables exist, no need to insert data from JSON
                console.log('Tables already exist');
                listSnWords();
                listEnWords();
              } else {
                // At least one table is missing, insert data from JSON
                insertDataFromJSON1();
                insertDataFromJSON2();
                versionDataFromJson();
                listSnWords();
                listEnWords();
              }
            },
            error => {
              console.log('Error checking tables:', error);
            },
          );
        });
      },
      error => {
        console.log('Database Error', error);
      },
    );

    //inset data to SQLite database from (sn2en)JSON file
    const insertDataFromJSON1 = async () => {
      try {
        const jsonData = require('../../android/app/src/main/assets/sn2en.json');

        await db.transaction(async tx => {
          await tx.executeSql(
            'CREATE TABLE IF NOT EXISTS snWords (id INTEGER PRIMARY KEY AUTOINCREMENT, word TEXT, definition TEXT)',
            [],
          );
          for (const item of jsonData) {
            await tx.executeSql(
              'INSERT INTO snWords (word, definition) VALUES (?, ?)',
              [item.word, JSON.stringify(item.definitions)],
            );
          }
        });

        console.log('Data inserted successfully');
      } catch (error) {
        console.log('Error inserting data:', error);
      }
    };

    //inset data to SQLite database from (en2sn)JSON file
    const insertDataFromJSON2 = async () => {
      Alert.alert(
        'Please wait while we set up the database for the first time.',
      );

      try {
        const jsonData = require('../../android/app/src/main/assets/en2sn.json');

        await db.transaction(async tx => {
          await tx.executeSql(
            'CREATE TABLE IF NOT EXISTS enWords (id INTEGER PRIMARY KEY AUTOINCREMENT, word TEXT, definition TEXT)',
            [],
          );
          for (const item of jsonData) {
            await tx.executeSql(
              'INSERT INTO enWords (word, definition) VALUES (?, ?)',
              [item.word, JSON.stringify(item.definitions)],
            );
          }
        });

        console.log('Data inserted successfully');
      } catch (error) {
        console.log('Error inserting data:', error);
      }
    };

    const versionDataFromJson = async () => {
      try {
        const versionData = require('../../android/app/src/main/assets/version.json');

        await db.transaction(async tx => {
          await tx.executeSql(
            'CREATE TABLE IF NOT EXISTS versionInfo ( id INTEGER PRIMARY KEY, version TEXT)',
          );
          await tx.executeSql('INSERT INTO versionInfo (version) VALUES (?)', [
            versionData.version,
          ]);

          console.log('version Insert');
        });
      } catch (error) {
        console.log('Error inserting data', error);
      }
    };

    const listSnWords = () => {
      try {
        let sql = 'SELECT word FROM snWords';

        db.transaction(async tx => {
          tx.executeSql(
            sql,
            [],
            (tx, resultSet) => {
              let tempSnWordLists = [];

              for (let i = 0; i < 2000; i++) {
                const words = resultSet.rows.item(i).word;
                tempSnWordLists.push(words);
              }

              // Pass the word list back to the parent component
              onSnWordsListed(tempSnWordLists);
              setLoading(false);
            },
            error => {
              console.log('List Word error', error);
            },
          );
        });
      } catch (error) {
        console.log('Error getting data', error);
      }
    };

    const listEnWords = () => {
      try {
        let sql = 'SELECT word FROM enWords';

        db.transaction(async tx => {
          tx.executeSql(
            sql,
            [],
            (tx, resultSet) => {
              let tempEnWordLists = [];

              for (let i = 22; i < 2000; i++) {
                const words = resultSet.rows.item(i).word;

                tempEnWordLists.push(words);
              }

              // Pass the word list back to the parent component
              onEnWordsListed(tempEnWordLists);
            },
            error => {
              console.log('List Word error', error);
            },
          );
        });
      } catch (error) {
        console.log('Error getting data', error);
      }
    };
  }, []);

  console.log(loading);
  // -----------------------------------------------------------------------------------------------------------------------------------
  // -----------------------------------------------------------------------------------------------------------------------------------
  // -----------------------------------------------------------------------------------------------------------------------------------

  return (
    <>
      {loading ? (
        <>
          <RemoteDatabase />
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Modal animationType="fade" transparent={false} visible={loading}>
              <StatusBar backgroundColor="#081348" />
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#081348',
                }}>
                <Image
                  style={{
                    width: '50%',
                    height: '50%',
                    resizeMode: 'contain',
                  }}
                  source={require('../assets/images/logo5.png')}
                />
              </View>
            </Modal>
          </View>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default DatabaseConnection;
