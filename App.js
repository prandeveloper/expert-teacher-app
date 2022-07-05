import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import {Text, View, Image, ScrollView, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {Icon} from 'react-native-elements';
import ChatScreen from './screen/ChatScreen';
import Courses from './screen/Courses';
import Affiliate from './screen/Affiliate';
import HomeScreen from './screen/HomeScreen';
import About from './screen/About';
import SplashScreen from './screen/SplashScreen';
import LogIn from './screen/LogIn';
import SecondScreen from './screen/SecondScreen';
import Register from './screen/Register';
import NotificationsScreen from './screen/NotificationsScreen';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import KycScreen, {CameraKyc} from './screen/KycScreen';
import Messaging from './screen/Messaging';
import HomeDetails from './screen/HomeDetails';
import ProfileEdit from './screen/ProfileEdit';
import OneTimeUpload from './screen/OneTimeUpload';
import UploadCourse from './screen/UploadCourse';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import TermsScreen from './screen/TermsScreen';
import Contact from './screen/Contact';
import CourseList from './screen/CourseList';
import EditCourse from './screen/EditCourse';
import AddVideo from './screen/AddVideo';
import AddPdf from './screen/AddPdf';
import FullScreen from './screen/FullScreen';
import PdfRead from './screen/PdfRead';
import SeeMore from './screen/SeeMore';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const navOptionHandler = () => ({
  headerShown: false,
});

const crteStackNav = createStackNavigator();

function TabScreen() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: 'black',
        labelStyle: {
          fontSize: 15,
        },
      }}
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused
              ? require('./src/homa.png')
              : require('./src/homee.png');
          } else if (route.name === 'Upload') {
            iconName = focused
              ? require('./src/book1.png')
              : require('./src/books.png');
          }
          if (route.name === 'Chat') {
            iconName = focused
              ? require('./src/chat.png')
              : require('./src/chats.png');
          } else if (route.name === 'Course') {
            iconName = focused
              ? require('./src/book.png')
              : require('./src/book.png');
          }
          if (route.name === 'Profile') {
            iconName = focused
              ? require('./src/profile-user.png')
              : require('./src/new.png');
          }

          // You can return any component that you like here!
          return (
            <Image
              source={iconName}
              style={{width: 25, height: 25}}
              resizeMode="contain"
            />
          );
        },
        activeTintColor: 'tomato',
        inactiveTintColor: 'black',
      })}
      options={{headerShown: false}}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Upload"
        component={UploadCourse}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Chat"
        component={ChatScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Course"
        component={CourseList}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Profile"
        component={Affiliate}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
}
const MyTab = ({component}) => (
  <crteStackNav.Navigator>
    <crteStackNav.Screen name={'Home'} options={{headerShown: false}}>
      {component}
    </crteStackNav.Screen>
  </crteStackNav.Navigator>
);

const myTabs = ({navigation}) => <MyTab component={() => TabScreen()} />;

