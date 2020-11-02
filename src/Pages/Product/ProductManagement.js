import React, { Fragment, useState, useEffect } from 'react';
import regeneratorRuntime from 'regenerator-runtime';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import dateFormatChange from '../../Components/ChangeTimeFormat';
import { ko } from 'date-fns/esm/locale';
import DatePicker from 'react-datepicker';
import '../../Styles/datepick.css';
import styled from 'styled-components';
import ProductDetail from './Components/ProductDetail';
import Nav from '../../Components/Nav/Nav';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import Purchase from './Components/Purchase';

export default function ProductManagement() {
  const dispatch = useDispatch();
  // 모달창 출력 유무를 관리
  const [showModal, setShowModal] = useState(false);
  // 마스터에만 사용되는 데이터를 관리
  const [differentFilter, setDifferentFilter] = useState();
  // 공통으로 사용되는 데이터를 관리
  const [product, setProduct] = useState();
  // 리덕스에서 가져온 필터를 상태로 관리
  const [filters, setFilters] = useState({});
  // 각 필터의 상태를 선택된 상태를 배열로 관리
  const [filterStatus, setFilterStatus] = useState();
  // 현재 페이지 관리
  const [currentDate, setCurrentDate] = useState({
    startDate: '',
    endDate: '',
  });
  // 현재 페이지 관리
  const [activePage, setActivePage] = useState(1);
  const sellerNameId = 'seller_name';
  const attributeId = 'attribute';
  const salesId = 'sale';
  const displayId = 'display';
  const discountId = 'discount';

  // axios할 쿼리url 생성
  // const [queryUrl, setQueryUrl] = useState('');
  // 쿼리스트링을 만들 상태를 따로 관리
  const [query, setQuery] = useState({
    startDate: null,
    endDate: null,
    sellerName: null,
    sellerDetail: null,
    productDetail: null,
    sellerAttribute: [],
    salesStatus: null,
    displayStatus: null,
    discountStatus: null,
    limit: 10,
    offset: 0,
  });

  // store에서 유저타입과 토큰을 가져온다.
  const userType = useSelector(({ userInfo }) => userInfo);

  // store에 있는 마스터 or 셀러 필터를 가져온다.
  const { filter_list } = useSelector(({ filter }) => ({
    filter_list: filter.filter_list,
    // filter_list: filter.filter_list,
  }));

  // get을 통하여 들어오는 필터의 상태별로 각 버튼의 boolean 생성
  const createFilter = (data) => {
    const allFilter =
      data &&
      data.filter_list.map((el) => {
        return {
          [el.filterTitle]: new Array(el.category && el.category.length)
            .fill()
            .map((_, index) => (index === 0 ? true : false)),
          selectedId: '',
        };
      });

    setFilterStatus(allFilter);
  };

  ///public/Data/DataProductManage.json
  ///http://10.58.7.141:5000/product

  // Test : json형식 mock-data 생성
  // axios get을 사용하여 데이터를 받아온다.

  const getData = async (param) => {
    try {
      const result = await axios.get(`/public/Data/DataProductManage.json`, {
        params: param,
        timeout: 3000, //3초,
      });

      // 받아온 데이터를 비구조 할당하여 data에 저장한다.
      const { DataProductManage } = result.data;

      // 유저 타입이 마스터인 경우,
      if (userType) {
        // 셀러명 검색 필터만 분리하여 정의

        const masterData =
          filter_list && filter_list.filter((el) => el.id === sellerNameId)[0];

        const sellerData = {
          ...filter_list,
          filter_list: filter_list.filter((el) => el.id !== sellerNameId),
        };

        // 각 필터의 상태를 관리하는 배열이 없다면 필터의 길이별로 배열 생성
        if (!filterStatus) {
          createFilter(sellerData);
        }

        // 마스터에서만 사용하는 데이터 저장
        setDifferentFilter(masterData);
        // 상품 리스트에 보여줄 데이터를 저장
        setProduct(DataProductManage);
        // 공용으로 사용하는 데이터 저장
        setFilters(sellerData);
      }
      // 유저 타입이 셀러인 경우,
      if (!userType) {
        // 마스터와 셀러 공용 필터를 따로 저장
        setProduct(DataProductManage);
        // 각 필터별로 상태를 생성
        setFilters(filter_list);
        // 각 필터의 상태를 관리하는 배열이 없다면 필터의 길이별로 배열 생성
        if (!filterStatus) {
          createFilter(filter_list);
        }
      }
    } catch (err) {
      if (err.response) {
        console.log('서버 응답을 받았으나 성공하지 못했습니다.');
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log('서버 응답 실패');
        console.log(error.request);
      } else {
        console.log(error.message);
      }
      console.log(error.config);
    }
  };

  // 페이지 마운트시 axios하여 상품관리 페이지에 필요한 데이터를 get
  useEffect(() => {
    getData(null);
  }, []);

  // 각 필터 선택시 true <-> false로 바꿔준다.
  const changeFilter = (id, idx, name, filterId) => {
    // 단일선택하는 필터인 경우
    if (filterId !== attributeId) {
      setFilterStatus(
        filterStatus.map((el) =>
          !!el[name]
            ? {
                ...el,
                id: filterId,
                [name]: el[name].map((_, index) => {
                  return index === idx ? true : false;
                }),
                selectedId: id,
              }
            : el
        )
      );
    }

    // 다중선택하는 필터인 경우
    if (filterId === attributeId) {
      // 필터 전체를 관리하는 배열에서 다중선택하는 필터인 셀러속성이 들어있는 배열만 가져온다.
      const multiFilter =
        filterStatus && filterStatus.filter((el) => el && !!el[name] && el)[0];

      // 버튼을 클릭하고 해제하는 함수
      const changeBtn = multiFilter[name].map((el, index) => {
        return index === idx ? !el : el;
      });

      // 전체버튼이 아닌 다른 버튼이 눌렸을 때, 전체 버튼 해제
      if (idx !== 0) {
        changeBtn[0] = false;
      }

      //버튼이 눌렸을 때, 각 카테고리의 id를 상태로 저장하는 함수
      const addId = (idx) => {
        // 버튼이 클릭되었을 때, 선택된 id 배열에 해당 카테고리 id 추가
        if (
          multiFilter[name].map((el, index) => {
            return index === idx && !el;
          })[idx]
        )
          return [...multiFilter.selectedId].concat(id);

        // 버튼이 해제되었을 때, 선택된 id 배열에서 해당 id 제거
        if (
          !multiFilter[name].map((el, index) => {
            return index === idx && !el;
          })[idx]
        )
          return (
            // 선택되어 있는 상태를 관리하는 배열에서 클릭된 id를 제외한 값만 필터링한다.
            multiFilter.selectedId &&
            multiFilter.selectedId.filter((el) => {
              return el !== id && el;
            })
          );
      };

      // 전체 상태에서 바꿔줄 값만 필터링하여 바꿔서 끼워준다.
      const setFilter = (btnStatus) => {
        return filterStatus.map((el) => {
          return !!el[name] ? btnStatus : el;
        });
      };

      // 전체 버튼이 눌렸을 때,
      const allSelectBtn = changeBtn[0];

      // 모든 버튼이 눌리게 되면,
      const allSelected = changeBtn.slice(1).every((item) => {
        return item;
      });

      // 모든 버튼이 눌리지 않았을 때,
      const allNotSelected = changeBtn.slice(1).every((item) => {
        return !item;
      });

      // 전체가 선택되어야 할 조건
      const allCondition = allSelectBtn || allSelected || allNotSelected;

      //전체가 선택되어야할 조건이 아니라면
      if (!allCondition) {
        setFilterStatus(
          setFilter({
            id: filterId,
            [name]: changeBtn,
            selectedId: addId(idx),
          })
        );
      }
      // 전체가 선택되어야 한다면
      if (allCondition) {
        setFilterStatus(
          setFilter({
            id: filterId,
            [name]: multiFilter[name].map((el, index) => {
              return index === 0 ? true : false;
            }),
            selectedId: [''],
          })
        );
      }
    }
  };

  // 검색 버튼일 눌리게 되면 동작할 함수.
  const sendData = () => {
    console.log(
      'test',
      filterStatus &&
        filterStatus.filter((el) => {
          return el.id === salesId && el.id;
        })[0] &&
        filterStatus.filter((el) => {
          return el.id === salesId && el.id;
        })[0].selectedId
    );

    // 셀러속성의 현재 버튼이 눌린 상태
    const attribute =
      filterStatus &&
      filterStatus.filter((el) => {
        return !!el['셀러속성'] && el.id;
      })[0] &&
      filterStatus
        .filter((el) => {
          return !!el['셀러속성'] && el.selectedId;
        })[0]
        .selectedId.reduce((acc, item) => {
          return acc ? acc + ',' + item : acc + item;
        });

    // 판매여부의 현재 버튼이 눌린 상태
    const salse =
      filterStatus &&
      filterStatus.filter((el) => {
        return el.id === salesId && el.id;
      })[0] &&
      filterStatus.filter((el) => {
        return el.id === salesId && el.id;
      })[0].selectedId;

    // 진열여부의 현재 버튼이 눌린 상태
    const display =
      filterStatus &&
      filterStatus.filter((el) => {
        return el.id === displayId && el.id;
      })[0] &&
      filterStatus.filter((el) => {
        return el.id === displayId && el.id;
      })[0].selectedId;

    // 할인여부의 현재 버튼이 눌린 상태
    const discount =
      filterStatus &&
      filterStatus.filter((el) => {
        return el.id === discountId && el.id;
      })[0] &&
      filterStatus.filter((el) => {
        return el.id === discountId && el.id;
      })[0].selectedId;

    const test = query.sellerDetail;
    console.log({ ...query });

    // 상태로 저장하고 있던 값을 params로 보내기 위해 data form 변경
    const queryObj = {
      ...query,
      offset:
        (activePage - 1) * query.limit !== 0
          ? (activePage - 1) * query.limit
          : null,
      limit: Number(query.limit) !== 10 ? query.limit : null,
      sellerAttribute: attribute ? attribute : null,
      salesStatus: salse !== '' ? salse : null,
      displayStatus: display !== '' ? display : null,
      discountStatus: discount !== '' ? discount : null,
      [`${query.sellerDetail}`]: query.productDetail,
      sellerDetail: null,
      productDetail: null,
    };

    console.log('전송');
    console.log('전송된 파람스', queryObj);
    //변경된 form을 param에 넣어 get Data
    getData(queryObj);
  };

  // 검색버튼을 눌렀을 때 실행되는 함수
  const handleSearch = () => {
    sendData();
    setActivePage(1);
  };
  // 초기화 버튼을 눌렀을 때, 상태를 초기화해준다.
  const resetFilter = () => {
    console.log('초기화');
    createFilter(filters);
    setQuery({
      startDate: null,
      endDate: null,
      sellerName: null,
      sellerDetail: null,
      productDetail: null,
      sellerAttribute: [],
      salesStatus: null,
      displayStatus: null,
      discountStatus: null,
      limit: Number(query.limit),
      offset: Number(query.limit) ? Number(query.limit) : 10 * activePage,
    });
    setCurrentDate({
      startDate: '',
      endDate: '',
    });
  };

  // DatePicker 라이브러리에서 지원하는 form과 관리하는 form이 달라서 따로 관리해주었다.
  const handleEndDate = (date) => {
    setCurrentDate({ ...currentDate, endDate: date });
    setQuery({
      ...query,
      endDate: dateFormatChange(date),
    });
  };

  // DatePicker 라이브러리에서 지원하는 form과 관리하는 form이 달라서 따로 관리해주었다.
  const handleStartDate = (date) => {
    setCurrentDate({ ...currentDate, startDate: date });
    setQuery({
      ...query,
      startDate: dateFormatChange(date),
    });
  };

  return (
    <Fragment>
      <Header />
      <Main>
        <Nav />
        <Section>
          <Purchase showModal={showModal} setShowModal={setShowModal} />
          <h3>상품 관리</h3>
          <FilterContainer>
            <FilterCategoryTitle>
              <FilterTitle>조회 기간</FilterTitle>
              {/* 조회 가긴의 캘린더 렌더 */}
              <InquiryperiodBox>
                <SelectPeriod
                  selected={currentDate.startDate || ''}
                  locale={ko}
                  dateFormat="yyyy-MM-dd"
                  onChange={(date) => {
                    handleStartDate(date);
                  }}
                  placeholderText="클릭해주세요."
                  shouldCloseOnSelect={false}
                />
                <span>~</span>
                <SelectPeriod
                  selected={currentDate.endDate || ''}
                  locale={ko}
                  dateFormat="yyyy-MM-dd"
                  onChange={(date) => handleEndDate(date)}
                  placeholderText="클릭해주세요."
                  shouldCloseOnSelect={false}
                />
              </InquiryperiodBox>
            </FilterCategoryTitle>
            <FiltersCategoryTitle>
              {/* 마스터에만 있는 셀러명 필터 렌더 */}
              {differentFilter && differentFilter.id === sellerNameId && (
                <SelectFilterCategory>
                  <FilterTitle>
                    {differentFilter && differentFilter.filterTitle}
                  </FilterTitle>
                  <SellerSearchBox>
                    <SellerSearch
                      name="셀러이름"
                      value={query.sellerName || ''}
                      onChange={(e) =>
                        setQuery({ ...query, sellerName: e.target.value })
                      }
                      type="text"
                      placeholder="검색어를 입력하세요."
                    ></SellerSearch>
                  </SellerSearchBox>
                </SelectFilterCategory>
              )}
              <SelectFilterCategory>
                <select
                  value={query.sellerDetail || ''}
                  onChange={(e) =>
                    setQuery({ ...query, sellerDetail: e.target.value })
                  }
                >
                  <option>Select</option>
                  <option value="product_name">상품명</option>
                  <option value="product_number">상품번호</option>
                  <option value="product_code">상품코드</option>
                </select>
                <SearchBox>
                  <ProductSearch
                    name="productDetail"
                    value={query.productDetail || ''}
                    onChange={(e) =>
                      setQuery({ ...query, productDetail: e.target.value })
                    }
                    placeholder="검색어를 입력하세요."
                    type="text"
                  ></ProductSearch>
                </SearchBox>
              </SelectFilterCategory>
            </FiltersCategoryTitle>
            {/* 각 필터별로 다른 name을 가지기 때문에 각각 렌더 */}
            {filters.filter_list &&
              filters.filter_list.map((cate, i) => {
                return (
                  <SelectFilterCategory cate={cate.category.length} key={i}>
                    <SelectFilterTitle>{cate.filterTitle} :</SelectFilterTitle>
                    <FilterBtnBox>
                      {cate.category.map((sub, idx) => {
                        return (
                          <SelectBtn
                            key={idx}
                            onClick={() =>
                              changeFilter(
                                sub.category_id,
                                idx,
                                cate.filterTitle,
                                cate.id
                              )
                            }
                            idx={idx}
                            filterStatus={filterStatus}
                            name={cate.filterTitle}
                          >
                            {sub.category_title}
                          </SelectBtn>
                        );
                      })}
                    </FilterBtnBox>
                  </SelectFilterCategory>
                );
              })}
            <SearchContainer>
              <SearchBtn onClick={handleSearch}>검색</SearchBtn>
              <CanclehBtn onClick={resetFilter}>초기화</CanclehBtn>
            </SearchContainer>
          </FilterContainer>
          <ProductDetail
            product={product}
            setProduct={setProduct}
            query={query}
            setQuery={setQuery}
            activePage={activePage}
            setActivePage={setActivePage}
            filters={filters}
            sendData={sendData}
            setShowModal={setShowModal}
            salesId={salesId}
            displayId={displayId}
          />
        </Section>
      </Main>
      <Footer />
    </Fragment>
  );
}

