import { appActionTypes } from './appActions';

const initialState = {
  currentScreen: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case appActionTypes.SET_CURRENT_SCREEN:
      return {
        ...state,
        currentScreen: action.screen,
      };
    default:
      return state;
  }
};
