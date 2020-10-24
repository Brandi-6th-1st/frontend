import React from 'react';
import styled from 'styled-components';
import { KeyboardArrowRight, List } from '@styled-icons/material';
import Table from './Table';

export default function OrderList() {
  return (
    <div>
      <Pagebar>
        <ul>
          <li>
            <List size={25} />
          </li>
          <li>
            주문관리
            <KeyboardArrowRight size={15} color="#999" />
          </li>
          <li>
            상품준비 관리
            <KeyboardArrowRight size={15} color="#999" />
          </li>
          <li>상품준비 리스트</li>
        </ul>
        <div>
          <Select>
            <option value="NEWEST">최신주문일순</option>
            <option value="OLDEST">주문일의 역순</option>
          </Select>
          <Select>
            <option value="10_EACH">10개씩보기</option>
            <option value="20_EACH">20개씩보기</option>
            <option value="50_EACH" selected>
              50개씩보기
            </option>
            <option value="100_EACH">100개씩보기</option>
            <option value="150_EACH">150개씩보기</option>
          </Select>
        </div>
      </Pagebar>
      <Table />
    </div>
  );
}

const Pagebar = styled.div`
  ${({ theme }) => theme.flex('space-between', 'center', 'row')}
  margin-left: -20px;
  margin-right: -20px;
  padding-left: 10px;
  padding-right: 20px;
  margin-bottom: 10px;
  padding: 3px 0;
  background: #eee;
  ul {
    ${({ theme }) => theme.flex('', 'center', '')}
    padding-left: 20px;
    li {
      ${({ theme }) => theme.flex('', 'center', '')}
      font-size: 14px;
      color: #222;
      &:first-child {
        padding-right: 5px;
      }
    }
  }
`;

const Select = styled.select`
  height: 30px;
  width: 120px;
  padding: 2px 10px;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  line-height: 28px;
  color: #666;
  outline: none;
  &:last-child {
    margin-right: 20px;
  }
`;
