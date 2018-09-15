import React from 'react';
import { connect } from 'react-redux';
import RootNavigator from './Scenes';
import codePush from 'react-native-code-push';
import { Provider } from 'react-redux';
import store from './redux/store';
import { reduxifyNavigator } from 'react-navigation-redux-helpers';

const RootNavigatorWithRedux = reduxifyNavigator(RootNavigator, 'root');
const mapStateToProps = state => ({
  state: state.navigation,
});
const AppWithNavigationState = connect(mapStateToProps)(RootNavigatorWithRedux);

const App = () => (
  <Provider store={store}>
    <AppWithNavigationState />
  </Provider>
);

const codePushOptions = {
  installMode: codePush.InstallMode.IMMEDIATE,
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
};

export default codePush(codePushOptions)(App);
