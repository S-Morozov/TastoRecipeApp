import {Input, Button} from '@rneui/themed';
import {Controller, useForm} from 'react-hook-form';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  Image,
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import {useContext, useState} from 'react';
import {appId, placeholderImage} from '../../utils/app-config';
import {Video} from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useMedia, useTag} from '../../hooks/ApiHooks';
import PropTypes from 'prop-types';
import {MainContext} from '../../contexts/MainContext';
import {SafeAreaView} from 'react-native-safe-area-context';
import {FontAwesome} from '@expo/vector-icons';

const Upload = ({navigation}) => {
  const {update, setUpdate} = useContext(MainContext);
  const [image, setImage] = useState(placeholderImage);
  const [type, setType] = useState('image');
  const {postMedia, loading} = useMedia();
  const {postTag} = useTag();

  const {
    control,
    reset,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      title: '',
      description: '',
    },
    mode: 'onBlur',
  });

  const upload = async (uploadData) => {
    console.log('upload', uploadData);
    const formData = new FormData();
    formData.append('title', uploadData.title);
    formData.append('description', uploadData.description);
    const filename = image.split('/').pop();

    let fileExtension = filename.split('.').pop();
    fileExtension = fileExtension === 'jpg' ? 'jpeg' : fileExtension;

    formData.append('file', {
      uri: image,
      name: filename,
      type: `${type}/${fileExtension}`,
    });

    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await postMedia(formData, token);
      console.log('lataus', response);
      const tagResponse = await postTag(
        {
          file_id: response.file_id,
          tag: appId,
        },
        token,
      );
      console.log('postTag', tagResponse);
      setUpdate(!update);
      Alert.alert('Upload', `${response.message} (id: ${response.file_id})`, [
        {
          text: 'Ok',
          onPress: () => {
            resetForm();
            navigation.navigate('Home');
          },
        },
      ]);
    } catch (error) {
      console.log(error.message);
      // TODO: notify user about failed upload
    }
  };

  const resetForm = () => {
    setImage(placeholderImage);
    setType('image');
    reset();
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setType(result.assets[0].type);
    }
  };

  return (
    <SafeAreaView>
      <TouchableOpacity
        style={styles.goBackButton}
        onPress={() => navigation.goBack()}
      >
        <FontAwesome name={'arrow-circle-left'} size={28} color="red" />
      </TouchableOpacity>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -500}
      >
        <ScrollView>
          <View style={{marginHorizontal: 16}}>
            <Text
              style={{
                flex: 1,
                margin: 30,
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: 24,
              }}
            >
              Share recipe here
            </Text>
            {type === 'image' ? (
              <Image
                source={{uri: image}}
                style={styles.image}
                onPress={pickImage}
              />
            ) : (
              <Video
                source={{uri: image}}
                style={styles.image}
                useNativeControls={true}
                resizeMode="cover"
              />
            )}
            <Controller
              control={control}
              rules={{
                required: {value: true, message: 'is required'},
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <Input
                  placeholder="Title"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.title?.message}
                />
              )}
              name="title"
            />

            <Controller
              control={control}
              rules={{
                required: {value: true, message: 'Description is required'},
                minLength: {
                  value: 10,
                  message: 'Description must be at least 10 characters',
                },
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <Input
                  placeholder="Description (e.g., Ingredients, Cooking Time)"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.description?.message}
                  style={{height: 200}} // Set the height to 500
                  multiline // Allow multiline input
                  numberOfLines={10} // Set the number of lines to display initially
                />
              )}
              name="description"
            />
            <Button
              title="Choose Media"
              onPress={pickImage}
              style={{marginBottom: 10}}
            />

            <Button
              title="Reset"
              color={'error'}
              onPress={resetForm}
              style={{marginBottom: 10}}
            />
            <Button
              loading={loading}
              disabled={
                image == placeholderImage || errors.description || errors.title
              }
              title="submit"
              onPress={handleSubmit(upload)}
              style={{marginBottom: 10}}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  image: {
    borderRadius: 30,
    width: '100%',
    height: undefined,
    aspectRatio: 1,
    marginBottom: 15,
    resizeMode: 'cover',
  },
  goBackButton: {
    left: 10,
  },
});

Upload.propTypes = {
  navigation: PropTypes.object,
};

export default Upload;
