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
import styled from 'styled-components';
import ProductDetail from './Components/ProductDetail';
import Nav from '../../Components/Nav/Nav';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import DatePicker from 'react-datepicker';
import '../../Styles/datepick.css';
import {
  GoListUnordered,
  GoChevronRight,
  GoFile,
  GoCheck,
} from 'react-icons/go';

export default function ProductManagement() {
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [differentFilter, setDifferentFilter] = useState();
  const [product, setProduct] = useState();
  const [filterAtribute, setFilterAtribute] = useState(1);
  const [filterSales, setFilterSales] = useState();
  const [filterDisplay, setFilterDisplay] = useState();
  const [filterDiscount, setFilterDiscount] = useState();
  const [limit, setLimit] = useState(10);

  const [filterStatus, setFilterStatus] = useState();

  const { userType, token } = useSelector(({ userInfo }) => ({
    userType: userInfo.userType,
    token: userInfo.token,
  }));

  //각 필터의 카테고리의 길이만큼 배열의 길이 생성
  const createFilter = (data) => {
    const allFilter =
      data &&
      data.homeFilterTitle.map((el) => {
        console.log(el.category && el.category.length);
        return {
          [el.filterTitle]: new Array(el.category && el.category.length)
            .fill()
            .map((_, index) => (index === 0 ? true : false)),
          selectedId: [''],
        };
      });

    setFilterStatus(allFilter);
    console.log(allFilter);
    console.log(filterStatus);
    // 각 필터에 들어가는 카테고리 개수만큼 배열의 길이를 만들기 위한 함수
    // const filterLength = (data) => {
    //   return new Array(data[0] && data[0].category.length)
    //     .fill()
    //     .map((_, index) => (index === 0 ? true : false));
    // };
    // // 각 필터의 세부 카테고리 분리
    // const AtributeData = data.homeFilterTitle.filter(
    //   (el) => el.filterTitle === '셀러속성'
    // );

    // const SalesData = data.homeFilterTitle.filter(
    //   (el) => el.filterTitle === '판매여부'
    // );

    // const DisplayedData = data.homeFilterTitle.filter(
    //   (el) => el.filterTitle === '진열여부'
    // );

    // const DiscountData = data.homeFilterTitle.filter(
    //   (el) => el.filterTitle === '할인여부'
    // );

    // // 각 배열의 길이만큼 각 상태의 불리언 값으로 생성해준다.
    // setFilterAtribute({
    //   isSelected: filterLength(AtributeData),
    //   selectedId: [''],
    // });

    // setFilterSales({
    //   isSelected: filterLength(SalesData),
    //   selectedId: [''],
    // });

    // setFilterDisplay({
    //   isSelected: filterLength(DisplayedData),
    //   selectedId: [''],
    // });

    // setFilterDiscount({
    //   isSelected: filterLength(DiscountData),
    //   selectedId: [''],
    // });
  };

  // Test : json형식 mock-data 생성
  // axios get을 사용하여 데이터를 받아온다.
  const getData = async () => {
    try {
      const result = await axios.get(`/public/Data/DataProductManage.json`);
      // 받아온 데이터를 비구조 할당하여 data에 저장한다.
      const { DataProductManage } = result.data;

      // 유저 타입이 마스터인 경우,
      if (DataProductManage.isMaster) {
        dispatch(isMaster());

        const sellerName =
          DataProductManage &&
          DataProductManage.homeFilterTitle.filter(
            (el) => el.filterTitle === '셀러명'
          )[0];

        setDifferentFilter(sellerName);

        // 필터 종류 배열에서 셀러명 필터만 제거하고
        const sellerData = {
          ...DataProductManage,
          homeFilterTitle: DataProductManage.homeFilterTitle.filter(
            (el) => el.filterTitle !== '셀러명'
          ),
        };

        // 제거한 필터를 product 상태로 관리
        setProduct(sellerData);
        //각 필터별로 상태를 생성
        createFilter(sellerData);
      }
      // 유저 타입이 셀러인 경우,
      if (!DataProductManage.isMaster) {
        dispatch(isSeller());
        console.log(DataProductManage);
        setProduct(DataProductManage);
        createFilter(DataProductManage);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // 페이지 마운트시 axios하여 상품관리 페이지에 필요한 데이터를 get
  useEffect(() => {
    getData();
  }, []);

  const changeFilter = (id, idx, name) => {
    if (name !== '셀러속성') {
      setFilterStatus(
        filterStatus.map((el) =>
          !!el[name]
            ? {
                ...el,
                [name]: el[name].map((item, index) => {
                  return index === idx ? true : false;
                }),
                selectedId: id,
              }
            : el
        )
      );
      console.log('!@!#!@#', filterStatus);
    } else {
      const filterLength = (atribute) => {
        return new Array(atribute && atribute.length)
          .fill()
          .map((_, index) => (index === 0 ? true : false));
      };

      const selectedElement = filterStatus.map(
        (el) => !!el[name] && el[name]
      )[0];
      console.log(selectedElement);

      const allSelectBtn = selectedElement[0];

      const allSelected = selectedElement.slice(1).every((item) => {
        return item;
      });

      const allNotSelected = selectedElement.slice(1).every((item) => {
        return !item;
      });
    }
  };
  // 각 카테고리가 선택되었을때 상태를 변경해준다.
  const selectAtribute = (id, idx) => {
    const AtributeData = product.homeFilterTitle.filter(
      (el) => el.filterTitle === '셀러속성'
    );

    const filterLength = (data) => {
      return new Array(data[0] && data[0].category.length)
        .fill()
        .map((_, index) => (index === 0 ? true : false));
    };

    const selectElement = { ...filterAtribute };
    selectElement.isSelected[0] = false;
    selectElement.isSelected[idx] = !selectElement.isSelected[idx];
    // selectElement.selectedId.filter((el) => el !== id);

    // 전체 버튼이 눌렸을 때,
    const allSelectBtn = selectElement.isSelected[0];

    // 전체 선택 되었을 때,
    const allSelected = selectElement.isSelected.slice(1).every((item) => {
      return item;
    });

    // 하나도 선택되지 않았을 때,
    const allNotSelected = selectElement.isSelected.slice(1).every((item) => {
      return !item;
    });

    // 전체버튼으로 가지는 로직
    const selectAll = allSelectBtn || allSelected || allNotSelected;

    // 각 필터별로 세부 카테고리가 선택되었을 때,
    setFilterAtribute({
      isSelected:
        // 전체 선택되거나 하나도 선택되지 않았을때 초기값으로 변경
        selectAll ? filterLength(AtributeData) : selectElement.isSelected,
      selectedId: selectAll ? '' : [...filterAtribute.selectedId].concat([id]),
    });
  };

  // const selectSales = (id, idx) => {
  //   setFilterSales({
  //     isSelected: filterSales.isSelected.map((el, index) => {
  //       return index === idx ? true : false;
  //     }),
  //     selectedId: [id],
  //   });
  // };

  // const selectdDisplay = (id, idx) => {
  //   setFilterDisplay({
  //     isSelected: filterDisplay.isSelected.map((el, index) => {
  //       return index === idx ? true : false;
  //     }),
  //     selectedId: [id],
  //   });
  // };

  // const selectDiscount = (id, idx) => {
  //   setFilterDiscount({
  //     isSelected: filterDiscount.isSelected.map((el, index) => {
  //       return index === idx ? true : false;
  //     }),
  //     selectedId: [id],
  //   });
  // };

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
                  selected={startDate}
                  dateFormat="yyyy-MM-dd"
                  onChange={(date) => setStartDate(date)}
                  placeholderText="클릭해주세요."
                  shouldCloseOnSelect={false}
                />
                <span>~</span>
                <SelectPeriod
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  dateFormat="yyyy-MM-dd"
                  placeholderText="클릭해주세요."
                  shouldCloseOnSelect={false}
                />
              </InquiryperiodBox>
            </FilterCategoryTitle>
            <FilterCategoryTitle>
              {/* 마스터에만 있는 셀러명 필터 렌더 */}
              {differentFilter && differentFilter.filterTitle === '셀러명' && (
                <SelectFilterCategory>
                  <FilterTitle>
                    {differentFilter && differentFilter.filterTitle}
                  </FilterTitle>
                  <SellerSearchBox>
                    <SellerSearch placeholder="검색어를 입력하세요."></SellerSearch>
                  </SellerSearchBox>
                </SelectFilterCategory>
              )}
              <SelectFilterCategory>
                <select>
                  <option>Select</option>
                  <option>상품명</option>
                  <option>상품번호</option>
                  <option>상품코드</option>
                </select>
                <SearchBox>
                  <ProductSearch placeholder="검색어를 입력하세요."></ProductSearch>
                </SearchBox>
              </SelectFilterCategory>
            </FilterCategoryTitle>
            {/* 각 필터별로 다른 name을 가지기 때문에 각각 렌더 */}
            {product &&
              product.homeFilterTitle.map((cate) => {
                return (
                  <SelectFilterCategory cate={cate.category.length}>
                    <SelectFilterTitle>{cate.filterTitle} :</SelectFilterTitle>
                    <FilterBtnBox>
                      {/* {cate.filterTitle === '셀러속성' &&
                        cate.category.map((sub, idx) => {
                          return (
                            <SelectBtn
                              onClick={() =>
                                // selectAtribute(sub.category_id, idx)
                                changeFilter(
                                  sub.category_id,
                                  idx,
                                  cate.filterTitle
                                )
                              }
                              idx={idx}
                              name={cate.filterTitle}
                              filterAtribute={filterAtribute}
                            >
                              {sub.category_title}
                            </SelectBtn>
                          );
                        })} */}

                      {cate.category.map((sub, idx) => {
                        return (
                          <SelectBtn
                            onClick={() =>
                              changeFilter(
                                sub.category_id,
                                idx,
                                cate.filterTitle
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
                      {/* {cate.filterTitle === '판매여부' &&
                        cate.category.map((sub, idx) => {
                          return (
                            <SelectBtn
                              onClick={() => selectSales(sub.category_id, idx)}
                              idx={idx}
                              filterSales={filterSales}
                              name={cate.filterTitle}
                            >
                              {sub.category_title}
                            </SelectBtn>
                          );
                        })}
                      {cate.filterTitle === '진열여부' &&
                        cate.category.map((sub, idx) => {
                          return (
                            <SelectBtn
                              onClick={() =>
                                selectdDisplay(sub.category_id, idx)
                              }
                              idx={idx}
                              filterDisplay={filterDisplay}
                              name={cate.filterTitle}
                            >
                              {sub.category_title}
                            </SelectBtn>
                          );
                        })}
                      {cate.filterTitle === '할인여부' &&
                        cate.category.map((sub, idx) => {
                          return (
                            <SelectBtn
                              onClick={() =>
                                selectDiscount(sub.category_id, idx)
                              }
                              idx={idx}
                              filterDiscount={filterDiscount}
                              name={cate.filterTitle}
                            >
                              {sub.category_title}
                            </SelectBtn>
                          );
                        })}
                     */}
                    </FilterBtnBox>
                  </SelectFilterCategory>
                );
              })}
            <SearchContainer>
              <SearchBtn>검색</SearchBtn>
              <CanclehBtn>초기화</CanclehBtn>
            </SearchContainer>
          </FilterContainer>
          <TitleContainer>
            <RootTitle>
              <li>
                <GoListUnordered />
              </li>
              <li>
                상품관리 / 상품 관리 <GoChevronRight />
              </li>
              <li>
                상품관리 관리 <GoChevronRight />
              </li>
              <li> 리스트</li>
            </RootTitle>
            {/* limit 추가 예정 */}
            <LimitRange>
              <select>
                <option>10개씩 보기</option>
                <option>20개씩 보기</option>
                <option>50개씩 보기</option>
              </select>
            </LimitRange>
          </TitleContainer>
          <ChangeContainer>
            <PrintExcelBtn>
              <GoFile />
              선택상품 엑셀다운로드
            </PrintExcelBtn>
            <PrintExcelBtn>
              <GoFile />
              전체상품 엑셀다운로드
            </PrintExcelBtn>
            <select>
              <option>판매여부</option>
              <option>판매</option>
              <option>미판매</option>
            </select>
            <select>
              <option>진열여부</option>
              <option>진열</option>
              <option>미진열</option>
            </select>
            <ApplyBtn>
              <GoCheck />
              적용
            </ApplyBtn>
          </ChangeContainer>
          <ProductDetail product={product} />
        </Section>
      </Main>
      {/* <Footer /> */}
    </Fragment>
  );
}

const Main = styled.div`
  display: flex;
`;

const Section = styled.div`
  width: 100%;
  padding: 20px 20px;
  /* nav상태에 따라 마진 크기 변동 예정 */
  /* margin-left: 215px; */
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

const SelectFilterCategory = styled(FilterCategoryTitle)`
  display: inline-flex;
  width: ${({ cate }) => (cate > 5 ? '100%' : '50%')};
`;

const FilterTitle = styled.div`
  ${({ theme }) => theme.flex('', 'center')}
  width: 100px;
  height: 25px;
  padding-left: 15px;
  color: #222222;
`;

const SelectFilterTitle = styled(FilterTitle)`
  display: inline-flex;
`;

const InquiryperiodBox = styled.div`
  display: table;
  border: 1px solid #e5e5e5;
  width: 25%;
  margin: 0 15px;

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
`;

const SellerSearchBox = styled(InquiryperiodBox)`
  width: 51%;
  /* margin: 0 15px; */
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

const TitleContainer = styled.div`
  ${({ theme }) => theme.flex('space-between', 'center')}
  padding: 0 10px 0 20px;
  margin-bottom: 10px;
  background-color: #eeeeee;
`;

const RootTitle = styled.ul`
  display: flex;
  padding: 8px;

  svg {
    color: #9b9b9b;
    vertical-align: top;
  }

  li {
    font-size: 13px;
  }
`;

const LimitRange = styled.div`
  height: 100%;
  select {
    height: 100%;
    border-radius: 1px;
    height: 30px;
  }
`;

const ChangeContainer = styled.div`
  width: 100%;
  text-align: right;

  select {
    height: 30px;
    width: 9%;
    border: 1px solid #e5e5e5;
    margin-left: 5px;
  }
`;

const PrintExcelBtn = styled.button`
  height: 22px;
  margin-left: 3px;
  color: #fff;
  background-color: #5cb85c;
  border-color: #4cae4c;
  font-size: 12px;
  border-radius: 3px;
  padding: 1px 5px;
  cursor: pointer;

  svg {
    vertical-align: middle;
  }
`;

const ApplyBtn = styled.button`
  width: 5%;
  height: 30px;
  color: #fff;
  background-color: #f0ad4e;
  border-color: #eea236;
  margin-left: 5px;
  border-radius: 3px;
  cursor: pointer;

  svg {
    vertical-align: middle;
  }
`;
