import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native'; // Import Text and StyleSheet
import {FontAwesome} from '@expo/vector-icons';
import PropTypes from 'prop-types';

const SearchFilter = ({icon, placeholder}) => {
  return (
    <View style={styles.searchContainer}>
      <FontAwesome name={icon} size={20} color="#f96163" />
      <TextInput
        style={{paddingLeft: 8, fontSize: 16, color: '#808080'}}
        placeholder={placeholder}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    paddingVertical: 16,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginVertical: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 7,
  },
});

SearchFilter.propTypes = {
  icon: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
};

export default SearchFilter;
