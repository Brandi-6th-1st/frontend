const MASTER_NAV = [
  {
    id: 1,
    category: '홈',
  },
  {
    id: 2,
    category: '통계',
    subcategory: [{ id: 1, title: '시간단위분석' }],
  },
  {
    id: 3,
    category: '주문관리',
    subcategory: [
      { id: 1, title: '결제완료관리' },
      { id: 2, title: '상품준비관리' },
      { id: 3, title: '배송중관리' },
      { id: 4, title: '배송완료관리' },
      { id: 5, title: '구매확정관리' },
    ],
  },
  {
    id: 4,
    category: '취소/환불 관리',
    subcategory: [
      { id: 1, title: '환불요청관리' },
      { id: 2, title: '환불완료관리' },
      { id: 3, title: '주문취소완료관리' },
    ],
  },
  {
    id: 5,
    category: '상품관리',
    subcategory: [
      { id: 1, title: '상품 관리' },
      { id: 2, title: '상품 등록' },
    ],
  },
  {
    id: 6,
    category: '고객응대관리',
    subcategory: [
      { id: 1, title: 'Q&A 관리' },
      { id: 2, title: '텍스트 리뷰' },
    ],
  },
  {
    id: 7,
    category: '기획전/쿠폰관리',
    subcategory: [
      { id: 1, title: '기획전 관리' },
      { id: 2, title: '쿠폰 관리' },
    ],
  },
  {
    id: 8,
    category: '회원관리',
    subcategory: [
      { id: 1, title: '회원 관리_커뮤니티' },
      { id: 2, title: '셀러 계정 관리' },
    ],
  },
];

export default MASTER_NAV;
