import {FlatList, StyleSheet, Text, View, Image, Pressable} from 'react-native';
import React from 'react';
import {colors, recipeList} from '../../Constants';
import {FontAwesome} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';

const RecipeCard = () => {
  const navigation = useNavigation();

  const renderItem = ({item}) => (
    <Pressable
      onPress={() => {
        navigation.navigate('RecipeDetailsScreen', {item: item});
        console.log(item.name + ' you pressed');
      }}
      style={styles.recipeCard}
    >
      <Image source={item.image} style={styles.recipeImage} />
      <Text>{item.name}</Text>
      <View style={styles.recipeInfo}>
        <Text>{item.time}</Text>
        <Text> | </Text>
        <View style={styles.rating}>
          <Text style={styles.ratingText}>{item.likes}</Text>
          <FontAwesome name="star" size={16} color={colors.COLOR_PRIMARY} />
        </View>
      </View>
    </Pressable>
  );

  return (
    <View>
      <FlatList
        data={recipeList}
        renderItem={renderItem}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  recipeCard: {
    backgroundColor: colors.COLOR_LIGHT,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 7,
    borderRadius: 16,
    marginVertical: 16,
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 26,
  },
  recipeImage: {
    width: '100%',
    height: 150,
    resizeMode: 'center',
  },
  recipeInfo: {
    flexDirection: 'row',
    marginTop: 8,
  },
  rating: {
    flexDirection: 'row',
    marginRight: 4,
  },
  ratingText: {
    marginRight: 4,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
});

export default RecipeCard;
