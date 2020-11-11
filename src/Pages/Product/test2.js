const filter_list = [
  {
    id: 'sale',
    filterTitle: '판매여부',
    category: [
      { category_id: '', category_title: '전체' },
      { category_id: 1, category_title: '판매' },
      { category_id: 0, category_title: '미판매' },
    ],
  },
  {
    id: 'sale',
    filterTitle: '진열여부',
    category: [
      { category_id: '', category_title: '전체' },
      { category_id: 1, category_title: '진열' },
      { category_id: 0, category_title: '미진열' },
    ],
  },
  {
    id: 'sale',
    filterTitle: '할인여부',
    category: [
      { category_id: '', category_title: '전체' },
      { category_id: 1, category_title: '할인' },
      { category_id: 0, category_title: '미할인' },
    ],
  },
];

selectId: null, isSelected[(true, false, false)];







    selectedId : 1,
    'attribute' : [true, false, false]