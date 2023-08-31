import {StatusBar} from 'expo-status-bar';
import Auth from './components/screens/auth/Auth';

const App = () => {
  return (
    <>
      <Auth />
      <StatusBar style="auto" />
    </>
  );
};

export default App;
