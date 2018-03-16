import { BookActions } from './book.actions';

const initialState = {
  bookList: {},
  selectedBookContent: []
}
export function books(state = initialState, { type, payload }) {
  switch (type) {
    case BookActions.SET_BOOK_CONTENT:
      return { ...state, selectedBookContent: [...state.selectedBookContent, payload ] };
    case BookActions.SET_BOOK_LIST:
      return { ...state, bookList: payload };
    case BookActions.NEW_PARAGRAPH_ADDED:
      const content = state.selectedBookContent.map(paragraph => {
        if (paragraph._id === payload.updatedParent._id) {
          return payload.updatedParent;
        }
        return paragraph;
      });
      content.push(payload.createdParagraph);
      return { ...state, selectedBookContent: content };
    default:
      return state;
  }
};
