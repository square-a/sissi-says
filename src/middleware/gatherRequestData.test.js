import middleware from './gatherRequestData';
import * as t from '@/actions/types';

describe('middleware/gatherRequestData', () => {
  let mockAction,
    mockDispatch,
    mockGetFormValues,
    mockGetState,
    mockNext,
    mockSelectors,
    mockTransformToHtml,
    mockMethods,
    mockStore;

  beforeEach(() => {
    mockAction = {
      type: t.SEND_REQUEST,
      payload: {
        method: 'post',
        formName: 'test',
        dataType: 'content',
      }};
    mockDispatch = jest.fn();
    mockGetFormValues = jest.fn(() => () => ({}));
    mockGetState = jest.fn();
    mockNext = jest.fn();
    mockSelectors = {
      getMetaData: jest.fn(),
      getAllPages: jest.fn(),
      getAllSections: jest.fn(),
      getFields: jest.fn(),
    };
    mockTransformToHtml = jest.fn((input) => input);
    mockMethods = {
      ...mockSelectors,
      getFormValues: mockGetFormValues,
      transformToHtml: mockTransformToHtml,
    };
    mockStore = {
      dispatch: mockDispatch,
      getState: mockGetState,
    };
  });

  it('should forward the action if the type is not SEND_REQUEST', () => {
    mockAction = { type: 'test' };

    middleware(mockStore, mockMethods)(mockNext)(mockAction);

    expect(mockNext).toBeCalledWith(mockAction);
  });

  it('should forward the action if the method is not "post"', () => {
    mockAction = { type: t.SEND_REQUEST, payload: { method: 'test' }};

    middleware(mockStore, mockMethods)(mockNext)(mockAction);

    expect(mockNext).toBeCalledWith(mockAction);
  });

  it('should collect data from the relevant reducers and form', () => {
    middleware(mockStore, mockMethods)(mockNext)(mockAction);

    expect(mockMethods.getMetaData).toBeCalled();
    expect(mockMethods.getAllPages).toBeCalled();
    expect(mockMethods.getAllSections).toBeCalled();
    expect(mockGetFormValues).toBeCalledWith('test');
  });

  it('should add requestData before forwarding the action', () => {
    mockMethods.transformToHtml = jest.fn(() => ({ meta: 'test', pages: 'test', sections: 'test' }));
    middleware(mockStore, mockMethods)(mockNext)(mockAction);

    expect(mockAction).toHaveProperty('payload');
    expect(mockAction.payload).toHaveProperty('requestData');
    expect(mockAction.payload.requestData).toHaveProperty('meta');
    expect(mockAction.payload.requestData).toHaveProperty('pages');
    expect(mockAction.payload.requestData).toHaveProperty('sections');
    expect(mockNext).toBeCalled();
  });

  describe('save meta form', () => {
    it('should merge the reducer data with the form data', () => {
      mockAction = {
        type: t.SEND_REQUEST,
        payload: {
          method: 'post',
          formName: 'meta',
          dataType: 'content',
        }};
      mockMethods.getFormValues = jest.fn(() => () => ({ metaInfo: 'test' }));
      mockMethods.getMetaData = jest.fn(() => ({ metaInfo: '', metaName: 'blubb' }));
      const expectedMetaData = { metaInfo: 'test', metaName: 'blubb' };

      middleware(mockStore, mockMethods)(mockNext)(mockAction);

      expect(mockAction.payload.requestData).toHaveProperty('meta', expectedMetaData);
    });
  });

  describe('save pages form', () => {
    it('should merge the reducer data with the form data', () => {
      mockAction = {
        type: t.SEND_REQUEST,
        payload: {
          method: 'post',
          formName: 'test-page-abc123',
          dataType: 'content',
        }};
      mockMethods.getFormValues = jest.fn(() => () => ({ title: 'new' }));
      mockMethods.getAllPages = jest.fn(() => ([
        { id: 'page1' },
        { id: 'abc123', title: 'test', image: 'yes' },
      ]));
      const expectedPageData = [{ id: 'page1' }, { id: 'abc123', title: 'new', image: 'yes' }];

      middleware(mockStore, mockMethods)(mockNext)(mockAction);

      expect(mockAction.payload.requestData).toHaveProperty('pages', expectedPageData);
    });
  });

  describe('save sections form', () => {
    it('should merge the reducer data with the form data', () => {
      mockAction = {
        type: t.SEND_REQUEST,
        payload: {
          method: 'post',
          formName: 'test-section-abc123',
          dataType: 'content',
        }};
      mockMethods.getFormValues = jest.fn(() => () => ({ title: 'new' }));
      mockMethods.getAllSections = jest.fn(() => ({
        section1: 'testData',
        abc123: { title: 'oldTitle' },
      }));
      const expectedSectionData = { section1: 'testData', abc123: { title: 'new' }};

      middleware(mockStore, mockMethods)(mockNext)(mockAction);

      expect(mockAction.payload.requestData).toHaveProperty('sections', expectedSectionData);
    });
  });
});
