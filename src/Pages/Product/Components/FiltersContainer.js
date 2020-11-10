import React from 'react';
import regeneratorRuntime from 'regenerator-runtime';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import CallendarManage from '../../../Components/CallendarManage';
import SelectSearch from '../../../Components/SelectSearch';
import FilterBox from '../../../Components/FilterBox';
import SellerSearchFilter from '../../../Components/SellerSearchFilter';

export default function FiltersContainer({
  currentDate,
  handleStartDate,
  handleEndDate,
  differentFilter,
  filters,
  handleSellerName,
  sellerName,
  hadleSelectSearch,
  selectBox,
  handleSearch,
  resetFilter,
  btnFilter,
  handleBtnFilter,
}) {
  const sellerNameId = 'seller_name';
  const attributeId = 'attribute';
  const salesId = 'sale';
  const displayId = 'display';
  const discountId = 'discount';

  // store에 저장되어 있는 filter_list를 가져온다.
  const { is_master } = useSelector(({ userInfo }) => ({
    is_master: userInfo.is_master,
  }));

  return (
    <FilterContainer>
      <FilterCategoryTitle>
        <FilterTitle>조회 기간</FilterTitle>
        {/* 시작일, 마감일을 출력하는 date picker 컴포넌트*/}
        <CallendarManage
          currentDate={currentDate}
          handleStartDate={handleStartDate}
          handleEndDate={handleEndDate}
        />
      </FilterCategoryTitle>
      <FiltersCategoryTitle>
        {/* 마스터에만 있는 셀러명 필터 렌더 */}
        {is_master && (
          // 셀러명 필터를 출력하는 컴포넌트
          <SellerSearchFilter
            sellerName={sellerName}
            differentFilter={differentFilter}
            handleSellerName={handleSellerName}
          />
        )}
        <SelectFilterCategory>
          {/* 상품카테고리 선택 후 검색하는 컴포넌트 */}
          <SelectSearch
            selectBox={selectBox}
            hadleSelectSearch={hadleSelectSearch}
          />
        </SelectFilterCategory>
      </FiltersCategoryTitle>
      {/* 각 필터별로 다른 name을 가지기 때문에 각각 렌더 */}
      {filters.filter_list &&
        filters.filter_list.map((cate, i) => {
          return (
            <FilterBox
              key={i}
              cate={cate}
              i={i}
              handleBtnFilter={handleBtnFilter}
              btnFilter={btnFilter}
            />
          );
        })}
      <SearchContainer>
        <SearchBtn onClick={handleSearch}>검색</SearchBtn>
        <CanclehBtn onClick={resetFilter}>초기화</CanclehBtn>
      </SearchContainer>
    </FilterContainer>
  );
}

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
