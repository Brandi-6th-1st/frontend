const SELLER_ATTRIBUTE = 'sellerAttribute/SELLER_ATTRIBUTE';
const CLEAR_ATTRIBUTE = 'sellerAttribute/CLEAR_ATTRIBUTE';

export const getAttribute = (attribute) => ({
  type: SELLER_ATTRIBUTE,
  payload: attribute,
});

export const clearAttribute = () => ({
  type: CLEAR_ATTRIBUTE,
});

const initialState = { category: '' };

const commonStatus = (state = initialState, { type, payload }) => {
  switch (type) {
    case SELLER_ATTRIBUTE:
      return { category: payload };
    case CLEAR_ATTRIBUTE:
      return { category: '' };
    default:
      return state;
  }
};

export default commonStatus;
