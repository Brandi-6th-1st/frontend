import React from 'react';
import styled from 'styled-components';

export default function ProductManage({ sellerStatus }) {
  return (
    <SalesBox>
      <SalesStatus>
        <SalesCategory>
          <span>상품 준비 : </span>
          <b>{sellerStatus && sellerStatus.product_preparation}건 </b>
        </SalesCategory>
        <SalesCategory>
          <span>배송 준비 : </span>
          <b>2건 </b>
        </SalesCategory>
        <SalesCategory>
          <span>배송 중 : </span>
          <b>5건 </b>
        </SalesCategory>
        <SalesCategory>
          <span>배송 완료 : </span>
          <b>{sellerStatus && sellerStatus.delivery_completed}건 </b>
        </SalesCategory>
        <SalesCategory>
          <span>구매 확정 : </span>
          <b>3건 </b>
        </SalesCategory>
      </SalesStatus>
    </SalesBox>
  );
}

const SalesBox = styled.div`
  display: inline-block;
  width: 33.3%;
  padding: 0 15px;
  margin-bottom: 22px;
`;

const SalesStatus = styled.div`
  background-color: #fff;
  padding: 15px 20px 0px 20px;
  border: 1px solid #dddddd;
  border-radius: 3px;
`;

const SalesCategory = styled.div`
  ${({ theme }) => theme.flex('space-between')}
  height:30px;

  span {
    font-size: 13px;
  }

  b {
    font-size: 13px;
  }
`;
