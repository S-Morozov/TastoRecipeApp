import React from 'react';
import ListItem from '../../components/listItem/ListItem';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native'; // Import necessary components
import Header from '../../components/header/Header';
import CategoriesFilter from '../../components/categoriesfilter/CategoriesFilter';
import SearchFilter from '../../components/searchfilter/SearchFilter';

const Home = ({route, navigation}) => {
  const avatar = route.params?.avatar || 'http://placekitten.com/640';

  console.log('Avatar in Profile:', avatar.name);

  return (
    <View style={{flex: 1, marginHorizontal: 16}}>
      {/* Header */}
      <Header headerIcon="bell-o" navigation={navigation} />

      {/* Search Filter */}
      <SearchFilter icon="search" placeholder={'enter your favourite recipe'} />

      {/* Categories filter */}
      <View style={{marginTop: 22}}>
        <Text style={{fontSize: 22, fontWeight: 'bold'}}>Categories</Text>

        {/* Categories list */}
        <CategoriesFilter />
      </View>

      {/* Recipe List Filter */}
      <View style={{marginTop: 22, flex: 1}}>
        <Text style={{fontSize: 22, fontWeight: 'bold'}}>Recipes</Text>
        {/* Recipes list */}
        <ListItem navigation={navigation} />
      </View>
    </View>
  );
};

Home.propTypes = {
  route: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
};

export default Home;
