import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Button,
  Platform,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import DatePicker from 'react-native-datepicker';
import {launchImageLibrary} from 'react-native-image-picker';
import Affiliate from './Affiliate';
import {useCamera} from 'react-native-camera-hooks';
import RNFS from 'react-native-fs';
import {RNCamera} from 'react-native-camera';

const SERVER_URL = 'http://localhost:3000';

const createFormData = (photo, body = {}) => {
  const data = new FormData();

  data.append('photo', {
    name: photo.fileName,
    type: photo.type,
    uri: Platform.OS === 'ios' ? photo.uri.replace('file://', '') : photo.uri,
  });

  Object.keys(body).forEach(key => {
    data.append(key, body[key]);
  });

  return data;
};

export function CameraKyc({navigation, getPath}) {
  console.log(getPath);
  const [{cameraRef}, {takePicture}] = useCamera(null);
  const [picturetaken, Setpicturetaken] = useState(false);
  const [base64image, Setbase64image] = useState();

  // console.log(RNCamera.cameraStatus);
  const changetocamera = () => {
    Setpicturetaken(false);
  };
  const captureHandle = async () => {
    console.log('clicked');

    try {
      const data = await takePicture();
      //const k = onPictureTaken();
      Setpicturetaken(true);
      console.log(data);
      console.log(data.uri);
      const filePath = data.uri;
      //filepath(filePath);
      const base65 = await RNFS.readFile(filePath, 'base64');
      console.log(base65);
      Setbase64image(base65);
      const newFilePath = RNFS.ExternalDirectoryPath + '/MyTest.jpg';
      RNFS.moveFile(filePath, newFilePath)
        .then(() => {
          console.log('IMAGE MOVED', filePath, '-- to --', newFilePath);
        })
        .catch(error => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.body}>
      {!picturetaken ? (
        <RNCamera
          ref={cameraRef}
          type={RNCamera.Constants.Type.back}
          style={styles.preview}>
          <Button
            title="Capture"
            color="#1eb900"
            onPress={() => captureHandle()}
          />
        </RNCamera>
      ) : (
        <>
          <Image
            style={{height: 500, marginLeft: 20}}
            source={{
              uri: `data:image/jpeg;base64,${base64image}`,
            }}
            resizeMode="contain"
          />
          <Button
            title="Upload"
            color="#1eb900"
            onPress={() => changetocamera()}></Button>
        </>
      )}
    </View>
  );
}

export default function KycScreen({navigation}) {
  const [checked, setChecked] = useState(0);
  var gender = ['Male', 'Female'];
  const [date, setDate] = useState('');
  const [passwordSecured, setPasswordSecured] = useState(true);

  const [photo, setPhoto] = React.useState(null);

  const handleChoosePhoto = () => {
    launchImageLibrary({noData: true}, response => {
      // console.log(response);
      if (response) {
        setPhoto(response);
      }
    });
  };

  const handleUploadPhoto = () => {
    fetch(`${SERVER_URL}/api/upload`, {
      method: 'POST',
      body: createFormData(photo, {userId: '123'}),
    })
      .then(response => response.json())
      .then(response => {
        console.log('response', response);
      })
      .catch(error => {
        console.log('error', error);
      });
  };

  function CustomHeader({title, navigation}) {
    return (
      <View
        style={{
          flexDirection: 'row',
          height: 50,
          backgroundColor: 'white',
          marginBottom: 5,
        }}>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Image
              style={{width: 35, height: 35, marginLeft: 20}}
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
    <ScrollView style={styles.container}>
      <CustomHeader title="" navigation={navigation} />
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{fontSize: 30, fontWeight: 'bold', color: 'black'}}>
          Kyc Form
        </Text>
      </View>
      <View>
        <Text
          style={{
            color: 'black',
            fontSize: 15,
            fontWeight: 'bold',
            margin: 20,
          }}>
          Name
        </Text>
        <View style={styles.inputView}>
          <Image
            style={{width: 20, height: 20, marginLeft: 10}}
            source={require('../src/user.png')}
          />
          <TextInput
            style={{paddingHorizontal: 12}}
            placeholder="Name"
            textContentType="text"
          />
        </View>
        <View>
          <Text
            style={{
              color: 'black',
              fontSize: 15,
              fontWeight: 'bold',
              margin: 20,
            }}>
            Gender
          </Text>
          <View style={styles.btn}>
            {gender.map((gender, key) => {
              return (
                <View key={gender}>
                  {checked == key ? (
                    <TouchableOpacity style={styles.btn}>
                      <Image
                        style={styles.img}
                        source={require('../src/togle.png')}
                      />
                      <Text>{gender}</Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      onPress={() => {
                        setChecked(key);
                      }}
                      style={styles.btn}>
                      <Image
                        style={styles.img}
                        source={require('../src/tog.png')}
                      />
                      <Text>{gender}</Text>
                    </TouchableOpacity>
                  )}
                </View>
              );
            })}
          </View>
          {/* <Text>{gender[checked]}</Text> */}
          <View>
            <Text
              style={{
                color: 'black',
                fontSize: 15,
                fontWeight: 'bold',
                margin: 20,
              }}>
              Date Of Birth
            </Text>
            <TouchableOpacity>
              <DatePicker
                style={{
                  width: '90%',
                  marginLeft: 20,
                  backgroundColor: '#f1f3f6',
                  height: 50,
                }}
                date={date}
                placeholder="Select Date"
                format="DD-MM-YYYY"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                onDateChange={d => setDate(d)}
                customStyles={{
                  dateInput: {
                    borderWidth: 0,
                  },
                  dateText: {
                    color: 'black',
                  },
                }}
              />
            </TouchableOpacity>
          </View>
          {/* date pikar and */}
          <View>
            <Text
              style={{
                color: 'black',
                fontSize: 15,
                fontWeight: 'bold',
                margin: 20,
              }}>
              Nationality
            </Text>
            <TouchableOpacity style={styles.state}>
              <Text>Nationality</Text>
            </TouchableOpacity>
          </View>
          <View>
            <Text
              style={{
                color: 'black',
                fontSize: 15,
                fontWeight: 'bold',
                margin: 20,
              }}>
              Type Aadhar/virtual Number
            </Text>
            {/* <CameraKyc getPath={'abcsdaj'} /> */}
            <View>
              <TextInput
                style={styles.cemra}
                placeholder=" Type Aadhaar Number"
                keyboardType="numeric"
              />
            </View>
          </View>
          <Text
            style={{
              color: 'black',
              fontSize: 15,
              fontWeight: 'bold',
              margin: 20,
            }}>
            Upload Document Image
          </Text>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity style={styles.form}>
              <Image
                style={{
                  width: 40,
                  height: 40,
                  alignSelf: 'center',
                  justifyContent: 'center',
                  marginTop: 30,
                }}
                source={require('../src/upload.png')}
              />
              <Text
                style={{
                  flex: 1,
                  alignSelf: 'center',
                }}>
                Front
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.form}>
              <Image
                style={{
                  width: 40,
                  height: 40,
                  alignSelf: 'center',
                  justifyContent: 'center',
                  marginTop: 30,
                }}
                source={require('../src/upload.png')}
              />
              <Text
                style={{
                  flex: 1,
                  alignSelf: 'center',
                }}>
                Back
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text
          style={{
            color: 'black',
            fontSize: 15,
            fontWeight: 'bold',
            margin: 20,
          }}>
          Selfie With Id Proof
        </Text>
        <View>
          <TouchableOpacity>
            <Image
              style={{
                width: 40,
                height: 40,
                alignSelf: 'center',
                justifyContent: 'center',
                marginTop: 30,
              }}
              source={require('../src/camera.png')}
            />
          </TouchableOpacity>
        </View>
        <Text>{'\n'}</Text>
        <TouchableOpacity style={styles.logbut}>
          <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>
            Submit
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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
  radio: {
    flexDirection: 'row',
  },
  img: {
    height: 20,
    width: 20,
    marginHorizontal: 5,
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f3f6',
    height: 55,
    width: '90%',
    marginLeft: 20,
  },
  chosepht: {
    backgroundColor: '#f1f3f6',
    width: '90%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  state: {
    backgroundColor: '#f1f3f6',
    width: '90%',
    height: 50,
    marginLeft: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cemra: {
    backgroundColor: '#f1f3f6',
    width: '90%',
    height: 50,
    marginLeft: 20,
    justifyContent: 'center',
  },
  body: {
    flex: 1,
  },
  preview: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  form: {
    backgroundColor: '#f1f3f6',
    height: 100,
    width: '50%',
    margin: 10,
    flex: 1,
  },
});
