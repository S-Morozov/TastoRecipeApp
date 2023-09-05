import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../../components/header/Header';
import SearchFilter from '../../components/searchfilter/SearchFilter';
import CategoriesFilter from '../../components/categoriesfilter/CategoriesFilter';
import RecipeCard from '../../components/recipecards/RecipeCard';

const RecipeScreen = () => {
  return (
    <SafeAreaView style={{flex: 1, marginHorizontal: 16}}>
      {/* Header rendering*/}
      <Header title="Recipe App" headerIcon={'bell-o'} />

      {/* Search Filter */}
      <SearchFilter icon="search" placeholder={'enter your favourite recipe'} />

      {/* Categories filter */}

      <CategoriesFilter />

      <RecipeCard />
    </SafeAreaView>
  );
};

export default RecipeScreen;
