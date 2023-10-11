import React, {useContext, useEffect, useState} from 'react';
import {MainContext} from '../../contexts/MainContext';
import {useTag} from '../../hooks/ApiHooks';
import {mediaUrl} from '../../utils/app-config';
import {TouchableOpacity, Image, Text, View, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {FontAwesome} from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SafeAreaView} from 'react-native-safe-area-context';

const Header = ({headerIcon, navigation}) => {
  const [avatar, setAvatar] = useState(null); // Initialize with null
  const {getFilesByTag} = useTag();
  const {user} = useContext(MainContext);

  const handleUserIconPress = () => {
    // Navigate to the 'ProfileScreen' when the user icon is pressed
    navigation.navigate('Profile');
  };

  const loadAvatar = async () => {
    try {
      // Check if avatar URL is available in AsyncStorage
      const storedAvatar = await AsyncStorage.getItem('userAvatar');

      if (storedAvatar) {
        setAvatar(storedAvatar);
      } else {
        // If not, fetch it from the API
        const avatars = await getFilesByTag('avatar_' + user.user_id);
        if (avatars.length > 0) {
          const avatarUrl = mediaUrl + avatars.pop().filename;

          // Store the avatar URL in AsyncStorage for future use
          await AsyncStorage.setItem('userAvatar_${user.user_id}', avatarUrl);

          setAvatar(avatarUrl);
        } else {
          setAvatar(null); // Set to null if no avatar found
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadAvatar();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={handleUserIconPress}>
        <View style={styles.userContainer}>
          {avatar ? (
            <Image source={{uri: avatar}} style={styles.avatar} />
          ) : (
            <FontAwesome name="user-circle" size={32} color="black" />
          )}
          {user && user.username && (
            <Text style={styles.username}>{`Hi, ${user.username}`}</Text>
          )}
        </View>
      </TouchableOpacity>

      <TouchableOpacity>
        <FontAwesome name={headerIcon} size={32} color="black" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

Header.propTypes = {
  headerIcon: PropTypes.string,
  navigation: PropTypes.object,
};

const styles = StyleSheet.create({
  container: {
    top: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 40,
  },
  username: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Header;
