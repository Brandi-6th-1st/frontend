const LOGGED_IN = 'login/LOGGED_IN';
const LOGGED_OUT = 'login/LOGGED_OUT';

export const lonIn = () => ({
  type: LOGGED_IN,
});

export const lonOut = () => ({
  type: LOGGED_OUT,
});

const initialState = false;

const login = (state = initialState, action) => {
  switch (action.type) {
    case LOGGED_IN:
      return true;
    case LOGGED_OUT:
      return false;
    default:
      return state;
  }
};

export default login;
