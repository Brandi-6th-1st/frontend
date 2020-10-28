import React, { Fragment, useState, useEffect } from 'react';
import regeneratorRuntime from 'regenerator-runtime';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

import {
  isMaster,
  isSeller,
  isUnknown,
  isToken,
} from '../../Store/Reducer/userInfo';
import { ko } from 'date-fns/esm/locale';
import { getAttribute, clearAttribute } from '../../Store/Reducer/commonStatus';
import DatePicker from 'react-datepicker';
import '../../Styles/datepick.css';
import styled from 'styled-components';
import ProductDetail from './Components/ProductDetail';
import Nav from '../../Components/Nav/Nav';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';

export default function ProductManagement() {
  const dispatch = useDispatch();
  // 마스터에만 사용되는 데이터를 관리
  const [differentFilter, setDifferentFilter] = useState();
  // 공통으로 사용되는 데이터를 관리
  const [product, setProduct] = useState();
  // 각 필터의 상태를 선택된 상태를 배열로 관리
  const [filterStatus, setFilterStatus] = useState();
  // 상품의 판매, 진열 상태 변경하기 위한 상태
  const [changeProductStatus, setChangeProductStatus] = useState({
    salesStatus: '',
    displayStatus: '',
  });
  // axios할 쿼리url 생성
  // const [queryUrl, setQueryUrl] = useState('');
  // 쿼리스트링을 만들 상태를 따로 관리
  const [query, setQuery] = useState({
    startDate: null,
    endDate: null,
    sellerName: '',
    sellerDetail: '',
    productDetail: '',
    sellerAttribute: [],
    salesStatus: null,
    displayStatus: null,
    discountStatus: null,
    limit: 10,
    pages: 1,
    offset: 0,
  });

  // store에서 유저타입과 토큰을 가져온다.
  const { userType, token } = useSelector(({ userInfo }) => ({
    userType: userInfo.userType,
    token: userInfo.token,
  }));

  // store에서 셀러속성을 사용하기 위하여
  const { category } = useSelector(({ commonStatus }) => ({
    category: commonStatus.category,
  }));

  // get을 통하여 들어오는 필터의 상태별로 각 버튼의 boolean 생성
  const createFilter = (data) => {
    const allFilter =
      data &&
      data.homeFilterTitle.map((el) => {
        return {
          [el.filterTitle]: new Array(el.category && el.category.length)
            .fill()
            .map((_, index) => (index === 0 ? true : false)),
          selectedId: '',
        };
      });
    setFilterStatus(allFilter);
  };

  // const fetchFiltred = async (queryObj) => {
  //   try {
  //     const result = await axios.get(`url/product`, {
  //       params: queryObj,
  //       timeout: 3000, //3초
  //     });
  //     const response = await response.data;
  //     console.log(response);
  //   } catch (err) {}
  // };

  // Test : json형식 mock-data 생성
  // axios get을 사용하여 데이터를 받아온다.
  const getData = async () => {
    try {
      const result = await axios.get(`/public/Data/DataProductManage.json`, {
        timeout: 3000,
      });
      // 받아온 데이터를 비구조 할당하여 data에 저장한다.
      const { DataProductManage } = result.data;

      const attribute = DataProductManage.homeFilterTitle.filter((title) => {
        return title.id === 2 && title;
      })[0];

      if (!!attribute && !category) {
        dispatch(getAttribute(attribute));
      }

      // 유저 타입이 마스터인 경우,
      if (DataProductManage.isMaster) {
        // 전역에서 관리하는 상태에 유저 타입을 마스터로 변경
        dispatch(isMaster());

        // 백엔드에서 전체 데이터를 받지 않고 셀러명만 특정위치에 들어가야 함으로 필터로 데이터 분리
        const masterData =
          DataProductManage &&
          DataProductManage.homeFilterTitle.filter((el) => el.id === 1)[0];

        // 특정 위치에 꼭 들어가지 않아도 되는 필터 저장
        const sellerData = {
          ...DataProductManage,
          homeFilterTitle: DataProductManage.homeFilterTitle.filter(
            (el) => el.id !== 1
          ),
        };

        // 마스터에서만 사용하는 데이터 저장
        setDifferentFilter(masterData);
        // 마스터와 셀러 공용 필터를 따로 저장
        setProduct(sellerData);
        //각 필터별로 상태를 생성
        createFilter(sellerData);
      }
      // 유저 타입이 셀러인 경우,
      if (!DataProductManage.isMaster) {
        dispatch(isSeller());
        // 마스터와 셀러 공용 필터를 따로 저장
        setProduct(DataProductManage);
        //각 필터별로 상태를 생성
        createFilter(DataProductManage);
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
    getData();
  }, []);

  // 각 필터 선택시 true <-> false로 바꿔준다.
  const changeFilter = (id, idx, name, filterId) => {
    // 단일선택하는 필터인 경우
    if (filterId !== 2) {
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
    if (filterId === 2) {
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
    // 셀러속성의 현재 버튼이 눌린 상태
    const attribute =
      filterStatus.filter((el) => {
        return !!el['셀러속성'] && el.selectedId;
      })[0] &&
      filterStatus
        .filter((el) => {
          return !!el['셀러속성'] && el.selectedId;
        })[0]
        .selectedId.reduce((acc, item) => {
          return acc + ',' + item;
        });

    // 판매여부의 현재 버튼이 눌린 상태
    const salse =
      filterStatus.filter((el) => {
        return el.id === 3 && el.selectedId;
      })[0] &&
      filterStatus.filter((el) => {
        return el.id === 3 && el.selectedId;
      })[0].selectedId;

    // 진열여부의 현재 버튼이 눌린 상태
    const display =
      filterStatus.filter((el) => {
        return el.id === 4 && el.selectedId;
      })[0] &&
      filterStatus.filter((el) => {
        return el.id === 4 && el.selectedId;
      })[0].selectedId;

    // 할인여부의 현재 버튼이 눌린 상태
    const discount =
      filterStatus.filter((el) => {
        return el.id === 5 && el.selectedId;
      })[0] &&
      filterStatus.filter((el) => {
        return el.id === 5 && el.selectedId;
      })[0].selectedId;

    // 백엔드와 데이터를 맞출때 보내질 데이터 형식으로 변경
    const dateFormatChange = (date) => {
      if (!!date) {
        var year = date.getFullYear(); //YYYY
        var month = 1 + date.getMonth(); //MM
        month = month >= 10 ? month : '0' + month; //MM 두자리로 저장
        var day = date.getDate(); //D
        day = day >= 10 ? day : '0' + day; //DD
        return `${year}-${month}-${day}`;
      }
    };

    const queryObj = {
      ...query,
      //     startDate: dateFormatChange(query.startDate),
      //     endDate: dateFormatChange(query.endDate),
      sellerAttribute: attribute,
      salesStatus: salse,
      displayStatus: display,
      discountStatus: discount,
    };

    // 쿼리 내용 최신화
    setQuery(queryObj);

    // 상태로 관리하던 key, value 값을 쿼리스트링으로 변경
    // const url =
    //   '?' +
    //   Object.entries({
    //     ...query,
    //     startDate: dateFormatChange(query.startDate),
    //     endDate: dateFormatChange(query.endDate),
    //     sellerAttribute: attribute,
    //     salesStatus: salse,
    //     displayStatus: display,
    //     discountStatus: discount,
    //   })
    //     .flatMap((el) => !!el[1] && el[0] + '=' + el[1])
    //     .filter((el) => !!el)
    //     .join('&');

    // // 쿼리스트링으로 보낼 url을 상태로 관리
    // setQueryUrl(url);
    console.log('전송');
  };
  console.log(query);

  const resetFilter = () => {
    createFilter(product);
    setQuery({
      startDate: null,
      endDate: null,
      sellerName: '',
      sellerDetail: '',
      productDetail: '',
      sellerAttribute: [],
      salesStatus: null,
      displayStatus: null,
      discountStatus: null,
      limit: query.limit,
      pages: query.pages,
      offset: query.limit * query.pages,
    });
  };

  return (
    <Fragment>
      <Header />
      <Main>
        <Nav />
        <Section>
          <h3>상품 관리</h3>
          <FilterContainer>
            <FilterCategoryTitle>
              <FilterTitle>조회 기간</FilterTitle>
              {/* 조회 가긴의 캘린더 렌더 */}
              <InquiryperiodBox>
                <SelectPeriod
                  selected={query.startDate}
                  locale={ko}
                  dateFormat="yyyy-MM-dd"
                  onChange={(date) =>
                    setQuery({
                      ...query,
                      startDate: date,
                    })
                  }
                  placeholderText="클릭해주세요."
                  shouldCloseOnSelect={false}
                />
                <span>~</span>
                <SelectPeriod
                  selected={query.endDate}
                  locale={ko}
                  dateFormat="yyyy-MM-dd"
                  onChange={(date) =>
                    setQuery({
                      ...query,
                      endDate: date,
                    })
                  }
                  placeholderText="클릭해주세요."
                  shouldCloseOnSelect={false}
                />
              </InquiryperiodBox>
            </FilterCategoryTitle>
            <FiltersCategoryTitle>
              {/* 마스터에만 있는 셀러명 필터 렌더 */}
              {differentFilter && differentFilter.id === 1 && (
                <SelectFilterCategory>
                  <FilterTitle>
                    {differentFilter && differentFilter.filterTitle}
                  </FilterTitle>
                  <SellerSearchBox>
                    <SellerSearch
                      name="셀러이름"
                      value={query.sellerName}
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
                  value={query.sellerDetail}
                  onChange={(e) =>
                    setQuery({ ...query, sellerDetail: e.target.value })
                  }
                >
                  <option>Select</option>
                  <option>상품명</option>
                  <option>상품번호</option>
                  <option>상품코드</option>
                </select>
                <SearchBox>
                  <ProductSearch
                    name="productDetail"
                    value={query.productDetail}
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
            {product &&
              product.homeFilterTitle.map((cate, i) => {
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
              <SearchBtn onClick={sendData}>검색</SearchBtn>
              <CanclehBtn onClick={resetFilter}>초기화</CanclehBtn>
            </SearchContainer>
          </FilterContainer>
          <ProductDetail
            product={product}
            setQuery={setQuery}
            query={query}
            changeProductStatus={changeProductStatus}
            setChangeProductStatus={setChangeProductStatus}
            // setSalesStatus={setSalesStatus}
            // salesStatus={salesStatus}
            // setDisplayStatus={setDisplayStatus}
            // displayStatus={displayStatus}
            sendData={sendData}
          />
        </Section>
      </Main>
      <Footer />
    </Fragment>
  );
}

const Main = styled.div`
  display: flex;
`;

const Section = styled.div`
  width: 100%;
  padding: 20px 20px;
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
  @media only screen and (max-width: 833px) {
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

  @media only screen and (max-width: 833px) {
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

  @media only screen and (max-width: 833px) {
    width: 100%;
  }
`;

const SellerSearchBox = styled(InquiryperiodBox)`
  width: 51%;
  margin: 0 0 0 15px;

  @media only screen and (max-width: 833px) {
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
