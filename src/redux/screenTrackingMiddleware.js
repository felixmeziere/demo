import { NavigationActions } from 'react-navigation';
import { setCurrentScreen } from './appActions';

function getActiveRouteName(navigationState) {
  if (!navigationState) {
    return null;
  }
  const route = navigationState.routes[navigationState.index];
  // dive into nested navigators
  if (route.routes) {
    return getActiveRouteName(route);
  }
  return route.routeName;
}

const screenTracking = ({ getState, dispatch }) => next => action => {
  if (action.type !== NavigationActions.NAVIGATE && action.type !== NavigationActions.BACK) {
    return next(action);
  }

  const currentScreen = getActiveRouteName(getState().navigation);
  const result = next(action);
  const nextScreen = getActiveRouteName(getState().navigation);
  if (nextScreen !== currentScreen) {
    dispatch(setCurrentScreen(currentScreen));
  }
  return result;
};

export default screenTracking;
