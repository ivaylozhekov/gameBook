export const SET_BOOK_CONTENT = 'SET_BOOK_CONTENT';
export const SET_BOOK_LIST = 'SET_BOOK_LIST';
const initialState = {
  bookList: {},
  selectedBookContent: {}
}
export const bookContent = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_BOOK_CONTENT:
      return { ...state, selectedBookContent: payload };
    case SET_BOOK_LIST:
      return { ...state, bookList: payload };
    default:
      return state;
  }
};
