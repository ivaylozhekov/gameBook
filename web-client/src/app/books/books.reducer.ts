import { BookActions } from './book.actions';

const initialState = {
  bookList: {},
  selectedBook: {},
  selectedBookContent: {}
}
export function books(state = initialState, { type, payload }) {
  const content = state.selectedBookContent;
  switch (type) {
    case BookActions.SET_SELECTED_BOOK:
      return { ...state, selectedBook: payload };
    case BookActions.SET_BOOK_CONTENT:
      content[payload._id] = payload;
      return { ...state, selectedBookContent: content };
    case BookActions.SET_BOOK_LIST:
      return { ...state, bookList: payload };
    case BookActions.NEW_PARAGRAPH_ADDED:
      content[payload.updatedParent._id] = payload.updatedParent;
      content[payload.createdParagraph._id] = payload.createdParagraph;
      return { ...state, selectedBookContent: content };
    default:
      return state;
  }
};
