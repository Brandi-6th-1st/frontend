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

const initialState = true;

const userInfo = (state = initialState, { type }) => {
  switch (type) {
    case typeMaster:
      return true;
    case typeSeller:
      return false;
    case typeNone:
      return null;
    default:
      return state;
  }
};

export default userInfo;
