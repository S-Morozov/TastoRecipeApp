import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import {FontAwesome} from '@expo/vector-icons';

const Header = ({headerUser, headerIcon, navigation}) => {
  const handleUserIconPress = () => {
    // Navigate to the 'ProfileScreen' when the user icon is pressed
    navigation.navigate('ProfileScreen');
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <TouchableOpacity onPress={handleUserIconPress}>
        <FontAwesome name={headerUser} size={32} style={{marginRight: 10}} />
      </TouchableOpacity>
      <TouchableOpacity>
        <FontAwesome name={headerIcon} size={32} color="black" />
      </TouchableOpacity>
    </View>
  );
};

Header.propTypes = {
  headerUser: PropTypes.string.isRequired,
  headerIcon: PropTypes.string.isRequired,
  navigation: PropTypes.object.isRequired,
};

export default Header;
