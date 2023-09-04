import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../../header/Header';
import SearchFilter from '../../searchfilter/SearchFilter';

const RecipeScreen = () => {
  return (
    <SafeAreaView style={{flex: 1, marginHorizontal: 16}}>
      {/* Provide headerText and headerIcon props to Header */}
      <Header title="Recipe App" headerIcon={'bell-o'} />
      <SearchFilter icon="search" placeholder={'enter your favourite recipe'} />
    </SafeAreaView>
  );
};

export default RecipeScreen;
