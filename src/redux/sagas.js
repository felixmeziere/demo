import { appActionTypes } from './appActions';
import { takeEvery } from 'redux-saga/effects';
import Analytics from 'appcenter-analytics';

function* navigationSaga({ type, screen }) {
  if (type === 'SET_CURRENT_SCREEN') {
    Analytics.trackEvent(`NAVIGATION_TO: ${screen}`);
  }
}

export default function*() {
  yield takeEvery(appActionTypes.SET_CURRENT_SCREEN, navigationSaga);
}
