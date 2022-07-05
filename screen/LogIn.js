import React, {useState} from 'react';
import {
  View,
  Text,
  Button,
  ScrollView,
  Image,
  StyleSheet,
  Dimensions,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

import HomeScreen from './HomeScreen';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default function LogIn({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [storeddata, setStoreddata] = useState('');
  const [passwordSecured, setPasswordSecured] = useState(true);

  const _storeData = async token => {
    try {
      await AsyncStorage.setItem('staff-token', token);
      console.log('Token Saved');
    } catch (error) {
      console.log('Some error in setting token');
    }
  };

  const getData = async () => {
    try {
      const token = await AsyncStorage.getItem('staff-token');
      if (token !== null) {
        console.log('hello>>>>>>>>>>>>');
        console.log(token);
        setStoreddata(token);
        navigation.replace('StackHome');
      }
    } catch (e) {
      console.log('no Value in login');
    }
  };
  React.useEffect(() => {
    getData();
  }, [storeddata]);
  const signIn = (email, password) => {
    console.log(email, password);
    axios
      .post(`http://65.0.80.5:5000/api/admin/stafflogin`, {
        email: email,
        password: password,
      })
      .then(function (response) {
        console.log(response.data);
        console.log(response.data.token);

        if (response.data.token != null) {
          _storeData(response.data.token);
          navigation.replace('StackHome');
        } else {
          console.log('no token!');
        }
      })
      .catch(function (error) {
        console.log(error.response.data);
      });
  };
  return (
    <ScrollView style={styles.container}>
      <View style={{}}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            height: 150,
          }}>
          <Text
            style={{
              margin: 10,
              fontSize: 38,
              fontWeight: 'bold',
              color: 'black',
            }}>
            Sign In
          </Text>
        </View>
        <Text
          style={{
            color: 'black',
            fontSize: 15,
            fontWeight: 'bold',
            margin: 20,
          }}></Text>
        <View style={styles.inputView}>
          <Icon name="user" size={20} color="black" />
          <TextInput
            style={{flex: 1, paddingHorizontal: 12}}
            placeholder="Email"
            onChangeText={setEmail}
            value={email}
            placeholderTextColor="black"
            color="black"
          />
        </View>
        <Text
          style={{
            color: 'black',
            fontSize: 15,
            fontWeight: 'bold',
          }}></Text>
        <View style={styles.inputView}>
          <Icon name="lock" size={20} color="black" />
          <TextInput
            style={{flex: 1, paddingHorizontal: 12}}
            placeholder={'password'}
            secureTextEntry={passwordSecured}
            textContentType="password"
            onChangeText={setPassword}
            value={password}
            placeholderTextColor="black"
            color="black"
          />
          <TouchableOpacity
            style={{padding: 4}}
            onPress={() => {
              setPasswordSecured(!passwordSecured);
            }}>
            <Image
              style={{width: 20, height: 20, marginLeft: 10}}
              source={require('../src/view.png')}
            />
          </TouchableOpacity>
        </View>
        <Text>{'\n'}</Text>

        <View style={{height: 150}}>
          <TouchableOpacity
            style={styles.logbut}
            onPress={() => {
              signIn(email, password);
            }}>
            <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>
              Submit
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text>
            {storeddata}
            {/* <storeddata /> */}
          </Text>
        </View>
      </View>
      <View style={{}}>
        <TouchableOpacity
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            alignSelf: 'center',
            justifyContent: 'center',
          }}
          onPress={() => navigation.navigate('Register', {name: 'Register'})}>
          <Text style={{margin: 8, color: 'black'}}>Don't Have An Acound?</Text>
          <Text style={{color: 'red', fontWeight: 'bold', fontSize: 15}}>
            Create an account
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
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
    backgroundColor: 'white',
    height: '100%',
  },
  inputView: {
    width: '90%',
    height: 55,
    backgroundColor: '#f1f3f6',
    paddingHorizontal: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
  },
  logbut: {
    width: '90%',
    height: 45,
    backgroundColor: 'black',
    paddingHorizontal: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
    borderRadius: 10,
    justifyContent: 'center',
    shadowColor: 'black',
    shadowOpacity: 10,
    elevation: 10,
  },
});
