import React from 'react';
import {View, Text} from 'react-native';
import PropTypes from 'prop-types';
import {FontAwesome} from '@expo/vector-icons';

const Header = ({title, headerIcon}) => {
  return (
    <View style={{flexDirection: 'row'}}>
      <Text style={{flex: 1}}>{title}</Text>
      <FontAwesome name={headerIcon} size={24} color="black" />
    </View>
  );
};

Header.propTypes = {
  title: PropTypes.object,
  headerIcon: PropTypes.string.isRequired,
};

export default Header;
