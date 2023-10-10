import React, {useContext, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {mediaUrl} from '../../utils/app-config';
import {formatDate} from '../../utils/functions';
import {Text} from '@rneui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFavourite, useUser, useMedia} from '../../hooks/ApiHooks';
import {MainContext} from '../../contexts/MainContext';
import * as ScreenOrientation from 'expo-screen-orientation';
import {
  ScrollView,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {FontAwesome} from '@expo/vector-icons';
import {StatusBar} from 'expo-status-bar';

const RecipeDetailsScreen = ({route, navigation}) => {
  const [owner, setOwner] = useState({});
  const [userLike, setUserLike] = useState(false);
  const {user} = useContext(MainContext);
  const {update, setUpdate} = useContext(MainContext);
  const {getUserById} = useUser();
  const {postFavourite, getFavouritesById, deleteFavourite} = useFavourite();
  const {deleteMedia} = useMedia();
  const [likes, setLikes] = useState([]);

  const {
    title,
    description,
    filename,
    time_added: timeAdded,
    user_id: userId,
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

  const deleteFile = async () => {
    Alert.alert('Delete', `file name: ${title}, Are you sure?`, [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Ok',
        onPress: async () => {
          console.log('deleting file', fileId);
          try {
            const token = await AsyncStorage.getItem('userToken');
            const result = await deleteMedia(fileId, token);
            console.log('deleteFile()', result.message);
            // update view after deleting a file
            setUpdate(!update);
            // Navigate back to the previous screen (or any other desired screen)
            navigation.goBack();
          } catch (error) {
            console.error(error);
          }
        },
      },
    ]);
  };

  const modifyFile = async () => {
    console.log('modifying file', fileId);
    // Navigate to the "Modify file" screen, passing the necessary data
    navigation.navigate('Modify file', {
      fileId,
      // Add other data you want to pass here
    });
  };

  useEffect(() => {
    unlockOrientation();
    fetchOwner();

    // fullscreen video on landscape
    const orientSub = ScreenOrientation.addOrientationChangeListener(
      (event) => {
        if (event.orientationInfo.orientation > 2) {
          // Handle fullscreen here if needed
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

  return (
    <ScrollView
      style={{flex: 1, backgroundColor: '#1f7a8c'}}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{paddingBottom: 30}}
    >
      <StatusBar style={'light'} />

      {/* Recipe Image */}
      <View style={styles.imageContainer}>
        <Image source={{uri: mediaUrl + filename}} style={styles.recipeImage} />
      </View>

      <View style={styles.header}>
        <TouchableOpacity
          style={styles.goBackButton}
          onPress={() => navigation.goBack()}
        >
          <FontAwesome name={'arrow-circle-left'} size={28} color="red" />
        </TouchableOpacity>
        {userLike ? (
          <TouchableOpacity
            style={styles.heartButton}
            onPress={removeFavourite}
          >
            <FontAwesome name={'heart'} size={28} color="red" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.heartButton}
            onPress={createFavourite}
          >
            <FontAwesome name={'heart-o'} size={28} color="red" />
          </TouchableOpacity>
        )}
      </View>

      {/* Recipe Information */}
      <View style={styles.descriptionContainer}>
        <Text style={styles.itemName}>{title}</Text>
        <View style={styles.iconContainer}>
          <FontAwesome name={'calendar'} size={24} color="yellow" />
          <Text style={styles.iconText}>{formatDate(timeAdded)}</Text>

          <FontAwesome name={'user'} size={24} color="yellow" />
          <Text style={styles.iconText}>{owner.username}</Text>

          <FontAwesome name={'thumbs-up'} size={24} color="yellow" />
          <Text style={styles.iconText}>: {likes.length}</Text>
          {user.user_id == userId && (
            <>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={deleteFile}
              >
                <FontAwesome name={'trash-o'} size={28} color="red" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modifyButton}
                onPress={modifyFile}
              >
                <FontAwesome name={'pencil'} size={28} color="red" />
              </TouchableOpacity>
            </>
          )}
        </View>
        <Text style={styles.itemDescription}>{description}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    marginTop: 50,
    left: 20,
    right: 20,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
  },
  imageContainer: {
    height: 400,
    width: 400,
    borderRadius: 40,
  },
  recipeImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  descriptionContainer: {
    backgroundColor: '#1f7a8c',
    flex: 1,
    borderTopLeftRadius: 56,
    borderTopRightRadius: 56,
    paddingHorizontal: 16,
    paddingBottom: 30,
    marginTop: -40,
  },
  itemName: {
    fontSize: 28,
    fontWeight: '700',
    color: 'white',
    marginTop: 20,
    textAlign: 'center', // Center the text horizontally
  },
  itemDescription: {
    marginVertical: 16,
    fontSize: 20,
    fontWeight: '400',
    color: 'white',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // Center the icons horizontally
    margin: 10,
    flexWrap: 'wrap',
  },
  iconText: {
    fontSize: 18,
    margin: 10,
    color: 'yellow',
  },
  ingredientItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    shadowColor: '#000', // Shadow color
    shadowOffset: {
      width: 0, // Horizontal offset
      height: 2, // Vertical offset
    },
    shadowOpacity: 0.25, // Opacity of the shadow
    shadowRadius: 3.84, // Radius of the shadow
    elevation: 5, // Elevation for Android
  },
  ingredientBullet: {
    fontSize: 20,
    color: 'white',
    marginRight: 10,
    marginTop: 2,
    shadowColor: '#000', // Shadow color
    shadowOffset: {
      width: 0, // Horizontal offset
      height: 2, // Vertical offset
    },
    shadowOpacity: 0.25, // Opacity of the shadow
    shadowRadius: 3.84, // Radius of the shadow
    elevation: 5, // Elevation for Android
  },
  ingredientDescription: {
    fontSize: 20,
    fontWeight: '400',
    color: 'white',
    marginVertical: 5,
  },
  goBackButton: {
    marginRight: 10,
  },
  heartButton: {
    marginRight: 10,
  },
  deleteButton: {
    marginRight: 10,
  },
  modifyButton: {},
});

RecipeDetailsScreen.propTypes = {
  navigation: PropTypes.object,
  route: PropTypes.object,
};

export default RecipeDetailsScreen;
