//we can use Thunk from redux toolkit instead of all the written code
const func =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    // const func = store => next => action => {
    if (typeof action === "function") action(dispatch, getState);
    else next(action);
  };

export default func;
