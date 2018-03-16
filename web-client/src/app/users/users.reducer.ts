export const SET_USERS = 'GET_USERS';
export const USER_INFO = 'USER_INFO';
export const UPDATE_USER = 'UPDATE_USER';
export const CLEAR_USERS = 'CLEAR_USERS';
export const CLEAR_USER_INFO = 'CLEAR_USER_INFO';
const initialUsers = []
export function users(state = initialUsers, { type, payload }) {
  switch (type) {
    case SET_USERS:
      return payload;
    case USER_INFO:
      return state.map(user => {
        if (user.id === payload.id) {
          return {...user, info: payload}
        }
        return user;
      });
    case CLEAR_USER_INFO:
      return state.map(user => {
        if (user.id === payload.id) {
          return {...user, info: undefined}
        }
        return user;
      });
    case UPDATE_USER:
      return state.map(user => {
        if (user.id === payload.id) {
          return {...user, info: payload.info}
        }
        return user;
      });
    case CLEAR_USERS:
      return initialUsers;
    default:
      return state;
  }
};
