import React, { Fragment, useState, useEffect } from 'react';
import regeneratorRuntime from 'regenerator-runtime';
import axios from 'axios';
import styled from 'styled-components';
import Nav from '../../Components/Nav/Nav';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import DatePicker from 'react-datepicker';
import './datepick.css';
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

  // new Array(4).fill(true)

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
      // 마스터에서만 사용하는 셀러명 검색 필터가 있다면
      if (DataProductManage && sellerName) {
        // DifferentFilter 상태르 만들어 따로 관리
        setDifferentFilter(sellerName);
        // 필터 종류 배열에서 셀러명 필터만 제거하고
        const sellerData = {
          ...DataProductManage,
          homeFilterTitle: DataProductManage.homeFilterTitle.slice(1),
        };
        // 제거한 필터를 product 상태로 관리
        setProduct(sellerData);
        console.log(product && product);
      } else {
        //마스터에서만 사용하는 셀러명 필터가 없다면 전체를 상태로 관리
        setProduct(DataProductManage);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const filterSellerName =
    product &&
    product.homeFilterTitle.filter((el) => el.filterTitle === '셀러속성');
  // console.log(!!filterSellerName);

  // const [selectAtribute, setSelectAtribute] = useState([
  //   true,
  //   new Array(
  //     product &&
  //       product.homeFilterTitle.filterTitle === '셀러명' &&
  //       category.length
  //   ).fill(false),
  // ]);
  // console.log(selectAtribute);

  // 페이지 마운트시 fetch 하여 배송, 즐겨찾기, 차트 데이터 등을 받아온다.
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
                <Fragment>
                  <FilterTitle>
                    {differentFilter && differentFilter.filterTitle}
                  </FilterTitle>
                  <SellerSearchBox>
                    <SellerSearch placeholder="검색어를 입력하세요."></SellerSearch>
                  </SellerSearchBox>
                </Fragment>
              )}
              <select>
                <option>Select</option>
                <option>상품명</option>
                <option>상품번호</option>
                <option>상품코드</option>
              </select>
              <SearchBox>
                <ProductSearch placeholder="검색어를 입력하세요."></ProductSearch>
              </SearchBox>
            </FilterCategoryTitle>
            {product &&
              product.homeFilterTitle.map((cate) => {
                return (
                  <SelectFilterCategory cate={cate.category.length}>
                    <SelectFilterTitle>{cate.filterTitle} :</SelectFilterTitle>
                    <FilterBtnBox>
                      {cate.category.map((cate) => {
                        return <SelectBtn>{cate}</SelectBtn>;
                      })}
                    </FilterBtnBox>
                  </SelectFilterCategory>
                );
              })}
            {/* <SelectFilterCategory>
              <SelectFilterTitle>
                {product && product.homeFilterTitle[0].filterTitle} :
              </SelectFilterTitle>
              <FilterBtnBox>
                {product &&
                  product.homeFilterTitle[0].category.map((cate) => {
                    return <SelectBtn>{cate}</SelectBtn>;
                  })}
              </FilterBtnBox>
            </SelectFilterCategory>
            <SelectFilterCategory>
              <SelectFilterTitle>
                {product && product.homeFilterTitle[1].filterTitle} :
              </SelectFilterTitle>
              <FilterBtnBox>
                {product &&
                  product.homeFilterTitle[1].category.map((cate) => {
                    return <SelectBtn>{cate}</SelectBtn>;
                  })}
              </FilterBtnBox>
            </SelectFilterCategory>
            <SelectFilterCategory>
              <SelectFilterTitle>
                {product && product.homeFilterTitle[2].filterTitle} :
              </SelectFilterTitle>
              <FilterBtnBox>
                {product &&
                  product.homeFilterTitle[2].category.map((cate) => {
                    return <SelectBtn>{cate}</SelectBtn>;
                  })}
              </FilterBtnBox>
            </SelectFilterCategory>
            <SelectFilterCategory> */}
            {/* <SelectFilterTitle>
                {product && product.homeFilterTitle[3].filterTitle} :
              </SelectFilterTitle>
              <FilterBtnBox>
                {product &&
                  product.homeFilterTitle[3].category.map((cate) => {
                    return <SelectBtn>{cate}</SelectBtn>;
                  })}
              </FilterBtnBox>
            </SelectFilterCategory> */}
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
          <ProductContainer>
            <AllProductView>
              <span>
                전체 조회건 수 : <b> {product && product.productItem.length}</b>
                건
              </span>
            </AllProductView>
            <table>
              <ProductHead>
                <tr>
                  <ProductCategory twidth={'1%'}>
                    <input type="checkbox"></input>
                  </ProductCategory>
                  <ProductCategory twidth={'12%'}>등록일</ProductCategory>
                  <ProductCategory twidth={'9%'}>대표이미지</ProductCategory>
                  <ProductCategory twidth={'10%'}>상품명</ProductCategory>
                  <ProductCategory twidth={'10%'}>상품코드</ProductCategory>
                  <ProductCategory twidth={'7%'}>상품번호</ProductCategory>
                  <ProductCategory twidth={'7%'}>판매가</ProductCategory>
                  <ProductCategory twidth={'7%'}>할인가</ProductCategory>
                  <ProductCategory twidth={'8%'}>판매여부</ProductCategory>
                  <ProductCategory twidth={'7%'}>진열여부</ProductCategory>
                  <ProductCategory twidth={'7%'}>할인여부</ProductCategory>
                  <ProductCategory twidth={'5%'}>Actions</ProductCategory>
                </tr>
              </ProductHead>

              {product &&
                product.productItem.map((cate, idx) => {
                  return (
                    <ProductLine idx={idx}>
                      <ProductItem>
                        <input type="checkbox"></input>
                      </ProductItem>
                      <ProductItem>{cate.registered_at}</ProductItem>
                      <ProductItem>
                        <img
                          src={cate.main_image_url}
                          width="70px"
                          height="70px"
                        />
                      </ProductItem>
                      <ProductItem>{cate.product_name}</ProductItem>
                      <ProductItem>
                        <a href="">{cate.product_code}</a>
                      </ProductItem>
                      <ProductItem>{cate.product_number}</ProductItem>
                      <ProductItem>{cate.price}</ProductItem>
                      <ProductItem> {cate.discount_price}</ProductItem>
                      <ProductItem>{cate.is_on_sale}</ProductItem>
                      <ProductItem>{cate.is_displayed}</ProductItem>
                      <ProductItem>{cate.is_discounted}</ProductItem>
                      <ProductItem>
                        <BuyBtn>구매하기</BuyBtn>
                      </ProductItem>
                    </ProductLine>
                  );
                })}
            </table>
          </ProductContainer>
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
  margin-bottom: 15px;
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

