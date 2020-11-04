import React, { Fragment } from 'react';
import styled from 'styled-components';

export default function SelectSearch({ query, setQuery }) {
  return (
    <Fragment>
      <select
        value={query.sellerDetail || ''}
        onChange={(e) => setQuery({ ...query, sellerDetail: e.target.value })}
      >
        <option>Select</option>
        <option value="product_name">상품명</option>
        <option value="product_id">상품번호</option>
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
    </Fragment>
  );
}

const SearchBox = styled.div`
  display: table;
  border: 1px solid #e5e5e5;
  width: 68%;
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
