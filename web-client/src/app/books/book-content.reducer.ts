export const SET_BOOK_CONTENT = 'SET_BOOK_CONTENT';
const initialContent = []
export const bookContent = (state = initialContent, { type, payload }) => {
  switch (type) {
    case SET_BOOK_CONTENT:
      return payload;
    default:
      return state;
  }
};
