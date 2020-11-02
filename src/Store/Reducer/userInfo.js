const TYPE_MASTER = 'userInfo/isMaster';
const TYPE_SELLER = 'userInfo/isSeller';
const TYPE_NONE = 'userInfo/isNone';

export const isMaster = () => ({
  type: TYPE_MASTER,
});

export const isSeller = () => ({
  type: TYPE_SELLER,
});

export const isUnknown = () => ({
  type: TYPE_NONE,
});

const initialState = true;

const userInfo = (state = initialState, { type }) => {
  switch (type) {
    case TYPE_MASTER:
      return true;
    case TYPE_SELLER:
      return false;
    case TYPE_NONE:
      return null;
    default:
      return state;
  }
};

export default userInfo;
