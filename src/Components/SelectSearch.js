import React, { Fragment } from 'react';
import styled from 'styled-components';

export default function SelectSearch({ selectBox, hadleSelectSearch }) {
  return (
    <Fragment>
      <select
        name="select"
        value={selectBox.select || ''}
        onChange={(e) => hadleSelectSearch(e)}
      >
        <option>Select</option>
        <option value="product_name">상품명</option>
        <option value="product_id">상품번호</option>
        <option value="product_code">상품코드</option>
      </select>
      <SearchBox>
        <ProductSearch
          name="search"
          value={selectBox.search || ''}
          onChange={(e) => hadleSelectSearch(e)}
          placeholder="검색어를 입력하세요."
          type="text"
        ></ProductSearch>
      </SearchBox>
    </Fragment>
  );
}

const SearchBox = styled.div`
  display: table;
  border: 1px solid #e5e5e5;
  width: 51%;
  margin: 0;

  @media only screen and (max-width: 934px) {
    width: 100%;
  }
`;

const ProductSearch = styled.input`
  width: 100%;
  display: table-cell;
  padding: 6px 12px;
  cursor: inherit;

  ::placeholder {
    text-align: center;
  }
`;
