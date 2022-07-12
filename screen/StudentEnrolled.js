import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Modal,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Swiper from 'react-native-swiper';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
import {ListItem, Image} from 'react-native-elements';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NotifyHeader from './header/NotifyHeader';

export default function StudentEnrolled({navigation}) {
  const [enrolled, setEnrolled] = useState([]);

  const getNotify = async () => {
    axios
      .get(`http://65.0.80.5:5000/api/admin/enrollStudentbytoken`, {
        headers: {
          'staff-token': await AsyncStorage.getItem('staff-token'),
        },
      })
      .then(response => {
        const enrolled = response.data.data;
        setEnrolled(enrolled);
        console.log('@@@@@@@', enrolled);
      })
      .catch(error => {
        console.log(error.response);
      });
  };
  useEffect(() => {
    if (AsyncStorage.getItem('user-token')) {
      getNotify();
    }
  }, []);

  return (
    <SafeAreaView>
      <View style={{}}>
        <NotifyHeader title="ENROLLED" navigation={navigation} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            {enrolled?.map(enroll => (
              <ListItem
                key={enrolled?._id}
                bottomDivider
                onPress={() =>
                  navigation.navigate('NotifyDetail', {id: note._id})
                }>
                {/* <Icon name="user" color="black" size={25} /> */}
                <Image
                  source={enroll?.student_Id.userimg}
                  style={{
                    width: 50,
                    height: 50,
                    resizeMode: 'cover',
                  }}
                />
                <ListItem.Content>
                  <ListItem.Title>
                    {enroll?.student_Id?.fullname}
                  </ListItem.Title>
                  <ListItem.Subtitle style={{color: 'black'}}>
                    Course:- {enroll?.course_Id?.course_title}
                  </ListItem.Subtitle>
                </ListItem.Content>
              </ListItem>
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  storiesView: {
    paddingVertical: 10,
    paddingRight: 10,
    backgroundColor: '#fafafa',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    overflow: 'hidden',
  },
  storyContentView: {
    width: 90,
    height: 130,
    borderRadius: 10,
    borderColor: '#dfe4ea',
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  storyUserImage: {
    width: 40,
    height: 40,
    borderRadius: 100,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    width: '90%',
    height: '90%',
    borderRadius: 20,
    overflow: 'hidden',
  },
});
