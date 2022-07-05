import React, {useState, useCallback, useRef} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  Image,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  AppRegistry,
  Alert,
  Platform,
  SearchBar,
  TextInput,
} from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';

const myTabs = ({navigation, route}) => {
  return;
};
export default function Courses({navigation}) {
  const [playing, setPlaying] = useState(false);

  const onStateChange = useCallback(state => {
    if (state === 'ended') {
      setPlaying(false);
      Alert.alert('video has finished playing!');
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying(prev => !prev);
  }, []);

  function CustomHeader({title}) {
    return (
      <View
        style={{flexDirection: 'row', height: 50, backgroundColor: 'white'}}>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Home', {name: 'Home'})}>
            <Image
              style={{width: 30, height: 30, marginLeft: 20}}
              source={require('../src/back.png')}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
        <View style={{flex: 3, justifyContent: 'center'}}>
          <Text style={{textAlign: 'center', fontWeight: '800', fontSize: 20}}>
            {title}
          </Text>
        </View>
        <View style={{flex: 1, justifyContent: 'center'}}></View>
      </View>
    );
  }
  return (
    <View style={{flex: 1, backgroundColor: '#f1f3f6'}}>
      <CustomHeader title="Courses" />
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: 'white',
          width: '90%',
          borderRadius: 15,
          marginLeft: 20,
          alignItems: 'center',
          margin: 10,
        }}>
        <Image
          style={{width: 20, height: 20, marginLeft: 20}}
          source={require('../src/search.png')}
        />
        <TextInput
          placeholder="Search Courses"
          style={{
            width: '80%',
            height: 55,
            backgroundColor: 'white',
            paddingHorizontal: 10,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: 20,
            fontSize: 15,
            fontWeight: 'bold',
          }}
        />
      </View>
      <ScrollView>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: '#f1f3f6',
            borderRadius: 10,
          }}>
          <TouchableOpacity>
            <YoutubePlayer
              height={120}
              width={200}
              play={playing}
              videoId={'iee2TATGMyI'}
              onChangeState={onStateChange}
              thumbnail={require('../src/school.jpg')}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Text
              style={{
                margin: 20,
                fontSize: 15,
                fontWeight: 'bold',
                color: 'black',
              }}>
              Envy Theme
            </Text>
            <Text style={{marginLeft: 20}}>AI</Text>
            <View style={{flexDirection: 'row'}}>
              <Image
                style={{width: 20, height: 20, margin: 10}}
                source={require('../src/profile-user.png')}
              />
              <Text style={{margin: 10, color: 'red', fontWeight: 'bold'}}>
                Dr.Ankit Sir
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <Text
          style={{
            borderBottomColor: '#D3D3D3',
            borderBottomWidth: 2,
          }}></Text>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: '#f1f3f6',
          }}>
          <TouchableOpacity>
            <Image
              style={{width: 200, height: 100, margin: 10, borderRadius: 5}}
              source={require('../src/school.jpg')}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Text
              style={{
                margin: 20,
                fontSize: 15,
                fontWeight: 'bold',
                color: 'black',
              }}>
              Envy Theme
            </Text>
            <Text style={{marginLeft: 20}}>AI</Text>
            <View style={{flexDirection: 'row'}}>
              <Image
                style={{width: 20, height: 20, margin: 10}}
                source={require('../src/profile-user.png')}
              />
              <Text style={{margin: 10, color: 'red', fontWeight: 'bold'}}>
                Dr.Ankit Sir
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <Text
          style={{
            borderBottomColor: '#D3D3D3',
            borderBottomWidth: 2,
          }}></Text>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: '#f1f3f6',
            borderRadius: 10,
          }}>
          <TouchableOpacity>
            <Image
              style={{width: 200, height: 100, margin: 10, borderRadius: 5}}
              source={require('../src/school.jpg')}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Text
              style={{
                margin: 20,
                fontSize: 15,
                fontWeight: 'bold',
                color: 'black',
              }}>
              Envy Theme
            </Text>
            <Text style={{marginLeft: 20}}>AI</Text>
            <View style={{flexDirection: 'row'}}>
              <Image
                style={{width: 20, height: 20, margin: 10}}
                source={require('../src/profile-user.png')}
              />
              <Text style={{margin: 10, color: 'red', fontWeight: 'bold'}}>
                Dr.Ankit Sir
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <Text
          style={{
            borderBottomColor: '#D3D3D3',
            borderBottomWidth: 2,
          }}></Text>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: '#f1f3f6',
          }}>
          <TouchableOpacity>
            <Image
              style={{width: 200, height: 100, margin: 10, borderRadius: 5}}
              source={require('../src/school.jpg')}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Text
              style={{
                margin: 20,
                fontSize: 15,
                fontWeight: 'bold',
                color: 'black',
              }}>
              Envy Theme
            </Text>
            <Text style={{marginLeft: 20}}>AI</Text>
            <View style={{flexDirection: 'row'}}>
              <Image
                style={{width: 20, height: 20, margin: 10}}
                source={require('../src/profile-user.png')}
              />
              <Text style={{margin: 10, color: 'red', fontWeight: 'bold'}}>
                Dr.Ankit Sir
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <Text
          style={{
            borderBottomColor: '#D3D3D3',
            borderBottomWidth: 2,
          }}></Text>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: '#f1f3f6',
          }}>
          <TouchableOpacity>
            <Image
              style={{width: 200, height: 100, margin: 10, borderRadius: 5}}
              source={require('../src/school.jpg')}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Text
              style={{
                margin: 20,
                fontSize: 15,
                fontWeight: 'bold',
                color: 'black',
              }}>
              Envy Theme
            </Text>
            <Text style={{marginLeft: 20}}>AI</Text>
            <View style={{flexDirection: 'row'}}>
              <Image
                style={{width: 20, height: 20, margin: 10}}
                source={require('../src/profile-user.png')}
              />
              <Text style={{margin: 10, color: 'red', fontWeight: 'bold'}}>
                Dr.Ankit Sir
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <Text
          style={{
            borderBottomColor: '#D3D3D3',
            borderBottomWidth: 2,
          }}></Text>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: '#f1f3f6',
          }}>
          <TouchableOpacity>
            <Image
              style={{width: 200, height: 100, margin: 10, borderRadius: 5}}
              source={require('../src/school.jpg')}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Text
              style={{
                margin: 20,
                fontSize: 15,
                fontWeight: 'bold',
                color: 'black',
              }}>
              Envy Theme
            </Text>
            <Text style={{marginLeft: 20}}>AI</Text>
            <View style={{flexDirection: 'row'}}>
              <Image
                style={{width: 20, height: 20, margin: 10}}
                source={require('../src/profile-user.png')}
              />
              <Text style={{margin: 10, color: 'red', fontWeight: 'bold'}}>
                Dr.Ankit Sir
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
