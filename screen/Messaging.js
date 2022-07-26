import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  FlatList,
  Dimensions,
  Alert,
  Button,
  ActionSheetIOS,
} from 'react-native';
import CustomHeader from './header/CustomHeader';
import Moment from 'react-moment';
import moment from 'moment';

export default function Messaging({navigation, route}) {
  const {id} = route.params;
  console.log(id);
  const [currentUser] = useState({
    name: 'John Doe',
  });

  setInterval(() => {
    getChat();
  }, 50000);
  const getChat = async () => {
    axios
      .get(`http://65.0.80.5:5000/api/user/tcher_student_allchat/${id}`, {
        headers: {
          'staff-token': await AsyncStorage.getItem('staff-token'),
        },
      })
      .then(response => {
        console.log(response.data.data);
        setMessages(response.data.data);
      })
      .catch(error => {
        console.log(error);
      });
  };
  useEffect(() => {
    getChat();
  }, []);

  const sendMsg = async () => {
    console.log(inputMessage);
    axios
      .post(
        `http://65.0.80.5:5000/api/user/add_tchrchat/${id}`,
        {
          msg: inputMessage,
        },
        {
          headers: {
            'staff-token': await AsyncStorage.getItem('staff-token'),
          },
        },
      )
      .then(response => {
        console.log(response.data);
        getChat();
        setInputMessage('');
      })
      .catch(error => {
        console.log(error.response);
      });
  };

  const [messages, setMessages] = useState([]);
  // {sender: 'John Doe', message: 'Hey there!', time: '6:01 PM'},
  // {
  //   sender: 'Robert Henry',
  //   message: 'Hello, how are you doing?',
  //   time: '6:02 PM',
  // },
  // {
  //   sender: 'John Doe',
  //   message: 'I am good, how about you?',
  //   time: '6:02 PM',
  // },
  // {
  //   sender: 'John Doe',
  //   message: `😊😇`,
  //   time: '6:02 PM',
  // },
  // {
  //   sender: 'Robert Henry',
  //   message: `Can't wait to meet you.`,
  //   time: '6:03 PM',
  // },
  // {
  //   sender: 'John Doe',
  //   message: `That's great, when are you coming?`,
  //   time: '6:03 PM',
  // },
  // {
  //   sender: 'Robert Henry',
  //   message: `This weekend.`,
  //   time: '6:03 PM',
  // },
  // {
  //   sender: 'Robert Henry',
  //   message: `Around 4 to 6 PM.`,
  //   time: '6:04 PM',
  // },
  // {
  //   sender: 'John Doe',
  //   message: `Great, don't forget to bring me some mangoes.`,
  //   time: '6:05 PM',
  // },
  // {
  //   sender: 'Robert Henry',
  //   message: `Sure!`,
  //   time: '6:05 PM',
  // },

  const [inputMessage, setInputMessage] = useState('');

  function getTime(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }

  // function sendMessage() {
  //   if (inputMessage === '') {
  //     return setInputMessage('');
  //   }
  //   let t = getTime(new Date());
  //   setMessages([
  //     ...messages,
  //     {
  //       sender: currentUser.name,
  //       message: inputMessage,
  //       time: t,
  //     },
  //   ]);
  //   setInputMessage('');
  //}

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <CustomHeader navigation={navigation} />
        <FlatList
          style={{backgroundColor: 'white'}}
          inverted={true}
          data={JSON.parse(JSON.stringify(messages)).reverse()}
          renderItem={({item}) => (
            <TouchableWithoutFeedback>
              <View style={{marginTop: 6}}>
                <View
                  style={{
                    maxWidth: Dimensions.get('screen').width * 0.8,
                    backgroundColor: 'black',
                    alignSelf:
                      item.sender === currentUser.name
                        ? 'flex-end'
                        : 'flex-start',
                    marginHorizontal: 10,
                    padding: 10,
                    borderRadius: 8,
                    borderBottomLeftRadius:
                      item.sender === currentUser.name ? 8 : 0,
                    borderBottomRightRadius:
                      item.sender === currentUser.name ? 0 : 8,
                  }}>
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: 16,
                    }}>
                    {item.msg}
                  </Text>
                  <Text
                    style={{
                      color: '#dfe4ea',
                      fontSize: 14,
                      alignSelf: 'flex-end',
                    }}>
                    <Moment element={Text} fromNow>
                      {item.createdAt}
                    </Moment>
                  </Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
          )}
        />

        <View style={{paddingVertical: 10}}>
          <View style={styles.messageInputView}>
            {/* <TouchableOpacity style={{alignSelf: 'center'}}>
              <Image
                style={{width: 30, height: 30}}
                source={require('../src/image-gallery.png')}
                resizeMode="contain"
              />
            </TouchableOpacity> */}
            <TextInput
              defaultValue={inputMessage}
              style={styles.messageInput}
              placeholder="Message"
              onChangeText={text => setInputMessage(text)}
              value={inputMessage}
              placeholderTextColor="#003f5c"
              color="black"
            />
            <TouchableOpacity
              style={styles.messageSendView}
              onPress={() => {
                sendMsg();
              }}>
              <Image
                style={{width: 30, height: 30}}
                source={require('../src/send.png')}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
const styles = StyleSheet.create({
  headerLeft: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  userProfileImage: {height: '100%', aspectRatio: 1, borderRadius: 100},
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  messageInputView: {
    display: 'flex',
    flexDirection: 'row',
    marginHorizontal: 14,
    backgroundColor: '#f1f3f6',
    borderRadius: 4,
  },
  messageInput: {
    height: 40,
    flex: 1,
    paddingHorizontal: 10,
  },
  messageSendView: {
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
});
