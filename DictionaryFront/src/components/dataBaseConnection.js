import React, {useEffect, useState} from 'react';
import {Alert, Text, View, ActivityIndicator, Modal} from 'react-native';
import SQLite from 'react-native-sqlite-storage';

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

        // dropTable();
        // insertDataFromJSON1();

        db.transaction(tx => {
          tx.executeSql(
            "SELECT name FROM sqlite_master WHERE type='table' AND name IN ('enWords', 'snWords')",
            [],
            (tx, resultSet) => {
              if (resultSet.rows.length === 2) {
                // Both tables exist, no need to insert data from JSON
                console.log('Tables already exist');
                listSnWords();
                listEnWords();
              } else {
                // At least one table is missing, insert data from JSON
                insertDataFromJSON1();
                insertDataFromJSON2();
                listSnWords();
                listEnWords();
              }
            },
            error => {
              console.log('Error checking tables:', error);
            },
          );
        });

        // listEnWords();
        // listSnWords();
      },
      error => {
        console.log('Database Error', error);
      },
    );
    //inset data to SQLite database from (sn2en)JSON file
    const insertDataFromJSON1 = async () => {
      console.log('Data insert');
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
      console.log('Data insert');
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

    const dropTable = async () => {
      console.log('DropTable');
      try {
        await db.transaction(async tx => {
          tx.executeSql('DROP TABLE IF EXISTS enWords');
          tx.executeSql('DROP TABLE IF EXISTS snWords');
        });

        console.log('Tables dropped successfully');
        // insertDataFromJSON1();
        // insertDataFromJSON2();
      } catch (error) {
        console.error('Error dropping table:', error);
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

              for (let i = 0; i < 500; i++) {
                const words = resultSet.rows.item(i).word;
                tempSnWordLists.push(words);
              }

              // Pass the word list back to the parent component
              onSnWordsListed(tempSnWordLists);
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

              for (let i = 22; i < 500; i++) {
                const words = resultSet.rows.item(i).word;
                tempEnWordLists.push(words);
              }

              // Pass the word list back to the parent component
              onEnWordsListed(tempEnWordLists);
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
  }, []);
  console.log(loading);
  return (
    <>
      {loading ? (
        <>
          <Modal animationType="fade" transparent={false} visible={loading}>
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <ActivityIndicator size="large" />
              <View style={{marginTop: 10}}>
                <Text style={{color: '#000000'}}>Loading Data</Text>
              </View>
            </View>
          </Modal>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default DatabaseConnection;
