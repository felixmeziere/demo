import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import appReducer from './appReducer';
import createSagaMiddleware from 'redux-saga';
import {
  reduxifyNavigator,
  createReactNavigationReduxMiddleware,
  createNavigationReducer,
} from 'react-navigation-redux-helpers';
import rootSaga from './sagas';
import RootNavigator from '../Scenes';
import screenTrackingMiddleware from './screenTrackingMiddleware';

const sagaMiddleware = createSagaMiddleware();
const navigationMiddleware = createReactNavigationReduxMiddleware(
  'root',
  state => state.navigation,
);

const navigationReducer = createNavigationReducer(RootNavigator);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export default createStore(
  combineReducers({
    app: appReducer,
    navigation: navigationReducer,
  }),
  composeEnhancers(applyMiddleware(navigationMiddleware, screenTrackingMiddleware, sagaMiddleware)),
);

sagaMiddleware.run(rootSaga);
