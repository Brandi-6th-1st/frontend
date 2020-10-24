import React from 'react';
import styled from 'styled-components';
import Filter from './Filter';
import OrderList from './OrderList';

export default function OrderManagement() {
  return (
    <ManagementContainer>
      <Title>
        <h3>주문 관리</h3>
        <span>상품준비 관리</span>
        <div>
          <p>
            ( 상품준비 단계에서는 구매회원의 주문취소가 가능하며, 배송준비단계로
            처리할 경우 3영업일 동안은 구매회원의 주문취소가 불가능합니다. )
          </p>
          <p>
            ( 배송준비로 변경하신 후 3영업일 이내로 상품 배송이 시작되지 않을
            경우 구매회원의 주문취소가 가능하며 이에 따른 책임은 판매자 회원에게
            있습니다. (전자상거래법 제 15조 1항에 근거) )
          </p>
        </div>
      </Title>
      <Filter />
      <OrderList />
    </ManagementContainer>
  );
}

const ManagementContainer = styled.div`
  width: 100%;
  min-height: 875px;
  /* margin-top: 45px; */
  /* margin-left: 215px; */
  padding: 72px 20px 20px 20px;
  background: #fafafa;
  border-radius: 0 0 0 4px;
`;

const Title = styled.div`
  h3 {
    display: inline-block;
    margin-right: 6px;
    color: #666;
    font-size: 26px;
    font-weight: 400;
    letter-spacing: -1px;
  }
  span {
    font-size: 14px;
    font-weight: 300;
    color: #888;
  }
  div {
    margin-top: 12px;
    p {
      font-size: 14px;
      font-weight: 400;
      color: #888;
      margin-bottom: 5px;
      line-height: 1.5;
    }
  }
`;
