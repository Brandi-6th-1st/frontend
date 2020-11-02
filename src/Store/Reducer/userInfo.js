const TYPE_MASTER = 'userInfo/TYPE_MASTER';
const TYPE_NONE = 'userInfo/TYPE_NONE';
const SAVE_NAV = 'userInfo/SAVE_NAV';
const SAVE_FILTER = 'userInfo/SAVE_FILTER';

export const isMaster = (items) => ({
  type: TYPE_MASTER,
  payload: items,
});

export const saveNav = (items) => ({
  type: SAVE_NAV,
  payload: items,
});

export const saveFilter = (items) => ({
  type: SAVE_FILTER,
  payload: items,
});

export const isClear = () => ({
  type: TYPE_CLEAR,
});

const initialState = {
  is_master: true,
  filter_list: [],
  nav_list: [],
};

const userInfo = (state = initialState, { type, payload }) => {
  console.log(type);
  switch (type) {
    case TYPE_MASTER:
      return { ...state, isMaster: payload };
    case SAVE_FILTER:
      return { ...state, filter_list: payload };
    case SAVE_NAV:
      return { ...state, nav_list: payload };
    case TYPE_NONE:
      return {};
    default:
      return state;
  }
};
export default userInfo;

// const TYPE_MASTER = 'userInfo/TYPE_MASTER';
// // const TYPE_SELLER = 'userInfo/isSeller';
// const TYPE_NONE = 'userInfo/TYPE_NONE';

// export const isMaster = (items) => ({
//   type: TYPE_MASTER,
//   payload: items,
// });

// // export const isSeller = () => ({
// //   type: TYPE_SELLER,
// // });

// export const isUnknown = () => ({
//   type: TYPE_NONE,
// });

// const initialState = null;

// const userInfo = (state = initialState, { type, payload }) => {
//   switch (type) {
//     case TYPE_MASTER:
//       return payload;
//     // case TYPE_SELLER:
//     //   return false;
//     case TYPE_NONE:
//       return null;
//     default:
//       return state;
//   }
// };

// export default userInfo;
