import React from 'react';
import styled, { css } from 'styled-components';
import ORDER_EXAMPLE from './DataOrder';

export default function Table() {
  return (
    <div>
      <UpperTable>
        <div>
          <Total>
            전체 조회건 수: <b>0</b> 건
          </Total>
          <Button blue>배송처리</Button>
        </div>
        <div>
          <Button>전체주문 엑셀다운로드</Button>
          <Button>선택주문 엑셀다운로드</Button>
        </div>
      </UpperTable>
      <TableContainer>
        <table>
          <thead>
            <th>
              <input type="checkbox" />
            </th>
            <th>결제일자</th>
            <th>주문번호</th>
            <th>주문상세번호</th>
            <th>상품명</th>
            <th>옵션정보</th>
            <th>수량</th>
            <th>주문자명</th>
            <th>핸드폰번호</th>
            <th>주문상태</th>
          </thead>
          {ORDER_EXAMPLE.map((el) => (
            <tbody>
              <td>
                <input type="checkbox" />
              </td>
              <td>{el.paid_at}</td>
              <td>{el.order_number}</td>
              <td>{el.detail_order_number}</td>
              <td>{el.product_name}</td>
              <td>{el.option_info}</td>
              <td>{el.quantity}</td>
              <td>{el.receiver_name}</td>
              <td>{el.receiver_contact}</td>
              <td>{el.order_status}</td>
            </tbody>
          ))}
        </table>
      </TableContainer>
      <UnderTable>
        <Button>전체주문 엑셀다운로드</Button>
        <Button>선택주문 엑셀다운로드</Button>
      </UnderTable>
    </div>
  );
}

const UpperTable = styled.div`
  ${({ theme }) => theme.flex('space-between')}
`;

const Total = styled.span`
  font-size: 13px;
  margin-right: 15px;
`;

const Button = styled.button`
  height: 22px;
  padding: 2px 5px;
  margin-left: 3px;
  color: white;
  background: #5cb85c;
  border: 1px solid #4cae4c;
  border-radius: 4px;
  font-size: 12px;
  ${(props) =>
    props.blue &&
    css`
      background: #428bca;
      border-color: #357ebd;
    `}
`;

const TableContainer = styled.div`
  width: 100%;
  table {
    margin-top: 10px;
    width: 100%;
    th {
      min-width: 80px;
      padding: 8px;
      background: #eee;
      border: 1px solid #ddd;
      font-size: 14px;
      font-weight: 500;
      text-align: start;
    }
    td {
      padding: 8px;
      border: 1px solid #ddd;
      font-size: 14px;
      color: #222;
    }
  }
`;

const UnderTable = styled.div`
  ${({ theme }) => theme.flex('flex-end')}
  margin-top: 10px;
`;
