import React from 'react';
import {View, Text} from 'react-native';
import PropTypes from 'prop-types';

const RecipeDetailsScreen = ({navigation}) => {
  return (
    <View style={{backgroundColor: 'blue', flex: 1}}>
      <Text>Hello</Text>
    </View>
  );
};

// Define PropTypes for RecipeDetailsScreen
RecipeDetailsScreen.propTypes = {
  navigation: PropTypes.object.isRequired, // You might want to specify the PropTypes for navigation
};

export default RecipeDetailsScreen;
