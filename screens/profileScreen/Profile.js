import React, {useContext, useState, useEffect} from 'react';
import {MainContext} from '../../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Icon, Card} from '@rneui/themed';
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
        <Card style={styles.card}>
        <Card.Title style={styles.cardTitle}>Profile Info</Card.Title>
        <View style={styles.profileHeader}>
          <Text style={styles.username}>Username: {user.username}</Text>
          {user.full_name && (
            <Text style={styles.fullName}>Full name: {user.full_name}</Text>
          )}
          <Text style={styles.email}>Email: {user.email}</Text>
          <Text style={styles.userId}>User id: {user.user_id}</Text>
        </View>
        </Card>
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
              Share Recipe
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
  card: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  cardTitle: {
    fontSize: 30,
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 20,
  },
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
    marginBottom: 20,
    paddingHorizontal: 10,
    textAlign: 'center',

  },
  fullName: {
    fontSize: 18,
    marginBottom: 20,
    paddingHorizontal: 10,
    textAlign: 'center',
  },
  email: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 20,
    paddingHorizontal: 10,
    textAlign: 'center',
  },
  userId: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 20,
    paddingHorizontal: 10,
    textAlign: 'center',
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
