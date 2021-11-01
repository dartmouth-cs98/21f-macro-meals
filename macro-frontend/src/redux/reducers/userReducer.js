export const USER = '[USER]';
export const USER_LOGIN = `${USER} Set user as logged in`;
export const USER_LOGOUT = `${USER} Set user as logged out`;

export const userLogin = ({ name }) => ({
  type: USER_LOGIN,
  payload: {
    name,
  },
});

export const userLogout = () => ({
  type: USER_LOGOUT,
  payload: {},
});

const initialState = {
  isLoggedIn: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN: {
      const { name = 'anon' } = action.payload;
      return {
        isLoggedIn: true,
        name,
      };
    }
    case USER_LOGOUT: {
      return {
        isLoggedIn: false,
      };
    }
    default: {
      return state;
    }
  }
};

export default userReducer;
