import React, {useState, useCallback, useRef, useEffect} from 'react';
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
import {Icon} from 'react-native-elements';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NotifyHeader from './header/NotifyHeader';
import {color} from 'react-native-reanimated';

export default function CourseList({navigation}) {
  const [playing, setPlaying] = useState(false);
  const [course, setCourse] = useState([]);

  // All Courses
  const getAllCourse = async () => {
    axios
      .get('http://65.0.80.5:5000/api/admin/mycourses', {
        headers: {
          'staff-token': await AsyncStorage.getItem('staff-token'),
        },
      })
      .then(response => {
        setCourse(response.data.data);
        console.log(response.data.data);
      })
      .catch(error => {
        console.log(error.response);
      });
  };
  useEffect(() => {
    getAllCourse();
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: '#F2F2F5'}}>
      <NotifyHeader title="ALL COURSE" navigation={navigation} />
      <ScrollView>
        {course.map(courses => (
          <View key={courses._id} style={styles.mainView}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Details', {
                  id: courses?._id,
                })
              }>
              <Image
                style={{width: 150, height: 100, margin: 10, borderRadius: 5}}
                source={{uri: `${courses?.course_image}`}}
              />
            </TouchableOpacity>
            <View>
              <Text style={styles.courseTitle}>{courses?.course_title}</Text>

              <View style={styles.teacherView}>
                <View style={styles.iconStyle}>
                  <Icon
                    reverse
                    name="eye"
                    type="font-awesome"
                    size={18}
                    color="green"
                    onPress={() =>
                      navigation.navigate('Details', {id: courses?._id})
                    }
                  />
                </View>
                <View style={styles.iconStyle}>
                  <Icon
                    reverse
                    name="edit"
                    type="font-awesome"
                    size={18}
                    color="blue"
                    onPress={() =>
                      navigation.navigate('EditCourse', {id: courses?._id})
                    }
                  />
                </View>
                <View>
                  <Icon
                    reverse
                    name="trash"
                    type="font-awesome"
                    size={18}
                    color="red"
                    onPress={() =>
                      axios
                        .get(
                          `http://65.0.80.5:5000/api/admin/deletecourse/${courses._id}`,
                        )
                        .then(response => {
                          console.log(response.data);
                        })
                        .catch(error => {
                          console.log(error);
                        })
                    }
                  />
                </View>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainView: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    margin: 5,
    borderWidth: 0,
    shadowColor: '#171717',
    shadowOffset: {width: -3, height: 5},
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  courseTitle: {
    margin: 10,
    marginBottom: 20,
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    width: 150,
    textTransform: 'capitalize',
  },

  teacherView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  iconStyle: {},
});
