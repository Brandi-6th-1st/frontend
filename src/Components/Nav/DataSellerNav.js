const SELLER_NAV = [
  {
    id: 1,
    main_url: 'home',
    menu_title: '홈',
    sub_menus: [
      {
        sub_menu_id: 1,
        sub_menu_title: '홈',
        sub_url: '',
      },
    ],
  },
  {
    id: 2,
    main_url: '',
    menu_title: '통계',
    sub_menus: [
      {
        sub_menu_id: 2,
        sub_menu_title: '생략',
        sub_url: '',
      },
    ],
  },
  {
    id: 3,
    main_url: 'order',
    menu_title: '주문관리',
    sub_menus: [
      {
        sub_menu_id: 4,
        sub_menu_title: '상품준비관리',
        sub_url: 'prepareList',
      },
      {
        sub_menu_id: 5,
        sub_menu_title: '배송준비관리',
        sub_url: 'deliveryPrepareList',
      },
      {
        sub_menu_id: 6,
        sub_menu_title: '배송중관리',
        sub_url: 'deliveryList',
      },
      {
        sub_menu_id: 7,
        sub_menu_title: '배송완료관리',
        sub_url: 'deliveryCompleteList',
      },
      {
        sub_menu_id: 8,
        sub_menu_title: '구매확정관리',
        sub_url: 'orderConfirmList',
      },
    ],
  },
  {
    id: 4,
    main_url: '',
    menu_title: '취소/환불관리',
    sub_menus: [
      {
        sub_menu_id: 2,
        sub_menu_title: '생략',
        sub_url: '',
      },
    ],
  },
  {
    id: 5,
    main_url: 'product',
    menu_title: '상품관리',
    sub_menus: [
      {
        sub_menu_id: 9,
        sub_menu_title: '상품관리',
        sub_url: '',
      },
      {
        sub_menu_id: 10,
        sub_menu_title: '상품등록',
        sub_url: 'register',
      },
    ],
  },
  {
    id: 6,
    main_url: '',
    menu_title: '고객응대관리',
    sub_menus: [
      {
        sub_menu_id: 2,
        sub_menu_title: '생략',
        sub_url: '',
      },
    ],
  },
  {
    id: 7,
    main_url: '',
    menu_title: '기획전/쿠폰관리',
    sub_menus: [
      {
        sub_menu_id: 2,
        sub_menu_title: '생략',
        sub_url: '',
      },
    ],
  },
  {
    id: 8,
    main_url: 'account',
    menu_title: '회원 관리',
    sub_menus: [
      {
        sub_menu_id: 14,
        sub_menu_title: '회원 관리_커뮤니티',
        sub_url: '',
      },
      {
        sub_menu_id: 15,
        sub_menu_title: '셀러 계정 관리',
        sub_url: 'seller',
      },
    ],
  },
];

export default SELLER_NAV;
