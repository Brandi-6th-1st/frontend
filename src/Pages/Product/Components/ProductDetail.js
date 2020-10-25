import React from 'react';
import styled from 'styled-components';

export default function ProductDetail({ product }) {
  return (
    <ProductContainer>
      <AllProductView>
        <span>
          전체 조회건 수 : <b> {product && product.productItem.length}</b>건
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
                  <img src={cate.main_image_url} width="70px" height="70px" />
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
  );
}

const ProductContainer = styled.div`
  table {
    width: 100%;
  }
`;

const AllProductView = styled.div`
  margin-bottom: 3px;

  span {
    font-size: 13px;
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
