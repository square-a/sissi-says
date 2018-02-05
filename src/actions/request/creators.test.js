import * as t from './types';
import * as actions from './creators';

describe('actions/request', () => {
  describe('fetchData', () => {
    it('should dispatch an action with the correct type and payload', () => {
      const action = actions.fetchData('test');

      expect(action).toHaveProperty('type', t.SEND_REQUEST);
      expect(action.payload).toHaveProperty('method', 'get');
      expect(action.payload).toHaveProperty('dataType', 'test');
      expect(action.payload).toHaveProperty('successDispatch');
    });

    it('should pass the dataType to the standard successDispatch', () => {
      const action = actions.fetchData('test');
      const successAction = action.payload.successDispatch[0]();

      expect(action.payload.successDispatch).toHaveLength(1);
      expect(successAction.payload).toHaveProperty('dataType', 'test');
    });
  });

  describe('fetchDataSuccess', () => {
    it('should dispatch an action with the correct type and payload', () => {
      const action = actions.fetchDataSuccess('testType', 'testData');

      expect(action).toHaveProperty('type', t.FETCH_DATA_SUCCESS);
      expect(action.payload).toHaveProperty('dataType', 'testType');
      expect(action.payload).toHaveProperty('data', 'testData');
    });
  });

  describe('postContent', () => {
    it('should dispatch an action with the correct type and payload', () => {
      const action = actions.postContent('test');

      expect(action).toHaveProperty('type', t.SEND_REQUEST);
      expect(action.payload).toHaveProperty('method', 'post');
      expect(action.payload).toHaveProperty('dataType', 'content');
      expect(action.payload).toHaveProperty('formName', 'test');
      expect(action.payload).toHaveProperty('successDispatch');
    });
  });

  describe('postContentSuccess', () => {
    it('should dispatch an action with the correct type and payload', () => {
      const action = actions.postContentSuccess('testContent');

      expect(action).toHaveProperty('type', t.POST_CONTENT_SUCCESS);
      expect(action.payload).toHaveProperty('content', 'testContent');
    });
  });
});