const Main = styled.div`
  display: flex;
  width: 100%;
`;

const Section = styled.div`
  width: 100%;
  padding: 20px 20px;
  margin-top: 45px;
  border-radius: 0 0 0 4px;
  background-color: #fafafa;

  h3 {
    font-size: 26px;
    margin-bottom: 15px;
    font-weight: 300;
    color: #666;
  }
`;

const FilterContainer = styled.div`
  width: 100%;
  border: 3px solid #eee;
  background-color: #fff;
  margin-bottom: 20px;
`;

const FilterCategoryTitle = styled.div`
  ${({ theme }) => theme.flex('', 'center')}
  margin-top: 10px;
  margin-bottom: 5px;
  padding-right: 15px;

  select {
    ${({ theme }) => theme.flex('', 'center')}
    width: 100px;
    height: 30px;
    margin-left: 15px;
    border: 1px solid #e5e5e5;
  }
`;

const FiltersCategoryTitle = styled(FilterCategoryTitle)`
  @media only screen and (max-width: 934px) {
    ${({ theme }) => theme.flex('', 'center', 'column')}
  }
`;

const SelectFilterCategory = styled(FilterCategoryTitle)`
  display: inline-flex;
  width: ${({ cate }) => (cate > 5 ? '100%' : '50%')};

  @media only screen and (max-width: 940px) {
    width: 100%;
  }
`;

