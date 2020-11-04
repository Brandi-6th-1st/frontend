import { createAction, handleActions } from 'redux';

const CHANGE_VALUE = sellerData / CHANGE_VALUE;
const RESET_VALUE = sellerData / RESET_VALUE;

export const changeValue = createAction(CHANGE_VALUE, (value) => value);

const initialState = {
  limit: 10,
  offset: 0,
  id: null,
  identification: null,
  seller_name_en: null,
  seller_name_ko: null,
  manager_name: null,
  seller_status: null,
  manager_contact: null,
  manager_email: null,
  seller_attribute: null,
  start_date: null,
  end_date: null,
};

export default handleActions({
  [CHANGE_INPUT]: (state, aciton) => ({
    ...state,
    // limit:,
    // offset:,
    identification: action.payload,
    seller_name_en: action.payload,
    seller_name_ko: action.payload,
    manager_name: action.payload,
    seller_status: action.payload,
    manager_contact: action.payload,
    manager_email: action.payload,
    seller_attribute: action.payload,
    start_date: action.payload,
    end_date: action.payload,
  }),
  initialState,
});

// const CHANGE_LIMIT = 'sellerFilter / CHANGE_LIMIT';
// const CHANGE_OFFSET = 'sellerFilter / CHANGE_OFFSET';
// const CHANGE_ID = 'sellerFilter / CHANGE_ID';
// const CHANGE_IDENTIFICATION = 'sellerManagement / CHANGE_IDENTIFICATION';
// const CHANGE_SELLER_NAME_EN = 'sellerManagement / CHANGE_SELLER_NAME_EN';
// const CHANGE_SELLER_NAME_KO = 'sellerManagement / CHANGE_SELLER_NAME_KO';
// const CHANGE_MANAGER_NAME = 'sellerManagement / CHANGE_MANAGER_NAME';
// const CHANGE_SELLECT_STATUS = 'sellerManagement / CHANGE_SELLECT_STATUS';
// const CHANGE_SELLECT_STATUS = 'sellerManagement / CHANGE_SELLECT_STATUS';

// export const changeValue = value => ({type: CHANGE_VALUE, payload: value})

// export const changeLimit = (value) = ({
//   type: CHANGE_LIMIT,
//   value,
// });

// export const changeOffset = (value) = ({
//   type: CHANGE_OFFSET,
//   value,
// });

// const initialState = {
//   limit: 10,
//   offset: 0,
//   id: null,
//   identification: null,
//   seller_name_en: null,
//   seller_name_ko: null,
//   manager_name: null,
//   seller_status: null,
//   manager_contact: null,
//   manager_email: null,
//   seller_attribute: null,
//   start_date: null,
//   end_date: null,
// };

// export default sellerFilter((state = initialState), aciton){
//   switch(action.type) {
//     case CHANGE_LIMIT:
//       return{
// ...state,
// limit: payload
//       }
//   }
// }
