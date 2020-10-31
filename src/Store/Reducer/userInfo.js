const typeMaster = 'userInfo/isMaster';
const typeSeller = 'userInfo/isSeller';
const typeNone = 'userInfo/isNone';
const typetoken = 'userInfo/token';

export const isMaster = () => ({
  type: typeMaster,
});

export const isSeller = () => ({
  type: typeSeller,
});

export const isUnknown = () => ({
  type: typeNone,
});

export const isToken = (token) => ({
  type: typetoken,
  payload: token,
});

const initialState = {
  userType: false,
  token: 'najueunBABO',
};

const userInfo = (state = initialState, { type, payload }) => {
  switch (type) {
    case typeMaster:
      return { ...initialState, userType: true };
    case typeSeller:
      return { ...initialState, userType: false };
    case typeNone:
      return { ...initialState, userType: null };
    case typetoken:
      return { ...initialState, token: payload };
    default:
      return state;
  }
};

export default userInfo;
