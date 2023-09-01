import {StatusBar} from 'expo-status-bar';
import HomeScreen from './components/screens/home/HomeScreen';

const App = () => {
  return (
    <>
      <HomeScreen />
      <StatusBar style="auto" />
    </>
  );
};

export default App;
