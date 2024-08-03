import React from 'react';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import WeatherScreen from './src/screens/Weather/WeatherScreen';

const App = () => {
  return (
    <Provider store={store}>
      <WeatherScreen />
    </Provider>
  );
};

export default App;
