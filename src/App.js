import React from 'react';
import { connect } from 'react-redux';
import RootNavigator from './Scenes';
import codePush from 'react-native-code-push';
import { Provider } from 'react-redux';
import store, { persistor } from './redux/store';
import { reduxifyNavigator } from 'react-navigation-redux-helpers';
import { PersistGate } from 'redux-persist/integration/react';

const RootNavigatorWithRedux = reduxifyNavigator(RootNavigator, 'root');
const mapStateToProps = state => ({
  state: state.navigation,
});
const AppWithNavigationState = connect(mapStateToProps)(RootNavigatorWithRedux);

const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <AppWithNavigationState />
    </PersistGate>
  </Provider>
);

const codePushOptions = {
  installMode: codePush.InstallMode.IMMEDIATE,
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
};

export default codePush(codePushOptions)(App);
