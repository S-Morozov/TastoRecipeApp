import {ScrollView, Text, View, StyleSheet} from 'react-native';
import React from 'react';
import {categories, colors} from '../../Constants';

const CategoriesFilter = () => {
  return (
    <View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {categories.map((category, index) => {
          return (
            <View key={index} style={styles.category}>
              <Text style={styles.categoryText}>{category.category}</Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  category: {
    backgroundColor: colors.COLOR_LIGHT,
    marginRight: 36,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 7,
    marginVertical: 16,
  },
  categoryText: {
    color: colors.COLOR_PRIMARY,
    fontSize: 18,
  },
});

export default CategoriesFilter;
