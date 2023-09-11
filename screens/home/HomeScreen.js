import React from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import Header from '../../components/header/Header';
import SearchFilter from '../../components/searchfilter/SearchFilter';
import CategoriesFilter from '../../components/categoriesfilter/CategoriesFilter';
import RecipeCard from '../../components/recipecards/RecipeCard';

const HomeScreen = () => {
  return (
    <SafeAreaView style={{flex: 1, marginHorizontal: 16}}>
      {/* render header */}
      <Header headerText={'Hi, John '} headerIcon={'bell-o'} />

      {/* Search Filter */}
      <SearchFilter icon="search" placeholder={'enter your fav recipe'} />

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

        <RecipeCard />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
