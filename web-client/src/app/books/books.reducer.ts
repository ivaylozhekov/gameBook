import { BookActions } from './book.actions';

const initialState = {
  bookList: {},
  selectedBook: null,
  selectedBookContent: {}
}
export function books(state = initialState, { type, payload }) {
  switch (type) {
    case BookActions.SET_SELECTED_BOOK:
      return { ...state, selectedBook: payload, selectedBookContent: {} };
    case BookActions.SET_BOOK_CONTENT:
    debugger;
      return {
        ...state,
        selectedBookContent: {...state.selectedBookContent, [payload._id]: payload},
        selectedBook: payload.parents && payload.parents.length === 0 ? {...state.selectedBook, entry: payload._id } : state.selectedBook
      };
    case BookActions.SET_BOOK_LIST:
      return { ...state, bookList: payload };
    case BookActions.NEW_PARAGRAPH_ADDED:
      if (payload.updatedParent.paragraph) {
        state.selectedBookContent[payload.updatedParent.paragraph._id] = payload.updatedParent.paragraph;
      } else if (payload.updatedParent.bookEntry) {
        state.bookList[payload.updatedParent.bookEntry._id] = payload.updatedParent.bookEntry;
        state.selectedBook = payload.updatedParent.bookEntry
      }
      state.selectedBookContent[payload.createdParagraph._id] = payload.createdParagraph;
      return { ...state, selectedBookContent: state.selectedBookContent, bookList: state.bookList, selectedBook: state.selectedBook };
    case BookActions.BOOK_CREATED:
      state.bookList[payload._id] = payload;
      return { ...state, bookList: state.bookList, selectedBook: payload };
    case BookActions.RESET_SELECTED_BOOK:
      return { ...state, selectedBookContent: {}, selectedBook: null };
    default:
      return state;
  }
};
