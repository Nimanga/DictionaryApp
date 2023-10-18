import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import logo from '../assets/images/logo2.png';

const AboutScreen = () => {
  const [featuresExpanded, setFeaturesExpanded] = useState(false);
  const [functionalityExpanded, setFunctionalityExpanded] = useState(false);

  const toggleFeatures = () => {
    setFeaturesExpanded(!featuresExpanded);
  };

  const toggleFunctionality = () => {
    setFunctionalityExpanded(!functionalityExpanded);
  };

  return (
    <View>
      <View>
        <Image
          style={{height: 50, width: 50, borderRadius: 10}}
          source={logo}
        />
        <Text> English - Sinhala Dictionary</Text>
      </View>

      <View>
        <TouchableOpacity onPress={toggleFeatures}>
          <Text>Features</Text>
        </TouchableOpacity>
        {featuresExpanded && (
          <View>
            <Text>Feature 1</Text>
            <Text>Feature 2</Text>
          </View>
        )}
      </View>
      <View>
        <TouchableOpacity onPress={toggleFunctionality}>
          <Text>Functionality</Text>
        </TouchableOpacity>
        {functionalityExpanded && (
          <View>
            <ScrollView>
              <Text>Functionality 1</Text>
              <Text>Functionality 2</Text>
            </ScrollView>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    // justifyContent: 'space-between',
    flexDirection: 'column',
    margin: '7%',
    marginVertical: 7,
  },
  textStyle: {
    color: '#000000',
    fontSize: 20,
    marginTop: '4%',
    fontWeight: '500',
  },

  container: {
    padding: 10,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  content: {
    marginLeft: 10,
  },
});

export default AboutScreen;
