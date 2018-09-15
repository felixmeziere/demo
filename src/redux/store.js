import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import appReducer from './appReducer';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer } from 'redux-persist';
import {
  reduxifyNavigator,
  createReactNavigationReduxMiddleware,
  createNavigationReducer,
} from 'react-navigation-redux-helpers';
import rootSaga from './sagas';
import RootNavigator from '../Scenes';
import screenTrackingMiddleware from './screenTrackingMiddleware';
import storage from 'redux-persist/lib/storage';

const sagaMiddleware = createSagaMiddleware();
const navigationMiddleware = createReactNavigationReduxMiddleware(
  'root',
  state => state.navigation,
);

const navigationReducer = createNavigationReducer(RootNavigator);

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['navigation'],
};
const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    app: appReducer,
    navigation: navigationReducer,
  }),
);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(navigationMiddleware, screenTrackingMiddleware, sagaMiddleware)),
);
export const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export default store;
