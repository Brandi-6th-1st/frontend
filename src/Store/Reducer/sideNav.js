const SELLER_NAV = 'sideNav/SELLER_NAV';
const MASTER_NAV = 'sideNav/MASTER_NAV';

export const sellerNav = (items) => ({
  type: SELLER_NAV,
  payload: items,
});

export const masterNav = (items) => ({
  type: MASTER_NAV,
  payload: items,
});

const initialState = [];

const sideNav = (state = initialState, { type, payload }) => {
  switch (type) {
    case SELLER_NAV:
      return payload;
    case MASTER_NAV:
      return payload;
    default:
      return state;
  }
};

export default sideNav;