const FilterTitle = styled.div`
  ${({ theme }) => theme.flex('', 'center')}
  width: 100px;
  height: 25px;
  padding-left: 15px;
  color: #222222;
  text-overflow: hidden;
  white-space: nowrap;
`;

const SelectFilterTitle = styled(FilterTitle)`
  display: inline-flex;
`;

const InquiryperiodBox = styled.div`
  display: table;
  border: 1px solid #e5e5e5;
  width: 25%;
  margin: 0 15px;

  @media only screen and (max-width: 934px) {
    width: 100%;
  }

  span {
    display: table-cell;
    padding: 6px 12px;
    background: #e5e5e5;
  }
`;

const PeriodBox = styled.input`
  width: 100%;
  display: table-cell;
  padding: 6px 12px;
  cursor: pointer;

  ::placeholder {
    text-align: center;
  }
`;

const SelectPeriod = styled(DatePicker)`
  text-align: center;
  cursor: pointer;
`;

const SearchBox = styled(InquiryperiodBox)`
  width: 51%;
  margin: 0;

  @media only screen and (max-width: 934px) {
    width: 100%;
  }
`;

const SellerSearchBox = styled(InquiryperiodBox)`
  width: 51%;
  margin: 0 0 0 15px;

  @media only screen and (max-width: 934px) {
    width: 100%;
  }
`;

