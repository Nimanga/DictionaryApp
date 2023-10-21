import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import logo from '../assets/images/logo2.png';
import SQLite from 'react-native-sqlite-storage';

const AboutScreen = () => {
  const [featuresExpanded, setFeaturesExpanded] = useState(false);
  const [functionalityExpanded, setFunctionalityExpanded] = useState(false);
  const [localVersions, setLocalVersions] = useState('');

  const toggleFeatures = () => {
    setFeaturesExpanded(!featuresExpanded);
  };

  const toggleFunctionality = () => {
    setFunctionalityExpanded(!functionalityExpanded);
  };

  const getVersion = () => {
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
      let sql = 'SELECT version FROM versionInfo';

      db.transaction(async tx => {
        tx.executeSql(
          sql,
          [],
          (_, {rows}) => {
            if (rows.length > 0) {
              // let getLocalVersions = rows.item(0).version;
              setLocalVersions(rows.item(0).version);
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

  useEffect(() => {
    getVersion();
  }, []);

  return (
    <View>
      <ScrollView>
        <View style={styles.title}>
          <Image style={styles.image} source={logo} />
          <Text style={styles.titleText}> English - Sinhala Dictionary</Text>
        </View>
        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>{` V${localVersions}.0.0`}</Text>
        </View>

        <View style={styles.feature}>
          <TouchableOpacity onPress={toggleFeatures}>
            <View style={styles.featureContainer}>
              <Text style={styles.featureText}>Features</Text>
            </View>
          </TouchableOpacity>
          {featuresExpanded && (
            <View>
              <Text style={styles.text}>
                Experience the power of seamless translation with our
                English-Sinhala Dictionary. Effortlessly search and discover
                comprehensive definitions, synonyms, and examples for a wide
                range of words. Enjoy an intuitive user interface, quick access
                to favorites, and the ability to explore even when offline. Dive
                into a rich linguistic experience designed to enhance your
                language journey
              </Text>
            </View>
          )}
        </View>

        <View>
          <TouchableOpacity onPress={toggleFunctionality}>
            <View style={styles.featureContainer}>
              <Text style={styles.featureText}>Functionality</Text>
            </View>
          </TouchableOpacity>
          {functionalityExpanded && (
            <View>
              <ScrollView>
                <Text style={styles.text}>
                  Uncover a world of linguistic possibilities with our
                  English-Sinhala Dictionary. Swiftly find precise word
                  meanings, phonetic pronunciations, and contextual usage
                  examples. Navigate effortlessly through an intuitive
                  interface, bookmark frequently used words, and enjoy offline
                  access. Explore a feature-packed tool tailored to elevate your
                  language proficiency.
                </Text>
              </ScrollView>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    height: 50,
    width: 50,
    borderRadius: 10,
  },
  title: {
    flexDirection: 'row',
    margin: '5%',
    marginStart: '8%',
  },
  titleText: {
    marginStart: '10%',
    marginEnd: '5%',
    marginTop: '2%',
    color: '#000000',
    fontSize: 20,
    fontWeight: '500',
  },
  feature: {
    flexDirection: 'column',
  },
  featureText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '500',
    flexDirection: 'column',
  },
  versionContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: '-5%',
    marginBottom: '8%',
  },
  versionText: {
    color: '#000000',
    fontSize: 15,
  },
  featureContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '2%',
    padding: '1%',
    backgroundColor: '#463659',
    borderRadius: 25,
    marginStart: '8%',
    marginEnd: '8%',
  },
  text: {
    marginTop: '2%',
    color: '#ffffff',
    backgroundColor: '#055656',
    padding: '8%',
    borderRadius: 12,
    marginStart: '10%',
    marginEnd: '10%',
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'Roboto-Black',
  },
});

export default AboutScreen;
