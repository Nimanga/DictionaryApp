import React, { useEffect } from 'react';
import SQLite from 'react-native-sqlite-storage';

const DatabaseConnection = ({ onWordsListed }) => {

useEffect(() => {  
  const db = SQLite.openDatabase(
    {
      name: 'dictionaryData.db',
      location: 'default'
    },
    () => {
      console.log('Database Connected');
      listWords();
    //   dropTable();
    },
    (error) => {
      console.log('Database Error', error);
    }
  );

  const insertDataFromJSON = () => {
    console.log('Data insert');
    try {
      const jsonData = require('../../en2sn.json');

      db.transaction(async (tx) => {
        await tx.executeSql(
          'CREATE TABLE IF NOT EXISTS enWords (id INTEGER PRIMARY KEY AUTOINCREMENT, word TEXT, definition TEXT)',
          []
        );
        for (const item of jsonData) {
          await tx.executeSql('INSERT INTO enWords (word, definition) VALUES (?, ?)', [
            item.word,
            JSON.stringify(item.definitions)
          ]);
        }
      });

      console.log('Data inserted successfully');
      listWords();
    } catch (error) {
      console.log('Error inserting data:', error);
    }
  };

  const dropTable = async () => {
    console.log('DropTable');
    try {
      await db.transaction(async (tx) => {
        tx.executeSql('DROP TABLE IF EXISTS enWords');
      });

      console.log('Table dropped successfully');
      insertDataFromJSON();
    } catch (error) {
      console.error('Error dropping table:', error);
    }
  };

  const listWords = async () => {
    try {
      let sql = 'SELECT word FROM enWords';
      db.transaction((tx) => {
        tx.executeSql(
          sql,
          [],
          (tx, resultSet) => {
            let tempWordLists = [];

            for (let i = 0; i < 100; i++) {
              const words = resultSet.rows.item(i).word;
              tempWordLists.push(words);
            }

            // Pass the word list back to the parent component
            onWordsListed(tempWordLists);
          },
          (error) => {
            console.log('List Word error', error);
          }
        );
      });
    } catch (error) {
      console.log('Error getting data', error);
    }
  };

}, []);

  return null; // Since this component doesn't render anything
};

export default DatabaseConnection;
