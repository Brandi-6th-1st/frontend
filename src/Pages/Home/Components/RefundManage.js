import React from 'react';
import styled from 'styled-components';

export default function RefundManage() {
  return (
    <SalesBox>
      <SalesStatus>
        <SalesCategory>
          <span>환불 요청 :</span>
          <b>1 건</b>
        </SalesCategory>
        <SalesCategory>
          <span>반품 진행 :</span>
          <b>5 건</b>
        </SalesCategory>
        <SalesCategory>
          <span>주문 취소중 :</span>
          <b>3 건</b>
        </SalesCategory>
        <SalesCategory>
          <span>환불 승인중 :</span>
          <b>2 건</b>
        </SalesCategory>
      </SalesStatus>
    </SalesBox>
  );
}

const SalesBox = styled.div`
  display: inline-block;
  width: 33.3%;
  padding-left: 15px;
  padding-right: 15px;
  margin-bottom: 22px;
`;

const SalesStatus = styled.div`
  height: 100%;
  background-color: #fff;
  padding: 15px 20px 0px 20px;
  border: 1px solid #dddddd;
  border-radius: 3px;
`;

const SalesCategory = styled.div`
  ${({ theme }) => theme.flex('space-between', '', '')}
  height:30px;

  span {
    font-size: 13px;
  }

  b {
    font-size: 13px;
  }
`;
