import React from 'react';
import styled from 'styled-components';

export default function Bookmark({ data }) {
  return (
    <SalesBox>
      <SalesStatus>
        <SalesCategory>
          <span>즐겨찾기 수:</span>
          <b>9 건</b>
        </SalesCategory>
        <SalesCategory>
          <span>전체 상품 수:</span>
          <b>{data && data.all_product} 건</b>
        </SalesCategory>
        <SalesCategory>
          <span>노출 상품 수:</span>
          <b>{data && data.displayed_product} 건</b>
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
  background-color: #fff;
  height: 100%;
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
