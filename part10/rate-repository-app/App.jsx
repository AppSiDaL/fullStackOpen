import { StatusBar } from 'expo-status-bar';

import { NativeRouter } from 'react-router-native';

import Main from './src/components/Main';

function App() {
  return (

    <>
      <NativeRouter>
        <Main />
      </NativeRouter>
      <StatusBar style="auto" />
    </>
  );
}

export default App;
