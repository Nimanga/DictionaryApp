import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useState} from 'react';

const HelpScreen = () => {
  const [expandWhatNew, setExpandWhatNew] = useState(false);
  const [expandDictionary, setExpandDictionary] = useState(false);

  const toggleWhatsNew = () => {
    setExpandWhatNew(!expandWhatNew);
  };

  const toggleDictionary = () => {
    setExpandDictionary(!expandDictionary);
  };
  return (
    <View>
      <View>
        <TouchableOpacity onPress={toggleWhatsNew}>
          <Text style={styles.title}>What is New</Text>
        </TouchableOpacity>
        {expandWhatNew && (
          <>
            <Text style={styles.descriptionText}>Updated User Interface</Text>
            <Text style={styles.descriptionText}>Updated Database</Text>
          </>
        )}
      </View>
      <View>
        <TouchableOpacity onPress={toggleDictionary}>
          <Text style={styles.title}>Dictionary</Text>
        </TouchableOpacity>
        {expandDictionary && (
          <View>
            <Text style={styles.descriptionText}>
              Dictionary When the application is launched, Screen is the first
              thing to show up. At the top, a search box is shown.
            </Text>
            <Text style={styles.descriptionText}>
              In searchBox you can type English or Sinhala Words for searching
              definition
            </Text>
            <Text style={styles.descriptionText}>
              For search Sinhala Definitions You can type like this - Example:-
              Book
            </Text>
            <Text style={styles.descriptionText}>
              For search English Definitions You can type like this - Example:-
              පොත
            </Text>
            <Text style={styles.descriptionText}>
              Below that is a list of English and Sinhala words. It can get the
              definitions of those words by pressing it.
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    color: '#000000',
    fontWeight: '500',
    paddingBottom: '1%',
    borderBottomWidth: 1,
    borderColor: 'grey',
    paddingStart: '3%',
    marginTop: '2%',
  },
  descriptionText: {
    fontSize: 14,
    color: '#606060',
    marginStart: '4%',
    marginTop: '2%',
    marginEnd: '3%',
  },
});
export default HelpScreen;