// const SellerTitle = styled.div`
//   ${({ theme }) => theme.flex('', 'center')}
//   width: 100px;
//   height: 25px;
//   padding-left: 15px;
//   color: #222222;
// `;

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
  margin: 0;
`;

const SellerSearchBox = styled(InquiryperiodBox)`
  width: 33%;
  margin: 0 15px;
`;

const SellerSearch = styled(PeriodBox)`
  width: 100%;
`;

const ProductSearch = styled(PeriodBox)`
  cursor: inherit;
`;

const SellerAtribute = styled.div`
  width: 80%;
  margin: 0px 15px;
`;

const FilterBtnBox = styled.div`
  /* width: 33.33333333%; */
  margin: 0px 15px;
`;

const SelectBtn = styled.button`
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

const AllProductView = styled.div`
  margin-bottom: 3px;

  span {
    font-size: 13px;
  }
`;

const ProductContainer = styled.div`
  table {
    width: 100%;
  }
`;

const ProductHead = styled.thead`
  width: 100%;
`;

const ProductCategory = styled.th`
  width: ${(props) => props.twidth};
  background-color: #eee;
  padding: 9px;
  border: 1px solid #ddd;
  font-size: 14px;
  font-weight: 600;
  text-align: inherit;
`;

const ProductLine = styled.tr`
  background-color: ${({ idx }) => (idx % 2 === 0 ? '#f5f5f5' : '#fff')};
`;

const ProductItem = styled.th`
  padding: 9px;
  border: 1px solid #ddd;
  font-size: 13px;
  font-weight: 400;
  text-align: inherit;
  vertical-align: top;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  input {
    width: 14px;
  }

  a {
    color: #0d638f;

    :hover {
      text-decoration: revert;
    }
  }
`;

const BuyBtn = styled.button`
  background-color: #428bca;
  border-radius: 2px;
  font-size: 12px;
  padding: 3px 0px;
  color: white;
  width: 100%;
  cursor: pointer;
`;
