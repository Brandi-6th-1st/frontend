import React, { Fragment, useState, useEffect } from 'react';
import regeneratorRuntime from 'regenerator-runtime';
import axios from 'axios';
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
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [differentFilter, setDifferentFilter] = useState();
  const [product, setProduct] = useState();
  const [filterAtribute, setFilterAtribute] = useState(1);
  const [filterSales, setFilterSales] = useState();
  const [filterDisplay, setFilterDisplay] = useState();
  const [filterDiscount, setFilterDiscount] = useState();
  const [limit, setLimit] = useState(10);

  //각 필터의 카테고리의 길이만큼 배열의 길이 생성
  const createFilter = (data) => {
    // 각 필터에 들어가는 카테고리 개수만큼 배열의 기링를 만들기 위한 함수
    const filterLength = (data) => {
      return new Array(data[0] && data[0].category.length)
        .fill()
        .map((_, index) => (index === 0 ? true : false));
    };
    // 셀러속성의 카테고리 데이터 분리
    const AtributeData = data.homeFilterTitle.filter(
      (el) => el.filterTitle === '셀러속성'
    );

    const SalesData = data.homeFilterTitle.filter(
      (el) => el.filterTitle === '판매여부'
    );

    const DisplayedData = data.homeFilterTitle.filter(
      (el) => el.filterTitle === '진열여부'
    );

    const DiscountData = data.homeFilterTitle.filter(
      (el) => el.filterTitle === '할인여부'
    );

    // 각 배열의 길이만큼 각 상태의 불리언 값으로 생성해준다.
    setFilterAtribute(filterLength(AtributeData));
    setFilterSales(filterLength(SalesData));
    setFilterDisplay(filterLength(DisplayedData));
    setFilterDiscount(filterLength(DiscountData));
  };

  // Test : json형식 mock-data 생성
  // axios get을 사용하여 데이터를 받아온다.
  const getData = async () => {
    try {
      const result = await axios.get(`/public/Data/DataProductManage.json`);
      // 받아온 데이터를 비구조 할당하여 data에 저장한다.
      const { DataProductManage } = result.data;
      //마스터에만 있는 셀러명 검색 필터가 확인하는 filter
      const sellerName =
        DataProductManage &&
        DataProductManage.homeFilterTitle.filter(
          (el) => el.filterTitle === '셀러명'
        )[0];

      // 해당 필터의 세부 카테고리 별로 boolean 생성
      if (DataProductManage && sellerName) {
        // 마스터에서만 사용하는 셀러명 검색 필터가 있다면
        // DifferentFilter 상태르 만들어 따로 관리
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
        createFilter(DataProductManage);
      } else {
        //마스터에서만 사용하는 셀러명 필터가 없다면 전체를 상태로 관리
        setProduct(DataProductManage);
        console.log(product);
        createFilter(DataProductManage);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // 각 카테고리가 선택되었을때 상태를 변경해준다.
  const selectAtribute = (idx) => {
    setFilterAtribute(
      filterAtribute.map((el, index) => {
        return index === idx ? true : false;
      })
    );
  };

  const selectSales = (idx) => {
    setFilterSales(
      filterSales.map((el, index) => {
        return index === idx ? true : false;
      })
    );
  };

  const selectdDisplay = (idx) => {
    setFilterDisplay(
      filterDisplay.map((el, index) => {
        return index === idx ? true : false;
      })
    );
  };

  const selectDiscount = (idx) => {
    setFilterDiscount(
      filterDiscount.map((el, index) => {
        return index === idx ? true : false;
      })
    );
  };
  // 페이지 마운트시 axios하여 상품관리 페이지에 필요한 데이터를 get
  useEffect(() => {
    getData();
  }, []);

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
              <InquiryperiodBox>
                <SelectPeriod
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  dateFormat="yyyy-MM-dd"
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
            {product &&
              product.homeFilterTitle.map((cate) => {
                return (
                  <SelectFilterCategory cate={cate.category.length}>
                    <SelectFilterTitle>{cate.filterTitle} :</SelectFilterTitle>
                    <FilterBtnBox>
                      {cate.filterTitle === '셀러속성' &&
                        cate.category.map((cate, idx) => {
                          return (
                            <SelectBtn
                              onClick={() => selectAtribute(idx)}
                              idx={idx}
                              filterAtribute={filterAtribute}
                              name="셀러속성"
                            >
                              {cate}
                            </SelectBtn>
                          );
                        })}
                      {cate.filterTitle === '판매여부' &&
                        cate.category.map((cate, idx) => {
                          return (
                            <SelectBtn
                              onClick={() => selectSales(idx)}
                              idx={idx}
                              filterSales={filterSales}
                              name="판매여부"
                            >
                              {cate}
                            </SelectBtn>
                          );
                        })}
                      {cate.filterTitle === '진열여부' &&
                        cate.category.map((cate, idx) => {
                          return (
                            <SelectBtn
                              onClick={() => selectdDisplay(idx)}
                              idx={idx}
                              filterDisplay={filterDisplay}
                              name="진열여부"
                            >
                              {cate}
                            </SelectBtn>
                          );
                        })}
                      {cate.filterTitle === '할인여부' &&
                        cate.category.map((cate, idx) => {
                          return (
                            <SelectBtn
                              onClick={() => selectDiscount(idx)}
                              idx={idx}
                              filterDiscount={filterDiscount}
                              name="할인여부"
                            >
                              {cate}
                            </SelectBtn>
                          );
                        })}
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
  width: 67%;
  margin: 0;
`;

const SellerSearchBox = styled(InquiryperiodBox)`
  width: 67%;
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
  background-color: ${({ name, filterAtribute, idx }) =>
    name === '셀러속성' && filterAtribute && filterAtribute[idx] && '#428bca'};
  color: ${({ name, filterAtribute, idx }) =>
    name === '셀러속성' && filterAtribute && filterAtribute[idx] && 'white'};

  background-color: ${({ name, filterSales, idx }) =>
    name === '판매여부' && filterSales && filterSales[idx] && '#428bca'};
  color: ${({ name, filterSales, idx }) =>
    name === '판매여부' && filterSales && filterSales[idx] && 'white'};

  background-color: ${({ name, filterDisplay, idx }) =>
    name === '진열여부' && filterDisplay && filterDisplay[idx] && '#428bca'};
  color: ${({ name, filterDisplay, idx }) =>
    name === '진열여부' && filterDisplay && filterDisplay[idx] && 'white'};

  background-color: ${({ name, filterDiscount, idx }) =>
    name === '할인여부' && filterDiscount && filterDiscount[idx] && '#428bca'};
  color: ${({ name, filterDiscount, idx }) =>
    name === '할인여부' && filterDiscount && filterDiscount[idx] && 'white'};

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
