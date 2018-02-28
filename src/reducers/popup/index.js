import * as t from '@/actions/types';

const initialState = {
  image: false,
  guide: false,
};

export default (state = initialState, action = {}) => {
  const { type, payload } = action;

  if (type === t.SET_POPUP) {
    return Object.assign({}, state, { [payload.type]: payload.shouldDisplay });
  }

  return state;
};

export function getDisplayImagePopup(state) {
  return state.popup.image;
}

export function getDisplayGuidePopup(state) {
  return state.popup.guide;
}