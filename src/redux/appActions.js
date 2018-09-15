// @flow
type SetCurrentScreenAction = { type: 'SET_CURRENT_SCREEN', screen: string };
type DoSomethingElseAction = { type: 'DO_SOMETHING_ELSE', someField: number };

export type AppAction = SetCurrentScreenAction | DoSomethingElseAction;

export const appActionTypes = {
  SET_CURRENT_SCREEN: 'SET_CURRENT_SCREEN',
  DO_SOMETHING_ELSE: 'DO_SOMETHING_ELSE',
};

export const setCurrentScreen = (screen: string): SetCurrentScreenAction => ({
  type: appActionTypes.SET_CURRENT_SCREEN,
  screen,
});

export const doSomethingElse = (someField: number): DoSomethingElseAction => ({
  type: appActionTypes.SET_CURRENT_SCREEN,
  someField,
});
