import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Button,
  Platform,
} from 'react-native';
//import ImagePicker from 'react-native-image-picker';
import {Picker} from '@react-native-picker/picker';
import {Icon} from 'react-native-elements';
import {launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios';
import CustomHeader from './header/CustomHeader';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function EditCourse({route, navigation}) {
  const {id} = route.params;
  const [text, setText] = useState('');
  const [type, setType] = useState('');
  const [selectCategory, setSelectCategory] = useState('');
  const [desc, setDesc] = useState('');
  const [courseImg, setCourseImg] = useState('');
  const [posterImg, setPosterImg] = useState('');
  const [cat, setCat] = useState([]);
  const [viewCourse, setViewCourse] = useState({});

  // <=============View One Course Api====================>
  const getDetail = async () => {
    axios
      .get(`http://65.0.80.5:5000/api/admin/viewonecoursep/${id}`)
      .then(response => {
        console.log(response.data.data);
        setViewCourse(response.data.data);
        setText(response.data.data.course_title);
        setType(response.data.data.course_type);
        setDesc(response.data.data.desc);
        setCourseImg(response.data.data.course_image[0]);
        setPosterImg(response.data.data.posterimg[0]);
      })
      .catch(error => {
        console.log(error.response);
      });
  };
  // <=============Cateory List api====================>
  const catList = async () => {
    axios
      .get(`http://65.0.80.5:5000/api/admin/allCat`)
      .then(response => {
        console.log(response.data.data);
        setCat(response.data.data);
      })
      .catch(error => {
        console.log(error.response);
      });
  };
  useEffect(() => {
    getDetail();
    catList();
  }, []);
  // <=============Edit Course api====================>
  function updateCourse() {
    editCourse();
  }
  const editCourse = async () => {
    console.log(text, type, selectCategory, desc, courseImg, posterImg);
    let formdata = new FormData();
    formdata.append('course_title', text);
    formdata.append('course_type', type);
    formdata.append('category_id', selectCategory);
    formdata.append('desc', desc);
    formdata.append('course_image', courseImg.assets[0].base64);
    formdata.append('posterimg', posterImg.assets[0].base64);
    fetch(`http://65.0.80.5:5000/api/user/editcoursebystaff/${id}`, {
      method: 'post',
      headers: {
        'Content-Type': 'multipart/form-data',
        'staff-token': await AsyncStorage.getItem('staff-token'),
      },
      body: formdata,
    })
      .then(response => {
        response.json().then(res => {
          console.log(res);
          {
            res.message == 'success' && res.message === 'success'
              ? Alert.alert('Course Uploaded Successfully')
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

  // <=============image Picker ====================>

  const courseImage = type => {
    let options = {
      mediaType: 'photo',
      maxWidth: 100,
      maxHeight: 100,
      selectionLimit: 1,
      includeBase64: true,
    };
    launchImageLibrary(options, response => {
      console.log('Response = ', JSON.stringify(response));
      setCourseImg(response);
      console.log(response);
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

  const posterImage = type => {
    let options = {
      mediaType: 'photo',
      maxWidth: 100,
      maxHeight: 100,
      selectionLimit: 1,
      includeBase64: true,
    };
    launchImageLibrary(options, response => {
      console.log('Response = ', JSON.stringify(response));
      setPosterImg(response);
      console.log(response);
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
      <CustomHeader title="EDIT" navigation={navigation} />
      <ScrollView>
        <View style={styles.aaa}>
          <View style={styles.bbb}>
            <Text style={styles.ccc}>Course Title</Text>
            <TextInput
              style={styles.ddd}
              placeholder="Title"
              onChangeText={text => setText(text)}
              value={text}
              placeholderTextColor="black"
              color="black"
            />
          </View>
          <View style={styles.bbb}>
            <Text style={styles.ccc}>Course Type</Text>
            <Picker
              style={styles.ddd}
              selectedValue={type}
              onValueChange={(itemValue, itemIndex) => setType(itemValue)}>
              <Picker.Item label="Paid" value="paid" />
              <Picker.Item label="Free" value="free" />
            </Picker>
          </View>
          <View style={styles.bbb}>
            <Text style={styles.ccc}>Course Category</Text>
            <Picker
              style={styles.ddd}
              selectedValue={selectCategory}
              onValueChange={(itemValue, itemIndex) =>
                setSelectCategory(itemValue)
              }>
              {cat?.map(category => (
                <Picker.Item
                  key={category?._id}
                  label={category?.catName}
                  value={category?._id}
                />
              ))}
            </Picker>
          </View>
          <View style={styles.bbb}>
            <Text style={styles.ccc}>Discription</Text>
            <TextInput
              style={styles.descStyle}
              placeholder="Description of the Course"
              placeholderTextColor="#9FA4A5"
              color="black"
              multiline={true}
              onChangeText={desc => setDesc(desc)}
              value={desc}
            />
          </View>

          <View style={styles.bbb}>
            <Text style={styles.ccc}>Course Image</Text>
            <View style={styles.inputImage}>
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                  style={styles.form}
                  onPress={() => courseImage()}>
                  <Image
                    style={styles.capture}
                    source={require('../src/upload.png')}
                  />
                </TouchableOpacity>

                <TouchableOpacity style={styles.form}>
                  <Image
                    source={{uri: courseImg ? courseImg : null}}
                    style={{
                      height: 40,
                      width: 140,
                      justifyContent: 'center',
                      alignSelf: 'center',
                      flex: 1,
                    }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.bbb}>
            <Text style={styles.ccc}>Poster Image</Text>
            <View style={styles.inputImage}>
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                  style={styles.form}
                  onPress={() => posterImage()}>
                  <Image
                    style={styles.capture}
                    source={require('../src/upload.png')}
                  />
                </TouchableOpacity>

                <TouchableOpacity style={styles.form}>
                  <Image
                    source={{
                      uri: posterImg ? posterImg : null,
                    }}
                    style={{
                      height: 40,
                      width: 140,
                      justifyContent: 'center',
                      alignSelf: 'center',
                      flex: 1,
                    }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.bbb}>
            <TouchableOpacity style={styles.uploadBtn} onPress={updateCourse}>
              <Text style={styles.uploadText}>UPLOAD</Text>
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
    backgroundColor: '#E8E8E8',
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
    height: 100,
    width: 140,
    borderColor: 'black',
    borderWidth: 1,
    margin: 1,
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
