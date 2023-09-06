import React from 'react';
import {View, Text} from 'react-native';
import PropTypes from 'prop-types';

const RecipeDetailsScreen = ({navigation}) => {
  return (
    <View style={{backgroundColor: 'fff', flex: 1}}>
      <View
        style={{
          backgroundColor: '#4D8C57',
          flex: 1,
          marginTop: 240,
          borderTopRadius: 56,
          borderTopRightRadius: 56,
          alignItems: 'center',
        }}
      >
        <Text>Hello</Text>
      </View>
    </View>
  );
};

// Define PropTypes for RecipeDetailsScreen
RecipeDetailsScreen.propTypes = {
  navigation: PropTypes.object.isRequired, // You might want to specify the PropTypes for navigation
};

export default RecipeDetailsScreen;
