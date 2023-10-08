import React from 'react';
import ListItem from '../../components/listItem/ListItem';
import PropTypes from 'prop-types';

const MyFiles = ({navigation}) => {
  return <ListItem navigation={navigation} myFilesOnly={true} />;
};

MyFiles.propTypes = {
  navigation: PropTypes.object,
};

export default MyFiles;
