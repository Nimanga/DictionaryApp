import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, Button} from 'react-native';
import DatabaseOperations from './dataBaseConnection';
import DirectionBtn from './directionBtn';

const MainFlatList = () => {
  const [temEnWordLists, setTemEnWordLists] = useState([]);
  const [temSnWordLists, setTemSnWordLists] = useState([]);
  const [changeLists, setChangeLists] = useState([]);

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
  // console.log(temEnWordLists);
  // console.log(temSnWordLists);

  return (
    <View style={{flex: 1, gap: 12}}>
      <DatabaseOperations
        onSnWordsListed={handleSnWordsListed}
        onEnWordsListed={handleEnWordsListed}
      />

      <DirectionBtn changeEnData={changeEnData} changeSnData={changeSnData} />

      <View>
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
              <Text
                style={{
                  color: '#000000',
                  marginStart: 5,
                  fontWeight: 600,
                  fontSize: 15,
                  fontFamily: 'Roboto-Black',
                }}>
                {item}
              </Text>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default MainFlatList;

{
  /* <Button title="English" onPress={changeEnData}/>
<Button title="Sinhala" onPress={changeSnData}/> */
}
// import React, { useEffect, useState } from 'react';
// import { View, Text, FlatList } from 'react-native';
// import SQLite from 'react-native-sqlite-storage';

// const MainFlatList = () => {
//   const [temWordLists, setTemWordLists] = useState([]);

//   const db = SQLite.openDatabase(
//     {
//       name: 'dictionaryData.db',
//       location: 'default'
//     },
//     () => {
//       console.log('Database Connected');
//       dropTable();
//     },
//     (error) => {
//       console.log('Database Error', error);
//     }
//   );

//   const insertDataFromJSON = () => {
//     console.log('Data insert');
//     try {
//       const jsonData = require('../../en2sn.json');

//       db.transaction(async (tx) => {
//         await tx.executeSql(
//           'CREATE TABLE IF NOT EXISTS enWords (id INTEGER PRIMARY KEY AUTOINCREMENT, word TEXT, definition TEXT)',
//           []
//         );
//         for (const item of jsonData) {
//           await tx.executeSql('INSERT INTO enWords (word, definition) VALUES (?, ?)', [
//             item.word,
//             JSON.stringify(item.definitions)
//           ]);
//         }
//       });

//       console.log('Data inserted successfully');
//       listWords();
//     } catch (error) {
//       console.log('Error inserting data:', error);
//     }
//   };

//   const dropTable = async () => {
//     console.log('DropTable');
//     try {
//       await db.transaction(async (tx) => {
//         tx.executeSql('DROP TABLE IF EXISTS enWords');
//       });

//       console.log('Table dropped successfully');
//       insertDataFromJSON();
//     } catch (error) {
//       console.error('Error dropping table:', error);
//     }
//   };

//   const listWords = async () => {
//     console.log('ListWords');
//     try {
//       let sql = 'SELECT word FROM enWords';
//       db.transaction((tx) => {
//         tx.executeSql(
//           sql,
//           [],
//           (tx, resultSet) => {
//             let tempWordLists = [];

//             for (let i = 0; i < 150; i++) {
//               const words = resultSet.rows.item(i).word;
//               tempWordLists.push(words);
//             }
//             setTemWordLists(tempWordLists);
//           },
//           (error) => {
//             console.log('List Word error', error);
//           }
//         );
//       });
//     } catch (error) {
//       console.log('Error getting data', error);
//     }
//   };

//   return (
//     <View>
//       <Text>Words:</Text>
//       <FlatList
//         data={temWordLists}
//         keyExtractor={(item, index) => index.toString()}
//         renderItem={({ item }) => (
//           <View>
//             <Text>{item}</Text>
//           </View>
//         )}
//       />
//     </View>
//   );
// };

// export default MainFlatList;
