import { View, Text } from 'react-native'
import React, { useState } from 'react'
import SQLite from 'react-native-sqlite-storage';



const TestDb = () => {

    const[wordList, setWordsListed]= useState([]);
    
    const db = SQLite.openDatabase({
        name:'testDb.db',
        createFromLocation: 1,
    },
    ()=>{
        console.log('Database Opened')
        listWords();
    },
    (error)=>{
        console.log('Database error', error);
    }
    
    )

//     const createTableQuery = `
//     CREATE TABLE IF NOT EXISTS enWords (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     word TEXT,
//     definition TEXT
//      );
//    `;

//    db.transaction(tx => {
//     tx.executeSql(
//       createTableQuery,
//       [],
//       () => {
//         // Table created successfully
//         console.log('Table created');
//       },
//       error => {
//         // Handle error if table creation fails
//         console.error('Error creating table:', error);
//       }
//     );
//   });
//   // Example: Query all words from the table
// db.transaction(tx => {
//     tx.executeSql(
//       'SELECT word FROM enWords',
//       [],
//       (tx, results) => {
//         const len = results.rows.length;
//         for (let i = 0; i < len; i++) {
//           const word = results.rows.item(i).word;
//           console.log('Word:', word);
//         }
//       },
//       error => {
//         console.error('Error querying data:', error);
//       }
//     );
//   });
  

    // const listTables = async (db) => {
    //     return new Promise((resolve, reject) => {
    //       db.transaction((tx) => {
    //         tx.executeSql(
    //           "SELECT name FROM sqlite_master WHERE type='table';",
    //           [],
    //           (tx, results) => {
    //             const tables = [];
    //             const len = results.rows.length;
    //             for (let i = 0; i < len; i++) {
    //               tables.push(results.rows.item(i).name);
    //             }
    //             resolve(tables);
    //           },
    //           (error) => {
    //             reject(error);
    //           }
    //         );
    //       });
    //     });
    //   };
      
    //   // Usage example
    //   listTables(db)
    //     .then((tables) => {
    //       console.log('Tables:', tables);
    //     })
    //     .catch((error) => {
    //       console.error('Error:', error);
    //     });
      

    const listWords = async () => {
        console.log('db')
        try {
          let sql = 'SELECT word FROM enWords';
          db.transaction((tx) => {
            tx.executeSql(
              sql,
              [],
              (tx, resultSet) => {
                let tempWordLists = [];
    
                for (let i = 0; i < 1; i++) {
                  const words = resultSet.rows.item(i).word;
                  tempWordLists.push(words);
                }
    
                // Pass the word list back to the parent component
                setWordsListed(tempWordLists);

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
console.log(wordList);

  return (
    <View>
      <Text>test</Text>
    </View>
  )
}

export default TestDb