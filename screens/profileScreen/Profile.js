import React, {useContext, useState, useEffect} from 'react';
import {MainContext} from '../../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Icon} from '@rneui/themed';
import PropTypes from 'prop-types';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Pressable,
} from 'react-native';
import ProfileForm from '../../components/profileForm/ProfileForm';
import {mediaUrl} from '../../utils/app-config';
import {useTag} from '../../hooks/ApiHooks';

const Profile = ({navigation}) => {
  const {setIsLoggedIn, user} = useContext(MainContext);
  const [avatar, setAvatar] = useState(null); // Initialize with null
  const {getFilesByTag} = useTag();

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
          await AsyncStorage.setItem('userAvatar', avatarUrl);

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

  const logOut = async () => {
    console.log('profile, logout');
    try {
      await AsyncStorage.clear();
      setIsLoggedIn(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <ScrollView style={{flex: 1, marginHorizontal: 16}}>
        <View style={styles.avatarContainer}>
          {avatar && <Image source={{uri: avatar}} style={styles.avatar} />}
        </View>
        <View style={styles.profileHeader}>
          <Text style={styles.username}>{user.username}</Text>
          {user.full_name && (
            <Text style={styles.fullName}>{user.full_name}</Text>
          )}
          <Text style={styles.email}>{user.email}</Text>
          <Text style={styles.userId}>user id: {user.user_id}</Text>
        </View>
        <View style={styles.buttonsContainer}>
          <Pressable
            onPress={() => {
              navigation.navigate('Upload');
            }}
            style={styles.buttonShare}
          >
            <Text
              style={{
                fontSize: 16,
                color: 'white',
                textAlign: 'center',
                fontWeight: 'bold',
                paddingBottom: 5,
              }}
            >
              Share recipe
            </Text>
            <Icon name="save" color="white" />
          </Pressable>
          <Pressable onPress={logOut} style={styles.button}>
            <Text
              style={{
                fontSize: 16,
                color: 'white',
                textAlign: 'center',
                fontWeight: 'bold',
                paddingBottom: 5,
              }}
            >
              {' '}
              Log Out
            </Text>
            <Icon name="logout" color="white" />
          </Pressable>
        </View>
        <ProfileForm user={user} />
      </ScrollView>
    </SafeAreaView>
  );
};

Profile.propTypes = {
  navigation: PropTypes.object,
};

const styles = StyleSheet.create({
  avatarContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  profileHeader: {
    marginBottom: 20,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  fullName: {
    fontSize: 18,
  },
  email: {
    fontSize: 16,
    color: 'gray',
  },
  userId: {
    fontSize: 16,
    color: 'gray',
  },
  buttonsContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    marginVertical: 40,
  },
  buttonShare: {
    backgroundColor: 'red',
    borderRadius: 20,
    width: 200,
    height: 70,
    paddingHorizontal: 10,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'gray',
    borderRadius: 20,
    width: 200,
    height: 70,
    paddingHorizontal: 10,
    padding: 10,
  },
});

export default Profile;
