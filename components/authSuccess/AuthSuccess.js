import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import LottieView from 'lottie-react-native';
import {useRoute, useNavigation} from '@react-navigation/native';

const AuthSuccess = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
      navigation.navigate('Home');
    }, 5000);

    return () => {
      clearTimeout(loadingTimeout);
    };
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Welcome, <Text style={{color: 'red'}}>{route.params.username}</Text>!
      </Text>
      {isLoading && (
        <View style={styles.loaderContainer}>
          <LottieView
            source={require('../../assets/lottie.json')}
            autoPlay
            loop
            style={styles.loader}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loader: {
    width: 200,
    height: 200,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default AuthSuccess;
