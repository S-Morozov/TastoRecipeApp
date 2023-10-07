import React, {useContext, useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import {mediaUrl} from '../../utils/app-config';
import {formatDate} from '../../utils/functions';
import {Text, Button} from '@rneui/themed';
import {Video} from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFavourite, useUser} from '../../hooks/ApiHooks';
import {MainContext} from '../../contexts/MainContext';
import * as ScreenOrientation from 'expo-screen-orientation';
import {
  ScrollView,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {FontAwesome} from '@expo/vector-icons';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StatusBar} from 'expo-status-bar';

const RecipeDetailsScreen = ({route, navigation}) => {
  const [owner, setOwner] = useState({});
  const [userLike, setUserLike] = useState(false);
  const {user} = useContext(MainContext);
  const {getUserById} = useUser();
  const {postFavourite, getFavouritesById, deleteFavourite} = useFavourite();
  const [likes, setLikes] = useState([]);

  const videoRef = useRef(null);

  const {
    title,
    description,
    filename,
    time_added: timeAdded,
    user_id: userId,
    filesize,
    media_type: mediaType,
    file_id: fileId,
  } = route.params;

  // fetch owner info
  const fetchOwner = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const ownerData = await getUserById(userId, token);
      setOwner(ownerData);
    } catch (error) {
      console.error(error.message);
    }
  };

  // add favourite
  const createFavourite = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await postFavourite({file_id: fileId}, token);
      response && setUserLike(true);
    } catch (error) {
      console.error(error.message);
    }
  };

  // delete favourite
  const removeFavourite = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await deleteFavourite(fileId, token);
      response && setUserLike(false);
    } catch (error) {
      console.error(error.message);
    }
  };

  // get favouritesbyid
  const fetchLikes = async () => {
    try {
      const likesData = await getFavouritesById(fileId);
      setLikes(likesData);
      // check if userid stored in context is in likesData
      likesData.forEach((like) => {
        if (like.user_id === user.user_id) {
          setUserLike(true);
        }
      });
    } catch (error) {
      console.error(error.message);
    }
  };

  // fullscreen video on landscape
  const unlockOrientation = async () => {
    try {
      await ScreenOrientation.unlockAsync();
    } catch (error) {
      console.error(error.message);
    }
  };

  const lockOrientation = async () => {
    try {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT_UP,
      );
    } catch (error) {
      console.error(error.message);
    }
  };

  const showVideoInFullscreen = async () => {
    try {
      await videoRef.current.presentFullscreenPlayer();
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    unlockOrientation();
    fetchOwner();

    // fullscreen video on landscape
    const orientSub = ScreenOrientation.addOrientationChangeListener(
      (event) => {
        if (event.orientationInfo.orientation > 2) {
          videoRef.current && showVideoInFullscreen();
        }
      },
    );

    return () => {
      ScreenOrientation.removeOrientationChangeListener(orientSub);
      lockOrientation();
    };
  }, []);

  useEffect(() => {
    fetchLikes();
  }, [userLike]);

  // Map the data to the new structure
  return (
    <ScrollView
      style={{flex: 1}}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{paddingBottom: 30}}
    >
      <StatusBar style={'light'} />

      <View style={styles.contentContainer}>
        <View style={styles.imageContainer}>
          {mediaType === 'image' ? (
            <Image
              source={{uri: mediaUrl + filename}}
              style={styles.recipeImage}
            />
          ) : (
            <Video
              source={{uri: mediaUrl + filename}}
              style={styles.recipeImage}
              useNativeControls={true}
              shouldPlay={true}
              isLooping={true}
              ref={videoRef}
            />
          )}
        </View>
      </View>

      <SafeAreaView style={styles.header}>
        <TouchableOpacity
          style={styles.goBackButton}
          onPress={() => navigation.goBack()}
        >
          <FontAwesome name={'arrow-circle-left'} size={28} color="red" />
        </TouchableOpacity>
        <FontAwesome name={'heart-o'} size={28} color="red" />
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    marginLeft: 10,
    marginRight: 10,
    position: 'absolute',
  },
  goBackButton: {
    flex: 1,
  },
  contentContainer: {
    backgroundColor: '#4D8C57',
    flex: 1,
    marginTop: 250,
    borderTopRadius: 56,
    borderTopRightRadius: 56,
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  imageContainer: {
    top: -400,
    height: 600,
    width: 500,
    position: 'relative',
  },
  recipeImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'center',
  },
  itemName: {
    marginTop: 160,
    fontSize: 28,
    fontWeight: '700',
  },

  itemDescription: {
    marginVertical: 16,
    fontSize: 28,
    fontWeight: '700',
  },
});

RecipeDetailsScreen.propTypes = {
  navigation: PropTypes.object,
  route: PropTypes.object,
};

export default RecipeDetailsScreen;

// import React from 'react';
// import {View, SafeAreaView, TouchableOpacity, Image, Text} from 'react-native';
// import {FontAwesome} from '@expo/vector-icons';
// import PropTypes from 'prop-types';
// import {Avatar} from '@rneui/themed';

// const RecipeDetailsScreen = ({navigation, route}) => {
//   const {item} = route.params;
//   return (
//     <View style={styles.container}>
//       <SafeAreaView style={styles.header}>
//         <TouchableOpacity
//           style={styles.goBackButton}
//           onPress={() => navigation.goBack()}
//         >
//           <FontAwesome name={'arrow-circle-left'} size={28} color="red" />
//         </TouchableOpacity>
//         <FontAwesome name={'heart-o'} size={28} color="red" />
//       </SafeAreaView>
//       <View style={styles.contentContainer}>
//         <View style={styles.imageContainer}>
//           <Image source={Avatar} style={styles.recipeImage} />
//         </View>

//         <View style={styles.itemName}>
//           <Text>{item.title}</Text>
//         </View>

//         <View style={styles.itemDescription}>
//           <Text>{item.description}</Text>
//         </View>

//         <View style={{flexDirection: 'row'}}>
//           <View style={{backgroundColor: 'white'}}>
//             <Text>40 min</Text>
//           </View>
//         </View>
//       </View>
//     </View>
//   );
// };

// const styles = {
//   container: {
//     backgroundColor: 'fff',
//     flex: 1,
//   },
//   header: {
//     flexDirection: 'row',
//     marginLeft: 10,
//     marginRight: 10,
//   },
//   goBackButton: {
//     flex: 1,
//   },
//   contentContainer: {
//     backgroundColor: '#4D8C57',
//     flex: 1,
//     marginTop: 240,
//     borderTopRadius: 56,
//     borderTopRightRadius: 56,
//     alignItems: 'center',
//     paddingHorizontal: 16,
//   },
//   imageContainer: {
//     height: 300,
//     width: 300,
//     position: 'absolute',
//     top: -150,
//   },
//   recipeImage: {
//     width: '100%',
//     height: '100%',
//     resizeMode: 'contain',
//   },

//   itemName: {
//     marginTop: 160,
//     fontSize: 28,
//     fontWeight: '700',
//   },

//   itemDescription: {
//     marginVertical: 16,
//     fontSize: 28,
//     fontWeight: '700',
//   },
// };

// // PropTypes for RecipeDetailsScreen
// RecipeDetailsScreen.propTypes = {
//   navigation: PropTypes.object.isRequired,
//   route: PropTypes.object.isRequired,
// };

// export default RecipeDetailsScreen;
