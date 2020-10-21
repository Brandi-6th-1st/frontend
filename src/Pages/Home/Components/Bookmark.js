import React from 'react';
import styled from 'styled-components';
import DataSalesStatus from '../Data/DataSalesStatus';

export default function Bookmark() {
  return (
    <SalesBox>
      <SalesStatus>
        {DataSalesStatus.map((Item) => {
          return (
            <SalesCategory>
              <span>
                {Item.categoryTitle} {Item.categoryTitle.length > 0 && ':'}
              </span>
              <b>
                {Item.number}
                {Item.categoryTitle.length > 0 && '건'}
              </b>
            </SalesCategory>
          );
        })}
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
