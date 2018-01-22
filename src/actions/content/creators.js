import * as t from './types';

export function setInitialContent() {
  return {
    type: t.SET_INITIAL_CONTENT,
  };
}

export function addPage(pageType) {
  return {
    type: t.ADD_PAGE,
    payload: { pageType },
  };
}

export function addSection(pageId, sectionType) {
  return {
    type: t.ADD_SECTION,
    payload: { pageId, sectionType },
  };
}
