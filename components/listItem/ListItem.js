import PropTypes from 'prop-types';
import {Alert, View, StyleSheet, Text, Pressable, FlatList} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useContext, useState} from 'react';
import {MainContext} from '../../contexts/MainContext';
import {useMedia} from '../../hooks/ApiHooks';
import {mediaUrl} from '../../utils/app-config';
import {FontAwesome} from '@expo/vector-icons';
import {colors} from '../../Constants';
import {Avatar} from 'react-native-elements';
import SearchFilter from '../searchfilter/SearchFilter';

const ListItem = ({singleMedia, navigation, userId, myFilesOnly}) => {
  const {deleteMedia} = useMedia();
  const {update, setUpdate} = useContext(MainContext);
  const {mediaArray} = useMedia(update, myFilesOnly);
  const [searchInput, setSearchInput] = useState('');

  const handleSearchInputChange = (text) => {
    setSearchInput(text);
  };

  const filteredMediaArray = mediaArray.filter((item) =>
    item.title.toLowerCase().includes(searchInput.toLowerCase()),
  );

  const deleteFile = async () => {
    Alert.alert('Delete', `file id: ${singleMedia.file_id}, Are you sure?`, [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Ok',
        onPress: async () => {
          console.log('deleting file', singleMedia.file_id);
          try {
            const token = await AsyncStorage.getItem('userToken');
            const result = await deleteMedia(singleMedia.file_id, token);
            console.log('deleteFile()', result.message);
            // update view after deleting a file
            setUpdate(!update);
          } catch (error) {
            console.error(error);
          }
        },
      },
    ]);
  };

  const modifyFile = async () => {
    console.log('modifying file', singleMedia.file_id);
    navigation.navigate('Modify file', singleMedia);
  };

  const renderItem = ({item}) => (
    <Pressable
      onPress={() => {
        console.log('touched!', item.title);
        navigation.navigate('RecipeDetailsScreen', item);
      }}
      style={styles.recipeCard}
    >
      <Avatar
        size="xlarge"
        source={{uri: mediaUrl + item.thumbnails.w160}}
      ></Avatar>

      <Text style={{color: 'red', fontWeight: 'bold', fontSize: 16}}>
        {item.title}
      </Text>
      <View style={styles.recipeInfo}>
        <Text> | </Text>
        <View style={styles.rating}>
          <FontAwesome name="star" size={16} color={colors.COLOR_PRIMARY} />
        </View>
      </View>
      {item.user_id == userId && (
        <View style={styles.buttonContainer}>
          <Pressable
            onPress={modifyFile}
            style={[styles.button, {backgroundColor: 'blue'}]}
          >
            <Text style={styles.buttonText}>Modify</Text>
          </Pressable>
          <Pressable
            onPress={deleteFile}
            style={[styles.button, {backgroundColor: 'red'}]}
          >
            <Text style={styles.buttonText}>Delete</Text>
          </Pressable>
        </View>
      )}
    </Pressable>
  );

  return (
    <View>
      <SearchFilter
        icon="search"
        placeholder="Search"
        onSearchInputChange={handleSearchInputChange}
      />
      <FlatList
        data={filteredMediaArray}
        renderItem={renderItem}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  recipeCard: {
    width: '45%',
    backgroundColor: colors.COLOR_LIGHT,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 7,
    borderRadius: 16,
    marginVertical: 16,
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 26,
  },

  recipeInfo: {
    flexDirection: 'row',
    marginTop: 8,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginRight: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  button: {
    backgroundColor: 'blue', // Change the button color
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginHorizontal: 8,
  },
  buttonText: {
    color: 'white',
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
});

ListItem.propTypes = {
  singleMedia: PropTypes.object,
  navigation: PropTypes.object,
  userId: PropTypes.number,
  myFilesOnly: PropTypes.bool,
};

export default ListItem;
