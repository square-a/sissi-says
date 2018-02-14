import * as t from '@/actions/types';

const initialState = {
  isInitialDataFetched: false,
  token: '',
};

export default (state = initialState, action = {}) => {
  const { type, payload } = action;

  if (type === t.FETCH_DATA_SUCCESS) {
    return Object.assign({}, state, { isInitialDataFetched: true });

  } else if (type === t.LOGIN_SUCCESS) {
    return Object.assign({}, state, { token: payload });
  }

  return state;
};

export function getIsInitialDataFetched(state) {
  return state.login.isInitialDataFetched;
}
