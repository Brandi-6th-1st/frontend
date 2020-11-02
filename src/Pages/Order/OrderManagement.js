import React, { Fragment } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Filter from './Filter';
import OrderList from './OrderList';
import COMPONENT_ORDER from './DataOrderComponent';

export default function OrderManagement() {
  // 주소에 있는 id 파라미터로 동일한 컴포넌트에서 다른 데이터를 사용하여 각 주문 상태에 따른 내용을 가져옵니다.
  const match = useParams();
  // 해당 주소가 담겨 오면 숫자로 리턴한다.
  const categoryId = () => {
    if (match.id === 'prepareList') {
      return 1;
    }
    if (match.id === 'deliveryList') {
      return 2;
    }
    if (match.id === 'deliveryPrepareList') {
      return 2;
    }
    if (match.id === 'deliveryCompleteList') {
      return 3;
    }
    if (match.id === 'orderConfirmList') {
      return 4;
    }
    return match.id;
  };
  const pagetext = COMPONENT_ORDER[categoryId() - 1];

  return (
    <ManagementContainer>
      <Title>
        <h3>주문 관리</h3>
        <span>{pagetext.title} 관리</span>
        <div>
          {pagetext.description &&
            pagetext.description.map((el) => <p>{el}</p>)}
        </div>
      </Title>
      <Filter pagetext={pagetext} />
      <OrderList pagetext={pagetext} />
    </ManagementContainer>
  );
}

const ManagementContainer = styled.div`
  width: 100%;
  min-height: 875px;
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
