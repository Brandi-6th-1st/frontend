const SELLER_NAV = [
  {
    id: 1,
    category: '홈',
    link: '/Home',
  },
  {
    id: 2,
    category: '공지사항',
    subcategory: [
      { id: 1, title: '브랜디 공지' },
      { id: 2, title: '기획전 상품 신청' },
    ],
  },
  {
    id: 3,
    category: '통계',
    subcategory: [
      { id: 1, title: '기간별 통계' },
      { id: 2, title: '베스트 상품분석' },
      { id: 3, title: '판매추세 분석(상품별)' },
    ],
  },
  {
    id: 4,
    category: '주문관리',
    subcategory: [
      { id: 1, title: '전체주문 관리' },
      { id: 2, title: '상품준비관리', link: '/Order/1' },
      { id: 3, title: '배송준비관리' },
      { id: 4, title: '배송중관리', link: '/Order/2' },
      { id: 5, title: '배송완료관리', link: '/Order/3' },
      { id: 6, title: '구매확정관리', link: '/Order/4' },
    ],
  },
  {
    id: 5,
    category: '취소/환불 관리',
    subcategory: [
      { id: 1, title: '환불요청관리' },
      { id: 2, title: '반품진행관리' },
      { id: 3, title: '환불승인중관리' },
      { id: 4, title: '환불완료관리' },
      { id: 5, title: '주문취소중관리' },
      { id: 6, title: '주문취소완료관리' },
    ],
  },
  {
    id: 6,
    category: '상품관리',
    subcategory: [
      { id: 1, title: '상품 관리' },
      { id: 2, title: '상품 등록' },
    ],
  },
  {
    id: 7,
    category: '고객응대관리',
    subcategory: [
      { id: 1, title: 'Q&A 관리' },
      { id: 2, title: '텍스트 리뷰' },
      { id: 3, title: '포토 리뷰' },
    ],
  },
  {
    id: 8,
    category: '정산관리',
    subcategory: [
      { id: 1, title: '정산 관리' },
      { id: 2, title: '셀러별 정산요약' },
      { id: 3, title: '셀러별 판매수수료' },
      { id: 4, title: '주문별 판매수수료' },
      { id: 5, title: '셀러별 서버이용료' },
    ],
  },
  {
    id: 9,
    category: '진열관리',
    subcategory: [{ id: 1, title: '상점진열관리' }],
  },
  {
    id: 10,
    category: '회원관리',
    subcategory: [
      { id: 1, title: '셀러 정보 관리' },
      { id: 2, title: '페널티 셀러 관리' },
      { id: 3, title: '도매처 관리' },
    ],
  },
  {
    id: 11,
    category: '고객센터',
    subcategory: [
      { id: 1, title: '헬피 신청 안내' },
      { id: 2, title: '카카오톡 문의' },
      { id: 3, title: '전화' },
      { id: 4, title: 'MD에게 제안' },
      { id: 5, title: '오류/수정 제안' },
    ],
  },
];

export default SELLER_NAV;
