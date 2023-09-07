import React from 'react';
import {View, SafeAreaView, TouchableOpacity, Image, Text} from 'react-native';
import {FontAwesome} from '@expo/vector-icons';
import PropTypes from 'prop-types';

const RecipeDetailsScreen = ({navigation, route}) => {
  const {item} = route.params;
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.header}>
        <TouchableOpacity
          style={styles.goBackButton}
          onPress={() => navigation.goBack()}
        >
          <FontAwesome name={'arrow-circle-left'} size={28} color="red" />
        </TouchableOpacity>
        <FontAwesome name={'heart-o'} size={28} color="red" />
      </SafeAreaView>
      <View style={styles.contentContainer}>
        <View style={styles.imageContainer}>
          <Image source={item.image} style={styles.recipeImage} />
        </View>

        <View style={styles.itemName}>
          <Text>{item.name}</Text>
        </View>

        <View style={styles.itemDescription}>
          <Text>{item.description}</Text>
        </View>

        <View style={{flexDirection: 'row'}}>
          <View style={{backgroundColor: 'white'}}>
            <Text>40 min</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = {
  container: {
    backgroundColor: 'fff',
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    marginLeft: 10,
    marginRight: 10,
  },
  goBackButton: {
    flex: 1,
  },
  contentContainer: {
    backgroundColor: '#4D8C57',
    flex: 1,
    marginTop: 240,
    borderTopRadius: 56,
    borderTopRightRadius: 56,
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  imageContainer: {
    height: 300,
    width: 300,
    position: 'absolute',
    top: -150,
  },
  recipeImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
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
};

// PropTypes for RecipeDetailsScreen
RecipeDetailsScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
};

export default RecipeDetailsScreen;
