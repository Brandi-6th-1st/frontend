const TYPE_MASTER = 'userInfo/TYPE_MASTER';
const TYPE_CLEAR = 'userInfo/TYPE_CLEAR';
const SAVE_NAV = 'userInfo/SAVE_NAV';
const SAVE_FILTER = 'userInfo/SAVE_FILTER';

// 마스터인지 셀러인지
export const isMaster = (items) => ({
  type: TYPE_MASTER,
  payload: items,
});

// nav Data
export const saveNav = (items) => ({
  type: SAVE_NAV,
  payload: items,
});

// filter Data
export const saveFilter = (items) => ({
  type: SAVE_FILTER,
  payload: items,
});

// 로그아웃시 clear
export const isClear = () => ({
  type: TYPE_CLEAR,
});

// 기본값
const initialState = {
  is_master: true,
  // filter_list: [],
  nav_list: [],
  //   attribute: "쇼핑몰"
  // created_at: "Sun, 25 Oct 2020 21:54:53 GMT"
  // discount_rate: null
  // image_url: "https://image.brandi.me/cproduct/2020/10/25/21534186_1603617675_image1_M.jpg"
  // is_displayed: 1
  // is_on_sale: 1
  // price: 20000
  // product_code: 1
  // product_name: "[대박예쁨/2C] 보카시 크롭 어깨 퍼프 숏 니트 _ 러브모노"
  // product_number: 1
  // seller_name: "러브모노"
  filter_list: [
    {
      filterTitle: '판매여부',
      id: 'sale',
      category: [
        {
          category_id: '',
          category_title: '전체',
        },
        {
          category_id: 1,
          category_title: '판매',
        },
        {
          category_id: 0,
          category_title: '미판매',
        },
      ],
    },
    {
      filterTitle: '진열여부',
      id: 'display',
      category: [
        {
          category_id: '',
          category_title: '전체',
        },
        {
          category_id: 1,
          category_title: '진열',
        },
        {
          category_id: 0,
          category_title: '미진열',
        },
      ],
    },
    {
      filterTitle: '할인여부',
      id: 'discount',
      category: [
        {
          category_id: '',
          category_title: '전체',
        },
        {
          category_id: 1,
          category_title: '할인',
        },
        {
          category_id: 0,
          category_title: '미할인',
        },
      ],
    },
    {
      filterTitle: '셀러명',
      id: 'seller_name',
    },
    {
      filterTitle: '셀러속성',
      id: 'attribute',
      category: [
        {
          category_id: 0,
          category_title: '전체',
        },
        {
          category_id: 1,
          category_title: '마켓',
        },
        {
          category_id: 2,
          category_title: '쇼핑몰',
        },
        {
          category_id: 3,
          category_title: '그랜드마켓',
        },
      ],
    },
  ],
  // nav_list: [
  //   {
  //     id: 1,
  //     main_url: 'home',
  //     menu_title: '홈',
  //     sub_menus: [
  //       {
  //         sub_menu_id: 1,
  //         sub_menu_title: '홈',
  //         sub_url: 'home',
  //       },
  //     ],
  //   },
  //   {
  //     id: 2,
  //     main_url: '',
  //     menu_title: '통계',
  //     sub_menus: [
  //       {
  //         sub_menu_id: 2,
  //         sub_menu_title: '생략',
  //         sub_url: '',
  //       },
  //     ],
  //   },
  //   {
  //     id: 3,
  //     main_url: 'order',
  //     menu_title: '주문관리',
  //     sub_menus: [
  //       {
  //         sub_menu_id: 4,
  //         sub_menu_title: '상품준비관리',
  //         sub_url: 'prepareList',
  //         // sub_url: 'prepareList',
  //       },
  //       {
  //         sub_menu_id: 5,
  //         sub_menu_title: '배송준비관리',
  //         sub_url: 'deliveryPrepareList',
  //         // sub_url: 'deliveryPrepareList',
  //       },
  //       {
  //         sub_menu_id: 6,
  //         sub_menu_title: '배송중관리',
  //         sub_url: 'deliveryList',
  //         // sub_url: 'deliveryList',
  //       },
  //       {
  //         sub_menu_id: 7,
  //         sub_menu_title: '배송완료관리',
  //         sub_url: 'deliveryCompleteList',
  //         // sub_url: 'deliveryCompleteList',
  //       },
  //       {
  //         sub_menu_id: 8,
  //         sub_menu_title: '구매확정관리',
  //         sub_url: 'orderConfirmList',
  //         // sub_url: 'orderConfirmList',
  //       },
  //     ],
  //   },
  //   {
  //     id: 4,
  //     main_url: '',
  //     menu_title: '취소/환불관리',
  //     sub_menus: [
  //       {
  //         sub_menu_id: 2,
  //         sub_menu_title: '생략',
  //         sub_url: '',
  //       },
  //     ],
  //   },
  //   {
  //     id: 5,
  //     main_url: 'product',
  //     menu_title: '상품관리',
  //     sub_menus: [
  //       {
  //         sub_menu_id: 9,
  //         sub_menu_title: '상품관리',
  //         sub_url: 'product',
  //       },
  //       {
  //         sub_menu_id: 10,
  //         sub_menu_title: '상품등록',
  //         sub_url: 'product',
  //         // sub_url: 'register',
  //       },
  //     ],
  //   },
  //   {
  //     id: 6,
  //     main_url: '',
  //     menu_title: '고객응대관리',
  //     sub_menus: [
  //       {
  //         sub_menu_id: 2,
  //         sub_menu_title: '생략',
  //         sub_url: '',
  //       },
  //     ],
  //   },
  //   {
  //     id: 7,
  //     main_url: '',
  //     menu_title: '기획전/쿠폰관리',
  //     sub_menus: [
  //       {
  //         sub_menu_id: 2,
  //         sub_menu_title: '생략',
  //         sub_url: '',
  //       },
  //     ],
  //   },
  //   {
  //     id: 8,
  //     main_url: 'account',
  //     menu_title: '회원 관리',
  //     sub_menus: [
  //       {
  //         sub_menu_id: 14,
  //         sub_menu_title: '회원 관리_커뮤니티',
  //         sub_url: '',
  //       },
  //       {
  //         sub_menu_id: 15,
  //         sub_menu_title: '셀러 계정 관리',
  //         sub_url: 'seller',
  //       },
  //     ],
  //   },
  // ],
};

const userInfo = (state = initialState, { type, payload }) => {
  switch (type) {
    case TYPE_MASTER:
      return { ...state, is_master: payload };
    case SAVE_FILTER:
      return { ...state, filter_list: payload };
    case SAVE_NAV:
      return { ...state, nav_list: payload };
    case TYPE_CLEAR:
      return {};
    default:
      return state;
  }
};
export default userInfo;