function TabNavigation({navigation}) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Splash"
        component={SplashScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Login"
        component={LogIn}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="OneTimeUpload"
        component={OneTimeUpload}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Second"
        component={SecondScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="StackHome"
        component={myTabs}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Chat"
        component={ChatScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AddVideo"
        component={AddVideo}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AddPdf"
        component={AddPdf}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="About"
        component={About}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="TermsScreen"
        component={TermsScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Contact"
        component={Contact}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CameraKyc"
        component={CameraKyc}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Messaging"
        component={Messaging}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Details"
        component={HomeDetails}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="EditCourse"
        component={EditCourse}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="FullScreen"
        component={FullScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PdfRead"
        component={PdfRead}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileEdit}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SeeMore"
        component={SeeMore}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="NotificationsScreen"
        component={NotificationsScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

const App = ({navigation}) => {
  const [user, setUser] = useState({});

  const getUser = async () => {
    axios
      .get('http://65.0.80.5:5000/api/user/myprofileStaff', {
        headers: {
          'staff-token': await AsyncStorage.getItem('staff-token'),
        },
      })
      .then(response => {
        const user = response.data.data;
        setUser(user);
        console.log(user);
      })
      .catch(error => {
        console.log(error.response);
      });
  };
  useEffect(() => {
    if (AsyncStorage.getItem('staff-token')) {
      getUser();
    }
  }, []);

  const CustomContentContent = ({navigation}) => {
    return (
      <SafeAreaView>
        <View
          style={{
            flexDirection: 'row',
            borderBottomColor: '#C8BDBD',
            borderBottomWidth: 1,
            height: 150,
          }}>
          <View style={{alignSelf: 'center'}}>
            <TouchableOpacity>
              <Image
                source={{uri: `${user?.image}`}}
                resizeMode="contain"
                style={{width: 70, height: 70}}
              />
            </TouchableOpacity>
          </View>
          <View style={{alignSelf: 'center', marginLeft: 10}}>
            <Text
              style={{
                fontSize: 25,
                fontWeight: 'bold',
                color: 'black',
              }}>
              {user?.fullname}
            </Text>
            <View style={{flexDirection: 'row'}}>
              <Text style={{color: 'black', padding: 5}}>{user?.email}</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                <Icon name="edit" type="font-awesome" size={24} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <ScrollView>
          <View>
            <View
              style={{
                flexDirection: 'row',
                borderBottomColor: '#D3D3D3',
                borderBottomWidth: 1,
              }}>
              <View style={{margin: 10}}>
                {/* <Image
                style={{
                  width: 20,
                  height: 20,
                }}
                source={require('./src/homa.png')}
                resizeMode="contain"
              /> */}
                <Icon name="home" type="font-awesome" size={24} />
              </View>
              <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                <Text
                  style={{
                    fontSize: 18,
                    color: 'black',
                    margin: 10,
                  }}>
                  Home
                </Text>
              </TouchableOpacity>
            </View>

            {/* <View
            style={{
              flexDirection: 'row',
              borderBottomColor: '#D3D3D3',
              borderBottomWidth: 1,
            }}>
            <View style={{margin: 10}}>
              <Image
                style={{
                  width: 20,
                  height: 20,
                }}
                source={require('./src/chat.png')}
                resizeMode="contain"
              />
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('Chat')}>
              <Text
                style={{
                  fontSize: 18,
                  color: 'black',
                  margin: 10,
                }}>
                Chat
              </Text>
            </TouchableOpacity>
          </View>
           <View
            style={{
              flexDirection: 'row',
              borderBottomColor: '#D3D3D3',
              borderBottomWidth: 1,
            }}>
            <View style={{margin: 10}}>
              <Image
                style={{
                  width: 20,
                  height: 20,
                }}
                source={require('./src/user-search.png')}
                resizeMode="contain"
              />
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('Kyc')}>
              <Text
                style={{
                  fontSize: 18,
                  color: 'black',
                  margin: 10,
                }}>
                Kyc Form
              </Text>
            </TouchableOpacity>
          </View> */}
            <View
              style={{
                flexDirection: 'row',
                borderBottomColor: '#D3D3D3',
                borderBottomWidth: 1,
              }}>
              <View style={{margin: 10}}>
                <Icon name="plus" type="font-awesome" size={24} />
              </View>
              <TouchableOpacity onPress={() => navigation.navigate('AddVideo')}>
                <Text
                  style={{
                    fontSize: 18,
                    color: 'black',
                    margin: 10,
                  }}>
                  Add Video
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: 'row',
                borderBottomColor: '#D3D3D3',
                borderBottomWidth: 1,
              }}>
              <View style={{margin: 10}}>
                <Icon name="plus" type="font-awesome" size={24} />
              </View>
              <TouchableOpacity onPress={() => navigation.navigate('AddPdf')}>
                <Text
                  style={{
                    fontSize: 18,
                    color: 'black',
                    margin: 10,
                  }}>
                  Add PDF
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: 'row',
                borderBottomColor: '#D3D3D3',
                borderBottomWidth: 1,
              }}>
              <View style={{margin: 10}}>
                <Icon name="money" type="font-awesome" size={24} />
              </View>
              <TouchableOpacity
                onPress={() => navigation.navigate('reference')}>
                <Text
                  style={{
                    fontSize: 18,
                    color: 'black',
                    margin: 10,
                  }}>
                  Reference & earn
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: 'row',
                borderBottomColor: '#D3D3D3',
                borderBottomWidth: 1,
              }}>
              <View style={{margin: 10}}>
                <Icon name="info" type="font-awesome" size={24} />
              </View>
              <TouchableOpacity onPress={() => navigation.navigate('About')}>
                <Text
                  style={{
                    fontSize: 18,
                    color: 'black',
                    margin: 10,
                  }}>
                  About Us
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: 'row',
                borderBottomColor: '#D3D3D3',
                borderBottomWidth: 1,
              }}>
              <View style={{margin: 10}}>
                <Icon name="list" type="font-awesome" size={24} />
              </View>
              <TouchableOpacity
                onPress={() => navigation.navigate('TermsScreen')}>
                <Text
                  style={{
                    fontSize: 18,
                    color: 'black',
                    margin: 10,
                  }}>
                  Terms & Conditions
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: 'row',
                borderBottomColor: '#D3D3D3',
                borderBottomWidth: 1,
              }}>
              <View style={{margin: 10}}>
                <Icon name="phone" type="font-awesome" size={24} />
              </View>
              <TouchableOpacity onPress={() => navigation.navigate('Contact')}>
                <Text
                  style={{
                    fontSize: 18,
                    color: 'black',
                    margin: 10,
                  }}>
                  Contact Us
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
        <View
          style={{
            flexDirection: 'row',
            borderBottomColor: '#D3D3D3',
            borderBottomWidth: 1,
          }}>
          <View style={{margin: 10}}>
            <Icon name="power-off" type="font-awesome" size={24} />
          </View>
          <TouchableOpacity
            onPress={async () => {
              navigation.closeDrawer();
              //navigation.dispatch(StackActions.push('Login'));
              console.log('<<<<<<<<<<<');
              navigation.reset({
                index: 0,
                routes: [{name: 'Login'}],
              });
              // navigation.replace('Login');
              console.log('>>>>>>>>>>>');
              await AsyncStorage.removeItem('staff-token');
            }}>
            <Text
              style={{
                fontSize: 18,
                color: 'black',
                margin: 10,
              }}>
              Logout
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  };
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Home"
        drawerContent={props => CustomContentContent(props)}>
        <Drawer.Screen
          name="Tab"
          component={TabNavigation}
          options={{headerShown: false, swipeEnabled: false}}
        />
        <Drawer.Screen
          name="Notification"
          component={NotificationsScreen}
          options={{headerShown: false}}
        />
        <Drawer.Screen
          name="Kyc"
          component={KycScreen}
          options={{headerShown: false}}
        />
        <Drawer.Screen
          name="Course"
          component={CourseList}
          options={{headerShown: false}}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default App;
