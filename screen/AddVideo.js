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
  Button,
  Platform,
  Alert,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {Icon} from 'react-native-elements';
import NotifyHeader from './header/NotifyHeader';
import {launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AddVideo({navigation}) {
  const [title, setTitle] = useState('');
  const [selectCourse, setSelectCourse] = useState();
  const [videoImg, setvideoImg] = useState('');
  const [video, setVideo] = useState('');
  const [course, setCourse] = useState([]);

  // <=============Cateory List api====================>
  const courseList = async () => {
    axios
      .get('http://65.0.80.5:5000/api/admin/mycourses', {
        headers: {
          'staff-token': await AsyncStorage.getItem('staff-token'),
        },
      })
      .then(response => {
        console.log(response.data.data);
        setCourse(response.data.data);
      })
      .catch(error => {
        console.log(error.response);
      });
  };
  useEffect(() => {
    courseList();
  }, []);

  // <=======================Video And Image Upload ====================>

  const videoImage = type => {
    let options = {
      mediaType: 'photo',
      maxWidth: 200,
      maxHeight: 200,
      selectionLimit: 1,
      includeBase64: true,
    };
    launchImageLibrary(options, response => {
      console.log('response : ' + JSON.stringify(response));
      setvideoImg(response);
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
  const videoFile = type => {
    let options = {
      maxWidth: 100,
      maxHeight: 100,
      selectionLimit: 1,
      mediaType: 'video',
      videoQuality: 'high',
      includeBase64: true,
    };
    launchImageLibrary(options, response => {
      console.log('response : ' + JSON.stringify(response));
      setVideo(response);
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
  // <======================= Upload Video API ====================>
  function uploadVideo() {
    addVideo();
  }
  const addVideo = async () => {
    console.log(title, selectCourse, videoImg.assets[0].base64, video.assets);
    let formdata = new FormData();

    formdata.append('course', selectCourse);
    formdata.append('videoTitle', title);
    formdata.append('video_image', videoImg.assets[0].base64);
    formdata.append('video_file', JSON.stringify(video.assets));

    fetch('http://65.0.80.5:5000/api/admin/addvideo', {
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
              ? Alert.alert('Video Uploaded Successfully')
              : null;
          }
          setTitle('');
          setvideoImg('');
          setVideo('');
        });
      })
      .catch(err => {
        console.log('error');
      });
  };
  return (
    <SafeAreaView style={styles.container}>
      <NotifyHeader title="ADD VIDEO" navigation={navigation} />
      <ScrollView>
        <View style={styles.aaa}>
          <View style={styles.bbb}>
            <Text style={styles.ccc}>Course List</Text>
            <Picker
              style={styles.ddd}
              selectedValue={selectCourse}
              onValueChange={(itemValue, itemIndex) =>
                setSelectCourse(itemValue)
              }>
              <Picker.Item label="Select Course" />
              {course?.map(courses => (
                <Picker.Item
                  key={courses?._id}
                  label={courses?.course_title}
                  value={courses?._id}
                />
              ))}
            </Picker>
          </View>
          <View style={styles.bbb}>
            <Text style={styles.ccc}>Video Title</Text>
            <TextInput
              style={styles.ddd}
              placeholder="Title"
              onChangeText={title => setTitle(title)}
              defaultValue={title}
              placeholderTextColor="black"
              color="black"
            />
          </View>
          <View style={styles.bbb}>
            <Text style={styles.ccc}>Video Image</Text>
            <View style={styles.inputImage}>
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                  style={styles.form}
                  onPress={() => videoImage()}>
                  <Image
                    style={styles.capture}
                    source={require('../src/upload.png')}
                  />
                </TouchableOpacity>

                {/* {screenshot.assets[0].uri == '' &&
                screenshot.assets[0].uri == undefined &&
                screenshot.assets[0].uri == null ? (
                  <TouchableOpacity style={styles.form}>
                     <Image
                      source={{uri: `${screenshot.assets[0].uri}`}}
                      style={{
                        height: 200,
                        width: 60,
                        justifyContent: 'center',
                        alignSelf: 'center',
                        flex: 1,
                      }}
                    /> 
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity style={styles.form}>
                    <Image
                      source={{uri: `${screenshot.assets[0].uri}`}}
                      style={{
                        height: 200,
                        width: 60,
                        justifyContent: 'center',
                        alignSelf: 'center',
                        flex: 1,
                      }}
                    />
                  </TouchableOpacity>
                )} */}
              </View>
            </View>
          </View>
          <View style={styles.bbb}>
            <Text style={styles.ccc}>Video File</Text>
            <View style={styles.inputImage}>
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                  style={styles.form}
                  onPress={() => videoFile()}>
                  <Image
                    style={styles.capture}
                    source={require('../src/upload.png')}
                  />
                </TouchableOpacity>

                <TouchableOpacity style={styles.form}>
                  {/* <Image
                      source={{uri: `${screenshot.assets[0].uri}`}}
                      style={{
                        height: 200,
                        width: 60,
                        justifyContent: 'center',
                        alignSelf: 'center',
                        flex: 1,
                      }}
                    />  */}
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.bbb}>
            <TouchableOpacity style={styles.uploadBtn} onPress={uploadVideo}>
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
