import { NavigationActions, StackActions } from 'react-navigation';

let navigator;

function setTopLevelNavigator(navigateRef) {
  navigator = navigateRef;
}

function navigate(routeName, params, thirdParam) {
  navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
      thirdParam,
    }),
  );
}

function push(routeName, params) {
  navigator.dispatch(
    StackActions.push({
      routeName,
      params,
    }),
  );
}

function reset(routeName, params) {
  const resetAction = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName, params })],
  });
  navigator.dispatch(resetAction);
}

function replace(routeName, params) {
  const replaceAction = StackActions.replace({ routeName, params });
  navigator.dispatch(replaceAction);
}

function pop() {
  const popAction = StackActions.pop(1);
  navigator.dispatch(popAction);
}

export default {
  navigate,
  push,
  setTopLevelNavigator,
  reset,
  replace,
  pop,
};
