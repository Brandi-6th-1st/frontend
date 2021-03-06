import React from 'react';
import styled from 'styled-components';

export default function SellerSearchFilter({ sellerName, handleSellerName }) {
  return (
    <SelectFilterCategory>
      <FilterTitle>셀러명</FilterTitle>
      <SellerSearchBox>
        <SellerSearch
          name="셀러명"
          value={sellerName || ''}
          onChange={(e) => handleSellerName(e)}
          type="text"
          placeholder="검색어를 입력하세요."
        ></SellerSearch>
      </SellerSearchBox>
    </SelectFilterCategory>
  );
}
const SelectFilterCategory = styled.div`
  display: inline-flex;
  width: ${({ cate }) => (cate > 5 ? '100%' : '50%')};
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

const SellerSearchBox = styled.div`
  display: table;
  border: 1px solid #e5e5e5;
  width: 51%;
  margin: 0 0 0 15px;

  @media only screen and (max-width: 934px) {
    width: 100%;
  }
`;

const SellerSearch = styled.input`
  display: table-cell;
  width: 100%;
  padding: 6px 12px;
  cursor: pointer;

  ::placeholder {
    text-align: center;
  }
`;
