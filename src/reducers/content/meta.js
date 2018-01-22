import * as t from '@/actions/types';

export default (state = [], action = {}) => {
  const { type, payload } = action;

  if (type === t.FETCH_DATA_SUCCESS && payload.dataType === 'content') {
    return payload.data.meta;
  }

  return state;
}