const SellerSearch = styled(PeriodBox)`
  width: 100%;
`;

const ProductSearch = styled(PeriodBox)`
  cursor: inherit;
`;

const FilterBtnBox = styled.div`
  margin: 0px 15px;
`;

const SelectBtn = styled.button`
  background-color: ${({ name, filterStatus, idx }) =>
    name &&
    filterStatus &&
    filterStatus.map((el) => !!el[name] && el[name][idx] && '#428bca')};

  &:hover {
    background-color: ${({ name, filterStatus, idx }) =>
      name &&
      filterStatus &&
      filterStatus.map((el) => !!el[name] && el[name][idx] && '#3071a9')};

    background-color: ${({ name, filterStatus, idx }) =>
      name &&
      filterStatus &&
      filterStatus.map((el) => !!el[name] && !el[name][idx] && '#e6e6e6')};
  }

  color: ${({ name, filterStatus, idx }) =>
    name &&
    filterStatus &&
    filterStatus.map((el) => !!el[name] && el[name][idx] && 'white')};

  margin-right: 3px;
  padding: 6px 12px;
  border: 1px solid #adadad;
  border-radius: 4px;
  cursor: pointer;
`;

const SearchContainer = styled(FilterCategoryTitle)`
  ${({ theme }) => theme.flex('center')}
`;

const CanclehBtn = styled.button`
  padding: 6px 50px;
  border: 1px solid #adadad;
  cursor: pointer;

  &:hover {
    background-color: #e6e6e6;
  }
`;

const SearchBtn = styled.button`
  padding: 6px 50px;
  border: 1px solid #adadad;
  margin-right: 4px;
  background-color: #428bca;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #3071a9;
  }
`;
