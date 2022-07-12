import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Button,
  Platform,
  Alert,
} from 'react-native';
import DatePicker from 'react-native-datepicker';
import {launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios';
import NotifyHeader from './header/NotifyHeader';
import {Picker} from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Affiliate({navigation}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordSecured, setPasswordSecured] = useState(true);
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState('');
  const [city, setCity] = useState('');
  const [myState, setMyState] = useState('');
  const [institute, setInstitute] = useState('');
  const [profileImg, setProfileImg] = useState('');
  const [oneStaff, setOneStaff] = useState({});

  // <=========================View One Profile Api ==================>
  const viewStaff = async () => {
    axios
      .get(`http://65.0.80.5:5000/api/admin/viewonestaffbytoken`, {
        headers: {
          'staff-token': await AsyncStorage.getItem('staff-token'),
        },
      })
      .then(response => {
        console.log(response.data);
        setOneStaff(response.data.data);
        setName(response.data.data.fullname);
        setEmail(response.data.data.email);
        setMobile(JSON.stringify(response.data.data.mobile));
        setPassword(response.data.data.password);
        setConfirmPassword(response.data.data.cnfmPassword);
        setGender(response.data.data.gender);
        setDob(response.data.data.dob);
        setCity(response.data.data.city);
        setMyState(response.data.data.state);
        setInstitute(response.data.data.institute);
        setProfileImg(response.data.data.image);
      })
      .catch(error => {
        console.log(error);
      });
  };
  useEffect(() => {
    viewStaff();
  }, []);
  // <=========================Edit  Profile Api ==================>
  function profileUpdate() {
    updateStaff();
  }
  const updateStaff = async () => {
    let data = new FormData();
    data.append('fullname', name);
    data.append('email', email);
    data.append('mobile', mobile);
    data.append('password', password);
    data.append('cnfmPassword', confirmPassword);
    data.append('gender', gender);
    data.append('dob', dob);
    data.append('city', city);
    data.append('state', myState);
    data.append('institute', institute);
    data.append('image', profileImg.assets[0].base64);

    fetch(`http://65.0.80.5:5000/api/user/settingbytoken`, {
      method: 'post',
      headers: {
        'Content-Type': 'multipart/form-data',
        'staff-token': await AsyncStorage.getItem('staff-token'),
      },
      body: data,
    })
      .then(response => {
        response.json().then(res => {
          console.log(res);
          {
            res.message == 'success' && res.message === 'success'
              ? Alert.alert('Profile Uploaded Successfully')
              : null;
          }
          // setTitle('');
          // setvideoImg('');
          // setVideo('');
        });
      })
      .catch(err => {
        console.log('error');
      });
  };
  // <=========================Image Picker ==================>
  const ProfileImage = type => {
    let options = {
      mediaType: 'photo',
      maxWidth: 300,
      maxHeight: 300,
      selectionLimit: 1,
      includeBase64: true,
    };
    launchImageLibrary(options, response => {
      console.log('response : ' + JSON.stringify(response));
      setProfileImg(response);
      if (response.didCancel) {
        alert('User cancelled camera picker');
        return;
      } else if (response.errorCode == 'camera_unavailable') {
        alert('Camera not available on device');
        return;
      } else if (response.errorCode == 'permission') {
        alert('Permission not satisfied');
        return;
      } else if (response.errorCode == 'others') {
        alert(response.errorMessage);
        return;
      }
    });
  };
  return (
    <SafeAreaView style={styles.container}>
      <NotifyHeader title="PROFILE" navigation={navigation} />
      <ScrollView>
        <View style={styles.aaa}>
          <View style={styles.bbb}>
            <Text style={styles.ccc}>Name</Text>
            <TextInput
              style={styles.ddd}
              placeholder="Name"
              onChangeText={name => setName(name)}
              defaultValue={name}
              placeholderTextColor="black"
              color="black"
            />
          </View>
          <View style={styles.bbb}>
            <Text style={styles.ccc}>Email</Text>
            <TextInput
              style={styles.ddd}
              placeholder="Email"
              onChangeText={email => setEmail(email)}
              defaultValue={email}
              placeholderTextColor="black"
              color="black"
            />
          </View>
          <View style={styles.bbb}>
            <Text style={styles.ccc}>Mobile No</Text>
            <TextInput
              style={styles.ddd}
              placeholder="Mobile"
              onChangeText={mobile => setMobile(mobile)}
              defaultValue={mobile}
              placeholderTextColor="black"
              color="black"
            />
          </View>
          <View style={styles.bbb}>
            <Text style={styles.ccc}>Password</Text>
            <View style={styles.passInput}>
              <TextInput
                style={{flex: 1, paddingHorizontal: 12}}
                placeholder={'password'}
                secureTextEntry={passwordSecured}
                onChangeText={setPassword}
                value={password}
                textContentType="password"
                placeholderTextColor={'#7A7A81'}
                color="black"
              />
              <TouchableOpacity
                style={{padding: 4}}
                onPress={() => {
                  setPasswordSecured(!passwordSecured);
                }}>
                <Icon name="eye" color="black" size={20} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.bbb}>
            <Text style={styles.ccc}>Confirm Password</Text>
            <View style={styles.passInput}>
              <TextInput
                style={{flex: 1, paddingHorizontal: 10}}
                placeholder={'Confirm password'}
                secureTextEntry={passwordSecured}
                onChangeText={setConfirmPassword}
                value={confirmPassword}
                textContentType="password"
                placeholderTextColor={'#7A7A81'}
                color="black"
              />
              <TouchableOpacity
                style={{padding: 4}}
                onPress={() => {
                  setPasswordSecured(!passwordSecured);
                }}>
                <Icon name="eye" color="black" size={20} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.bbb}>
            <Text style={styles.ccc}>Gender</Text>
            <Picker
              style={styles.ddd}
              selectedValue={gender}
              onValueChange={(itemValue, itemIndex) => setGender(itemValue)}>
              <Picker.Item label="Select Gender......" />
              <Picker.Item label="Male" value="male" />
              <Picker.Item label="Female" value="female" />
              <Picker.Item label="Other" value="other" />
            </Picker>
          </View>
          <View style={styles.bbb}>
            <Text style={styles.ccc}>Date Of Birth</Text>
            <TouchableOpacity>
              <DatePicker
                style={{
                  width: '100%',
                  backgroundColor: '#f1f3f6',
                  height: 50,
                }}
                date={dob}
                placeholder="Select Date"
                format="DD-MM-YYYY"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                onDateChange={d => setDob(d)}
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
          <View style={styles.bbb}>
            <Text style={styles.ccc}>City</Text>
            <TextInput
              style={styles.ddd}
              placeholder="City"
              onChangeText={city => setCity(city)}
              defaultValue={city}
              placeholderTextColor="black"
              color="black"
            />
          </View>
          <View style={styles.bbb}>
            <Text style={styles.ccc}>State</Text>
            <TextInput
              style={styles.ddd}
              placeholder="State"
              onChangeText={myState => setMyState(myState)}
              defaultValue={myState}
              placeholderTextColor="black"
              color="black"
            />
          </View>
          <View style={styles.bbb}>
            <Text style={styles.ccc}>Institute</Text>
            <TextInput
              style={styles.ddd}
              placeholder="Institute"
              onChangeText={institute => setInstitute(institute)}
              defaultValue={institute}
              placeholderTextColor="black"
              color="black"
            />
          </View>

          <View style={styles.bbb}>
            <Text style={styles.ccc}>Profile Image</Text>
            <View style={styles.inputImage}>
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                  style={styles.form}
                  onPress={() => ProfileImage()}>
                  <Image
                    style={styles.capture}
                    source={require('../src/upload.png')}
                  />
                </TouchableOpacity>

                {/* <TouchableOpacity style={styles.form}>
                  <Image
                    source={{
                      uri: profileImg ? profileImg : null,
                    }}
                    style={{
                      height: 200,
                      width: 60,
                      justifyContent: 'center',
                      alignSelf: 'center',
                      flex: 1,
                    }}
                  />
                  <Text style={{color: 'black'}}>
                    {profileImg?.assets[0].fileName}
                  </Text>
                </TouchableOpacity> */}
              </View>
            </View>
          </View>

          <View style={styles.bbb}>
            <TouchableOpacity style={styles.uploadBtn} onPress={profileUpdate}>
              <Text style={styles.uploadText}>UPDATE</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  passInput: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
  },
  aaa: {
    margin: 15,
  },
  bbb: {
    margin: 15,
  },
  ccc: {
    color: 'black',
    fontWeight: '600',
    marginBottom: 5,
  },
  ddd: {
    height: 50,
    color: '#000',
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  descStyle: {
    height: 100,
    paddingVertical: 10,
    textAlignVertical: 'top',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
  },
  dropdown: {
    height: 50,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
  },

  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
    color: '#9FA4A5',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: 'black',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    color: 'black',
  },

  form: {
    backgroundColor: 'white',
    height: 120,
    width: 140,
    margin: 2,
  },
  capture: {
    width: 40,
    height: 40,
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  uploadBtn: {
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 50,
    borderRadius: 10,
  },
  uploadText: {
    color: 'white',
    fontWeight: '600',
  },
});
