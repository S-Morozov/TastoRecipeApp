import React, {useState} from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import {FontAwesome} from '@expo/vector-icons';
import PropTypes from 'prop-types';

const SearchFilter = ({icon, placeholder, onSearchInputChange}) => {
  const [searchText, setSearchText] = useState('');

  const handleInputChange = (text) => {
    setSearchText(text);
    onSearchInputChange(text); // Call the callback function with the search input value
  };

  return (
    <View style={styles.searchContainer}>
      <FontAwesome name={icon} size={20} color="#f96163" />
      <TextInput
        style={{paddingLeft: 8, fontSize: 16, color: '#808080'}}
        placeholder={placeholder}
        value={searchText}
        onChangeText={handleInputChange}
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
  onSearchInputChange: PropTypes.func.isRequired, // Callback function prop
};

export default SearchFilter;
