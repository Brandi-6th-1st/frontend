import React, { Fragment, useState, useEffect } from 'react';
import styled from 'styled-components';
import Nav from '../../Components/Nav/Nav';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';

export default function ProductManagement() {
  return (
    <Fragment>
      <Header />
      <Main>
        {/* <Nav /> */}
        <Section>
          <h3>상품 관리</h3>
          <FilterContainer>
            <FilterCategoryTitle>
              <FilterTitle>조회 기간</FilterTitle>
              <InquiryperiodBox>
                <StartPeriod placeholder="클릭해주세요."></StartPeriod>
                <span>~</span>
                <EndPeriod placeholder="클릭해주세요."></EndPeriod>
              </InquiryperiodBox>
            </FilterCategoryTitle>
            <FilterCategoryTitle>
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
            <FilterCategoryTitle>
              <FilterTitle>판매여부</FilterTitle>
              <FilterBtnBox>
                <SelectBtn>전체</SelectBtn>
                <SelectBtn>판매</SelectBtn>
                <SelectBtn>미판매</SelectBtn>
                <SelectBtn>미판매(직권)</SelectBtn>
              </FilterBtnBox>
              <FilterTitle>진열여부</FilterTitle>
              <FilterBtnBox>
                <SelectBtn>전체</SelectBtn>
                <SelectBtn>판매</SelectBtn>
                <SelectBtn>미판매</SelectBtn>
                <SelectBtn>미판매(직권)</SelectBtn>
              </FilterBtnBox>
            </FilterCategoryTitle>
            <FilterCategoryTitle>
              <FilterTitle>할인여부</FilterTitle>
              <FilterBtnBox>
                <SelectBtn>전체</SelectBtn>
                <SelectBtn>할인</SelectBtn>
                <SelectBtn>미할인</SelectBtn>
              </FilterBtnBox>
            </FilterCategoryTitle>
            <SearchContainer>
              <SearchBtn>검색</SearchBtn>
              <CanclehBtn>취소</CanclehBtn>
            </SearchContainer>
          </FilterContainer>
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
`;

const FilterCategoryTitle = styled.div`
  ${({ theme }) => theme.flex('', 'center', '')}
  margin-top: 10px;
  margin-bottom: 15px;
  padding-right: 15px;

  select {
    ${({ theme }) => theme.flex('', 'center', '')}
    width: 100px;
    height: 30px;
    margin-left: 15px;
    border: 1px solid #e5e5e5;
  }
`;

const FilterTitle = styled.div`
  ${({ theme }) => theme.flex('', 'center', '')}
  width: 100px;
  height: 25px;
  padding-left: 15px;
  color: #222222;
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

const StartPeriod = styled.input`
  width: 100%;
  display: table-cell;
  padding: 6px 12px;
  cursor: pointer;

  ::placeholder {
    text-align: center;
  }
`;

const EndPeriod = styled(StartPeriod)``;

const SearchBox = styled(InquiryperiodBox)`
  margin: 0;
`;

const ProductSearch = styled(StartPeriod)``;

const FilterBtnBox = styled.div`
  width: 33.33333333%;
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
    /* opacity: 0.6; */
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
