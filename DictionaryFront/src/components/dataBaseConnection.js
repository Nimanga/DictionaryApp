import React, { useEffect } from 'react';
import SQLite from 'react-native-sqlite-storage';

const DatabaseConnection = ({ onEnWordsListed, onSnWordsListed }) => {

useEffect(() => {  
  const db = SQLite.openDatabase(
    {
      name: 'dictionaryData.db',
    },
    () => {
      console.log('Database Connected');
        // dropTable();
        listSnWords();
        listEnWords();
      
   
    },
    (error) => {
      console.log('Database Error', error);
    }
  );

  const insertDataFromJSON1 = () => {
    console.log('Data insert');
    try {
      const jsonData = require('../../sn2en.json');

      db.transaction(async (tx) => {
        await tx.executeSql(
          'CREATE TABLE IF NOT EXISTS snWords (id INTEGER PRIMARY KEY AUTOINCREMENT, word TEXT, definition TEXT)',
          []
        );
        for (const item of jsonData) {
          await tx.executeSql('INSERT INTO snWords (word, definition) VALUES (?, ?)', [
            item.word,
            JSON.stringify(item.definitions)
          ]);
        }
      });

      console.log('Data inserted successfully');
      listSnWords();
      listEnWords();
    } catch (error) {
      console.log('Error inserting data:', error);
    }
  };

  const insertDataFromJSON2 = () => {
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
     
    } catch (error) {
      console.log('Error inserting data:', error);
    }
  };

  const dropTable = async () => {
    console.log('DropTable');
    try {
      await db.transaction(async (tx) => {
        tx.executeSql('DROP TABLE IF EXISTS enWords');
        tx.executeSql('DROP TABLE IF EXISTS snWords');
      });

      console.log('Tables dropped successfully');
      insertDataFromJSON1();
      insertDataFromJSON2();
    } catch (error) {
      console.error('Error dropping table:', error);
    }
  };

  const listSnWords = async () => {
    try {
      let sql = 'SELECT word FROM snWords';
      db.transaction((tx) => {
        tx.executeSql(
          sql,
          [],
          (tx, resultSet) => {
            let tempSnWordLists = [];

            for (let i = 0; i < 100; i++) {
              const words = resultSet.rows.item(i).word;
              tempSnWordLists.push(words);
            }

            // Pass the word list back to the parent component
            onSnWordsListed(tempSnWordLists);
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

  const listEnWords = async () => {
    try {
      let sql = 'SELECT word FROM enWords';
      db.transaction((tx) => {
        tx.executeSql(
          sql,
          [],
          (tx, resultSet) => {
            let tempEnWordLists = [];

            for (let i = 0; i < 100; i++) {
              const words = resultSet.rows.item(i).word;
              tempEnWordLists.push(words);
            }

            // Pass the word list back to the parent component
            onEnWordsListed(tempEnWordLists);
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
  return()=>{
    db.close((success)=>{
      if(success){
        console.log('Database connection closed');
      }else{
        console.log('Failed to close database connection')
      }
    })
  }

}, []);

  return null; // Since this component doesn't render anything
};

export default DatabaseConnection;
