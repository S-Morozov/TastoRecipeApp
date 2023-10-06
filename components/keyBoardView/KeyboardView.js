import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import {StatusBar} from 'expo-status-bar';

const KeyboardView = ({children, style}) => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[styles.contentContainer, style]}
        >
          {children}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  contentContainer: {
    padding: 20,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 50 : 50,
  },
});

KeyboardView.propTypes = {
  children: PropTypes.node,
  style: PropTypes.object,
};

export default KeyboardView;
