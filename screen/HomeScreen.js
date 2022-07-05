import React, {useEffect, useState, useRef, useCallback} from 'react';
import {
  StyleSheet,
  Image,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ActivityIndicator} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen({navigation}) {
  const [dimension, setDimension] = useState(Dimensions.get('window'));
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [recent, setRecent] = useState([]);
  const [count, setCount] = useState({});
  const [studentCount, setStudentCount] = useState({});

  const getEnrollStudent = async () => {
    axios
      .get(`http://65.0.80.5:5000/api/admin/enrollStudentbytoken`, {
        headers: {
          'staff-token': await AsyncStorage.getItem('staff-token'),
        },
      })
      .then(response => {
        console.log(response.data);
        setStudentCount(response.data);
      })
      .catch(error => {
        console.log(error.response);
      });
  };

  const getCount = async () => {
    axios
      .get('http://65.0.80.5:5000/api/admin/mycourses', {
        headers: {
          'staff-token': await AsyncStorage.getItem('staff-token'),
        },
      })
      .then(response => {
        const count = response.data;
        setCount(count);
        //console.log(count);
      })
      .catch(error => {
        console.log(error.response);
      });
  };

  const getRecent = async () => {
    axios
      .get('http://65.0.80.5:5000/api/admin/mycourses', {
        headers: {
          'staff-token': await AsyncStorage.getItem('staff-token'),
        },
      })
      .then(response => {
        //console.log(response.data);
        const recent = response.data.data;
        setRecent(recent);
        //console.log(recent);
      })
      .catch(error => {
        console.log(error.response);
      });
  };

  useEffect(() => {
    getCount();
    if (AsyncStorage.getItem('staff-token')) {
      getEnrollStudent();
      getRecent();
      getCount();
    }
  }, []);

  const scrollRef = useRef();
  let intervalId = null;

  const onChange = () => {
    setDimension(Dimensions.get('window'));
  };

  useEffect(() => {
    Dimensions.addEventListener('change', onChange);
    return () => {};
  });

  const onSlideChange = useCallback(() => {
    // Calculate newIndex here and use it to update your state and to scroll to the new slide
    const newIndex =
      selectedIndex === carouselImages.length - 1 ? 0 : selectedIndex + 1;

    setSelectedIndex(newIndex);

    scrollRef?.current?.scrollTo({
      animated: true,
      y: 0,
      x: dimension.width * newIndex,
    });
  }, [selectedIndex]);

  const startInterval = useCallback(() => {
    intervalId = setInterval(onSlideChange, 3000);
  }, [onSlideChange]);

  useEffect(() => {
    startInterval();

    return () => {
      // Clear the interval when component unmounts, otherwise you could have memory leaks
      clearInterval(intervalId);
    };
  }, [onSlideChange]);

  const onTouchStart = () => {
    // As soon as the user touches the slide, stop the automatic sliding
    clearInterval(intervalId);
  };

  const onTouchEnd = () => {
    // As soon as the user stops touching the slide, releases it, start the automatic sliding again
    startInterval();
  };

  const carouselImages = [
    {image: require('../src/edu1.png')},
    {image: require('../src/edu2.png')},
    {image: require('../src/edu3.png')},
  ];

  const setIndex = event => {
    let viewSize = event.nativeEvent.layoutMeasurement.width;
    let contentOffset = event.nativeEvent.contentOffset.x;
    let carouselIndex = Math.floor(contentOffset / viewSize);
    setSelectedIndex(carouselIndex);
  };

  function CustomHeader({title, navigation}) {
    return (
      <View
        style={{
          flexDirection: 'row',
          height: 50,
          backgroundColor: '#f1f3f6',
          marginBottom: 5,
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'space-around',
            alignItems: 'flex-start',
            margin: 10,
          }}>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Icon name="indent" size={22} color="black" />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'space-around',
            alignItems: 'center',
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontWeight: '700',
              fontSize: 18,
              color: 'black',
            }}>
            {title}
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'space-around',
            alignItems: 'flex-end',
            margin: 10,
          }}>
          <TouchableOpacity>
            <Icon
              name="bell"
              color="black"
              size={22}
              onPress={() =>
                navigation.navigate('NotificationsScreen', {
                  name: 'NotificationsScreen',
                })
              }
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  return (
    <ScrollView>
      <SafeAreaView style={{flex: 1, backgroundColor: '#ffffff'}}>
        <CustomHeader title="Home" navigation={navigation} />

        <View style={styles.container}>
          <View
            style={{
              width: dimension.width,
              borderWidth: 1,
              marginBottom: 25,
            }}>
            <ScrollView
              horizontal
              ref={scrollRef}
              onMomentumScrollEnd={setIndex}
              showsHorizontalScrollIndicator={false}
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
              pagingEnabled>
              {carouselImages.map((value, key) => (
                <Image
                  source={value.image}
                  style={{
                    width: dimension?.width,
                    height: 200,
                    resizeMode: 'cover',
                  }}
                  PlaceholderContent={<ActivityIndicator />}
                />
              ))}
            </ScrollView>
          </View>
          <View>
            <View style={styles.cards}>
              <View style={styles.card1}>
                <Text style={styles.card11}>Enrolled</Text>
                <Text style={styles.card11}>{studentCount?.count}</Text>
              </View>
              <View style={styles.card2}>
                <Text style={styles.card22}>Courses</Text>
                <Text style={styles.card22}>{count?.count}</Text>
              </View>
            </View>
          </View>
          <Text style={styles.popular}>My Courses</Text>
          <ScrollView horizontal={true}>
            {recent.map(recents => (
              <View key={recents._id} style={styles.block}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('Details', {id: recents._id})
                  }>
                  <Image
                    style={styles.banner}
                    source={{uri: `${recents?.course_image}`}}
                  />
                  <Text style={styles.coursetitle}>
                    {recents?.course_title}
                  </Text>
                </TouchableOpacity>
                <View>
                  <TouchableOpacity
                    style={{flexDirection: 'row', margin: 12}}
                    onPress={() =>
                      navigation.navigate('Details', {id: recents._id})
                    }>
                    <Image
                      style={{width: 30, height: 30}}
                      source={{uri: `${recents?.teacher?.image}`}}
                    />
                    <Text
                      style={{
                        justifyContent: 'space-evenly',
                        marginLeft: 10,
                        color: 'black',
                      }}>
                      {recents?.teacher?.fullname}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.catType}>
                  <View>
                    <TouchableOpacity
                      style={{flexDirection: 'row', margin: 12}}
                      onPress={() =>
                        navigation.navigate('Details', {id: recents._id})
                      }>
                      <Text
                        style={{
                          marginLeft: 10,
                          color: 'black',
                        }}>
                        {recents?.category_id?.catName}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View>
                    <TouchableOpacity
                      style={{flexDirection: 'row', margin: 12}}
                      onPress={() =>
                        navigation.navigate('Details', {id: recents._id})
                      }>
                      <Text
                        style={{
                          marginLeft: 10,
                          color: 'black',
                          backgroundColor: 'yellow',
                          padding: 5,
                        }}>
                        {recents?.course_type}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  block: {
    borderColor: 'black',
    borderWidth: 1,
    margin: 4,
    width: 280,
    borderRadius: 10,
  },
  popular: {
    fontSize: 30,
    marginLeft: 10,
    fontWeight: 'bold',
    fontFamily: 'Cochin',
    color: 'black',
  },
  banner: {
    width: 265,
    height: 160,
    borderRadius: 15,
    borderWidth: 1,
    margin: 5,
    resizeMode: 'cover',
  },
  coursetitle: {
    marginLeft: 10,
    fontWeight: 'bold',
    fontSize: 15,
    color: 'black',
    textTransform: 'capitalize',
  },
  wrapper: {},
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  cards: {
    flex: 1,
    flexDirection: 'row',
  },
  card1: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#4B0082',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 15,
  },
  card11: {color: 'white', fontSize: 20},
  card2: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#4B0082',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 15,
  },
  card22: {color: 'white', fontSize: 20},
  catType: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
