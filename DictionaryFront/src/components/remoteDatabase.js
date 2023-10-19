import SQLite from 'react-native-sqlite-storage';
import axios from 'axios';
import React, {useEffect} from 'react';

const RemoteDatabase = () => {
  let getRemoteVersions = '';
  let getLocalVersions = '';

  const initDatabase = async () => {
    const db = SQLite.openDatabase(
      {
        name: 'dictionaryData.db',
        createFromLocation: 1,
      },
      () => {
        console.log('Database Connected');
        getVersion();
        getRemoteVersion();
      },
      error => {
        console.log('Database Error', error);
      },
    );

    const getVersion = async () => {
      try {
        let sql = 'SELECT version FROM versionInfo';

        await db.transaction(async tx => {
          tx.executeSql(
            sql,
            [],
            (_, {rows}) => {
              if (rows.length > 0) {
                getLocalVersions = rows.item(0).version;

                console.log(getLocalVersions);
              }
            },
            error => {
              console.log('Get version error', error);
            },
          );
        });
      } catch (error) {
        console.log('Error getting version ', error);
      }
    };

    const getRemoteVersion = async () => {
      await axios
        .get(
          'https://dictionary-application-z3ox.onrender.com/dictionary/version',
        )
        .then(res => {
          // setRemoteVersion(res.data[0].version);
          getRemoteVersions = res.data[0].version;
          console.log(getRemoteVersions === getLocalVersions);
          checkVersion();
        })
        .catch(error => {
          console.log(error.message);
        });
    };
  };

  useEffect(() => {
    initDatabase();
  }, [getRemoteVersions]);

  // const getEnData = async () => {
  //   await axios
  //     .get('http://10.0.2.2:8050/dictionary/en2sn')
  //     .then(async res => {
  //       const enData = res.data;
  //       await setData(enData);
  //       console.log(enData);
  //     })
  //     .catch(err => {
  //       console.log(err.message);
  //     });
  // };

  const getEnData = async () => {
    try {
      const response = await axios.get(
        'https://dictionary-application-z3ox.onrender.com/dictionary/en2sn',
      );
      console.log('enData', response.data);

      let englishData = response.data;
      await insertEnDataToDB(englishData);
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };

  const getSnData = async () => {
    try {
      const response = await axios.get(
        'https://dictionary-application-z3ox.onrender.com/dictionary/sn2en',
      );
      console.log('SnData', response.data);
      let sinhalaData = response.data;
      await insertSnDataToDB(sinhalaData);
    } catch (error) {
      console.log('Error Fetching data', error);
    }
  };

  // insert Remote enData to local Database
  const insertEnDataToDB = async englishData => {
    console.log('Inserting English data to DB');

    const db = SQLite.openDatabase(
      {
        name: 'dictionaryData.db',
        createFromLocation: 1,
      },
      () => {
        console.log('Database Connected');
      },
      error => {
        console.log('Database Error', error);
      },
    );
    try {
      await db.transaction(async tx => {
        await tx.executeSql(
          'CREATE TABLE IF NOT EXISTS enWords (id INTEGER PRIMARY KEY, word TEXT, definition TEXT)',
        );

        for (const item of englishData) {
          await tx.executeSql(
            'INSERT INTO enWords (word, definition) VALUES (?, ?)',
            [item.word, JSON.stringify(item.definitions)],
          );
        }
      });

      console.log('Data inserted successfully');
    } catch (error) {
      console.error('Error inserting data:', error);
    }
  };

  // insert Remote snData to local Database
  const insertSnDataToDB = async sinhalaData => {
    console.log('Inserting Sinhala data to DB');

    const db = SQLite.openDatabase(
      {
        name: 'dictionaryData.db',
        createFromLocation: 1,
      },
      () => {
        console.log('Database Connected');
      },
      error => {
        console.log('Database Error', error);
      },
    );
    try {
      await db.transaction(async tx => {
        await tx.executeSql(
          'CREATE TABLE IF NOT EXISTS esnWords (id INTEGER PRIMARY KEY, word TEXT, definition TEXT)',
        );

        for (const item of sinhalaData) {
          await tx.executeSql(
            'INSERT INTO snWords (word, definition) VALUES (?, ?)',
            [item.word, JSON.stringify(item.definitions)],
          );
        }
      });

      console.log('Data inserted successfully');
    } catch (error) {
      console.error('Error inserting data:', error);
    }
  };

  const updateVersion = () => {
    const db = SQLite.openDatabase(
      {
        name: 'dictionaryData.db',
        createFromLocation: 1,
      },
      () => {
        console.log('Database Connected');

        // Update the version
        db.transaction(tx => {
          tx.executeSql(
            'UPDATE versionInfo SET version = ?',
            [getRemoteVersions],
            (_, {rows}) => {
              console.log('Version updated successfully');
            },
            error => {
              console.log('Update version error', error);
            },
          );
        });
      },
      error => {
        console.log('Database Error', error);
      },
    );
  };

  console.log(getLocalVersions);
  console.log(getRemoteVersions);

  const checkVersion = () => {
    if (!getRemoteVersions) {
      console.log('No data');
    } else {
      if (getLocalVersions == getRemoteVersions) {
        console.log('Same');
      } else {
        console.log('different');
        getEnData();
        getSnData();
        updateVersion();
      }
    }
  };

  return null;
};

export default RemoteDatabase;
