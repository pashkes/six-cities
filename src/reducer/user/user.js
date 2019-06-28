import Constants from "./../../constants";
import toModelUserDate from "./adapter";

const initialState = {
  isAuthorizationRequired: true,
  authorization: {},
};

const ActionType = {
  REQUIRED_AUTHORIZATION: `REQUIRED_AUTHORIZATION`,
  AUTHORIZATION: `AUTHORIZATION`,
  ADD_TO_FAVORITE: `ADD_TO_FAVORITE`,
  REMOVE_FROM_FAVORITE: `REMOVE_FROM_FAVORITE`,
};

const ActionCreators = {
  requireAuthorization: (status) => ({
    type: ActionType.REQUIRED_AUTHORIZATION,
    payload: status
  }),
  authorization: (userData) => ({
    type: ActionType.AUTHORIZATION,
    payload: userData
  }),
  addToFavorites: (id) => ({
    type: ActionType.ADD_TO_FAVORITE,
    payload: id
  }),
  removeFromFavorite: (id) =>({
    type: ActionType.REMOVE_FROM_FAVORITE,
    payload: id,
  }),
};

const Operation = {
  authorization: (email, password) => (dispatch, _getState, api) => {
    return api.post(Constants.LOGIN_PATH, {email, password})
      .then(({status, data}) => {
        if (status === Constants.STATUS_OK) {
          dispatch(ActionCreators.requireAuthorization(false));
          dispatch(ActionCreators.authorization(toModelUserDate(data)));
        }
      });
  },
  checkAuth: () => {
    return (dispatch, _getState, api) => {
      return api
        .get(Constants.LOGIN_PATH)
        .then(({status, data}) => {
          if (status === Constants.STATUS_OK) {
            dispatch(ActionCreators.requireAuthorization(false));
            dispatch(ActionCreators.authorization(toModelUserDate(data)));
          }
        });
    };
  },
  addToFavorites: (id) => (dispatch, _getState, api) => {
    return api
      .post(`${Constants.TO_FAVORITE_PATH}/${id}/1`)
      .then(({data}) => {
        dispatch(ActionCreators.addToFavorites(data));
      });
  },
  removeFromFavorite: (id) => (dispatch, _getState, api) => {
    return api
      .post(`${Constants.TO_FAVORITE_PATH}/${id}/0`)
      .then(({data}) => {
        dispatch(ActionCreators.addToFavorites(data));
      });
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.REQUIRED_AUTHORIZATION:
      return {...state, ...{isAuthorizationRequired: action.payload}};
    case ActionType.AUTHORIZATION:
      return {...state, ...{authorization: action.payload}};
    default:
      return state;
  }
};

export {initialState, ActionCreators, ActionType, Operation, reducer};
