import React from 'react';
import styled from 'styled-components';

export default function Bookmark({ sellerStatus }) {
  return (
    <SalesBox>
      <SalesStatus>
        <SalesCategory>
          <span>즐겨찾기 수:</span>
          <b>9 건</b>
        </SalesCategory>
        <SalesCategory>
          <span>전체 상품 수:</span>
          <b>{sellerStatus && sellerStatus.all_product} 건</b>
        </SalesCategory>
        <SalesCategory>
          <span>노출 상품 수:</span>
          <b>{sellerStatus && sellerStatus.displayed_product} 건</b>
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
  height: 100%;
  padding: 15px 20px 0px 20px;
  border: 1px solid #dddddd;
  border-radius: 3px;
`;

const SalesCategory = styled.div`
  ${({ theme }) => theme.flex('space-between')}
  height:30px;

  span,
  b {
    font-size: 13px;
  }
`;
