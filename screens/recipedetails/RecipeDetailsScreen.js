import React, {useContext, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {mediaUrl} from '../../utils/app-config';
import {formatDate} from '../../utils/functions';
import {Text} from '@rneui/themed';
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
  FlatList,
} from 'react-native';
import {FontAwesome} from '@expo/vector-icons';
import {StatusBar} from 'expo-status-bar';

const RecipeDetailsScreen = ({route, navigation}) => {
  const [owner, setOwner] = useState({});
  const [userLike, setUserLike] = useState(false);
  const {user} = useContext(MainContext);
  const {getUserById} = useUser();
  const {postFavourite, getFavouritesById, deleteFavourite} = useFavourite();
  const [likes, setLikes] = useState([]);

  const {
    title,
    description,
    filename,
    time_added: timeAdded,
    user_id: userId,
    file_id: fileId,
  } = route.params;

  // Sample data (you may fetch this from your data source)
  const cookingTime = '30 min.';
  const kcal = '400 kcal';
  const ingredients = ['Pasta', 'Tomato Sauce', 'Cheese', 'Herbs'];
  const addedBy = 'John Doe';

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
      style={{flex: 1, backgroundColor: '#AF3D3D'}}
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
        <Text style={styles.itemDescription}>{description}</Text>
        <View style={styles.iconContainer}>
          <FontAwesome name={'clock-o'} size={24} color="yellow" />
          <Text style={styles.iconText}>{cookingTime}</Text>

          <FontAwesome name={'fire'} size={24} color="yellow" />
          <Text style={styles.iconText}>{kcal}</Text>

          <FontAwesome name={'calendar'} size={24} color="yellow" />
          <Text style={styles.iconText}>{formatDate(timeAdded)}</Text>

          <FontAwesome name={'user'} size={24} color="yellow" />
          <Text style={styles.iconText}>{user.username}</Text>
        </View>

        {/* List of Ingredients */}
        <Text style={styles.itemName}>Ingredients:</Text>
        <View style={{flex: 1, alignContent: 'flex-start'}}>
          <FlatList
            data={ingredients}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (
              <View style={styles.ingredientItem}>
                <Text style={styles.ingredientBullet}>•</Text>
                <Text style={styles.ingredientDescription}>{item}</Text>
              </View>
            )}
          />
        </View>
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
    backgroundColor: '#AF3D3D',
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
  },
  ingredientBullet: {
    fontSize: 20,
    color: 'white',
    marginRight: 10,
    marginTop: 2,
  },
  ingredientDescription: {
    fontSize: 20,
    fontWeight: '400',
    color: 'white',
    marginVertical: 5,
  },
});

RecipeDetailsScreen.propTypes = {
  navigation: PropTypes.object,
  route: PropTypes.object,
};

export default RecipeDetailsScreen;
