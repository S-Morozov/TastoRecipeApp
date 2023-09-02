import {StatusBar} from 'expo-status-bar';
import Navigator from './navigation/Navigator';

const App = () => {
  return (
    <>
      <Navigator />
      <StatusBar style="auto" />
    </>
  );
};

export default App;
