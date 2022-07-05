import {Button, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {SafeAreaView} from 'react-native-safe-area-context';
import HomeScreen from './HomeScreen';

export default function OneTimeUpload({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.container2}>
          <Text style={styles.welcome}>Welcome</Text>
        </View>
        {/* <View style={styles.container3}>
          <Text style={styles.upload}>Upload Course</Text>
        </View> */}
        <View style={styles.container4}>
          <Button
            title="Upload Course"
            color="#000"
            onPress={() => navigation.replace('StackHome', {name: 'StackHome'})}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
const myTabs = ({navigation, route}) => {
  return;
};
const Register = ({navigation, route}) => {
  return;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  container2: {
    marginBottom: 50,
  },
  container3: {
    marginBottom: 0,
  },
  container4: {
    marginBottom: 50,
  },
  welcome: {
    fontSize: 50,
    fontWeight: '900',
    color: '#000',
  },
  upload: {
    fontSize: 30,
    fontWeight: '500',
    color: '#000',
  },
});
