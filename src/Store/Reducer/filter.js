const SAVE_FILTER = 'filter/SAVE_FILTER';
const IS_SELLER_FILTER = 'filter/IS_SELLER_FILTER';
const CLEAR_FILTER = 'filter/CLEAR_FILTER';

export const saveFilter = (items) => ({
  type: SAVE_FILTER,
  payload: items,
});

// export const sellerFilter = (items) => ({
//   type: IS_SELLER_FILTER,
//   payload: items,
// });

export const clearFilter = () => ({
  type: CLEAR_FILTER,
});

const initialState = {
  filter_list: [],
  // [
  //   {
  //     filterTitle: '판매여부',
  //     id: 'sale',
  //     category: [
  //       {
  //         category_id: '',
  //         category_title: '전체',
  //       },
  //       {
  //         category_id: 1,
  //         category_title: '판매',
  //       },
  //       {
  //         category_id: 0,
  //         category_title: '미판매',
  //       },
  //     ],
  //   },
  //   {
  //     filterTitle: '진열여부',
  //     id: 'display',
  //     category: [
  //       {
  //         category_id: '',
  //         category_title: '전체',
  //       },
  //       {
  //         category_id: 1,
  //         category_title: '진열',
  //       },
  //       {
  //         category_id: 0,
  //         category_title: '미진열',
  //       },
  //     ],
  //   },
  //   {
  //     filterTitle: '할인여부',
  //     id: 'discount',
  //     category: [
  //       {
  //         category_id: '',
  //         category_title: '전체',
  //       },
  //       {
  //         category_id: 1,
  //         category_title: '할인',
  //       },
  //       {
  //         category_id: 0,
  //         category_title: '미할인',
  //       },
  //     ],
  //   },
  //   {
  //     filterTitle: '셀러명',
  //     id: 'seller_name',
  //   },
  //   {
  //     filterTitle: '셀러속성',
  //     id: 'attribute',
  //     category: [
  //       {
  //         category_id: 0,
  //         category_title: '전체',
  //       },
  //       {
  //         category_id: 1,
  //         category_title: '마켓',
  //       },
  //       {
  //         category_id: 2,
  //         category_title: '쇼핑몰',
  //       },
  //     ],
  //   },
  // ],

  // filter_list: [
  //   {
  //     filterTitle: '판매여부',
  //     id: 'sale',
  //     category: [
  //       {
  //         category_id: '',
  //         category_title: '전체',
  //       },
  //       {
  //         category_id: 1,
  //         category_title: '판매',
  //       },
  //       {
  //         category_id: 0,
  //         category_title: '미판매',
  //       },
  //     ],
  //   },
  //   {
  //     filterTitle: '진열여부',
  //     id: 'display',
  //     category: [
  //       {
  //         category_id: '',
  //         category_title: '전체',
  //       },
  //       {
  //         category_id: 1,
  //         category_title: '진열',
  //       },
  //       {
  //         category_id: 0,
  //         category_title: '미진열',
  //       },
  //     ],
  //   },
  //   {
  //     filterTitle: '할인여부',
  //     id: 'discount',
  //     category: [
  //       {
  //         category_id: '',
  //         category_title: '전체',
  //       },
  //       {
  //         category_id: 1,
  //         category_title: '할인',
  //       },
  //       {
  //         category_id: 0,
  //         category_title: '미할인',
  //       },
  //     ],
  //   },
  // ],
};

const filter = (state = initialState, { type, payload }) => {
  switch (type) {
    case SAVE_FILTER:
      return { filter_list: payload };
    // case IS_SELLER_FILTER:
    //   return { filter_list: payload };
    case CLEAR_FILTER:
      return { filter_list: [] };
    default:
      return state;
  }
};

export default filter;
