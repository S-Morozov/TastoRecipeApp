import React from 'react';
import ListItem from '../../components/listItem/ListItem';
import PropTypes from 'prop-types';
import {SafeAreaView} from 'react-native-safe-area-context';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import {FontAwesome} from '@expo/vector-icons';

const MyFiles = ({singleMedia, navigation, userId}) => {
  return (
    <SafeAreaView>
      <TouchableOpacity style={{left: 10}} onPress={() => navigation.goBack()}>
        <FontAwesome name={'arrow-circle-left'} size={28} color="red" />
      </TouchableOpacity>
        <View style={{margin: 20}}>
          <Text style={{textAlign: 'center', fontSize: 24, fontWeight: 'bold'}}>
            My files
          </Text>
          <ListItem navigation={navigation} myFilesOnly={true} />
        </View>
    </SafeAreaView>
  );
};

MyFiles.propTypes = {
  singleMedia: PropTypes.object,
  navigation: PropTypes.object,
  userId: PropTypes.number,
};

export default MyFiles;
