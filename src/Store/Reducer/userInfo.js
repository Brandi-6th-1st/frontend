const TYPE_MASTER = 'userInfo/TYPE_MASTER';
// const TYPE_SELLER = 'userInfo/isSeller';
const TYPE_NONE = 'userInfo/TYPE_NONE';

export const isMaster = (items) => ({
  type: TYPE_MASTER,
  payload: items,
});

// export const isSeller = () => ({
//   type: TYPE_SELLER,
// });

export const isUnknown = () => ({
  type: TYPE_NONE,
});

const initialState = null;

const userInfo = (state = initialState, { type, payload }) => {
  switch (type) {
    case TYPE_MASTER:
      return payload;
    // case TYPE_SELLER:
    //   return false;
    case TYPE_NONE:
      return null;
    default:
      return state;
  }
};

export default userInfo;
