import React from 'react';
import styled, { css } from 'styled-components';
import ORDER_EXAMPLE from './DataOrder';

export default function Table({ pagetext }) {
  return (
    <div>
      <UpperTable>
        <div>
          <Total>
            전체 조회건 수: <b>0</b> 건
          </Total>
          {pagetext.button && <Button blue>{pagetext.button}</Button>}
        </div>
        <div>
          <Button>전체주문 엑셀다운로드</Button>
          <Button>선택주문 엑셀다운로드</Button>
        </div>
      </UpperTable>
      <TableContainer>
        <table>
          <thead>
            <th className="checkbox">
              <input type="checkbox" />
            </th>
            {pagetext.table_header &&
              pagetext.table_header.map((el) => <th>{el}</th>)}
          </thead>
          <tbody>
            {ORDER_EXAMPLE[pagetext.id - 1].map((order) => (
              <tr>
                <td className="checkbox">
                  <input type="checkbox" />
                </td>
                {Object.values(order)
                  .slice(1)
                  .map((el) => (
                    <td>{el}</td>
                  ))}
              </tr>
            ))}
          </tbody>
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
      padding: 8px;
      background: #eee;
      border: 1px solid #ddd;
      font-size: 14px;
      font-weight: 500;
      text-align: start;
      &.checkbox {
        width: 25px;
        text-align: center;
      }
    }
    td {
      padding: 8px;
      border: 1px solid #ddd;
      font-size: 14px;
      color: #222;
      &.checkbox {
        width: 25px;
        text-align: center;
      }
    }
    input[type='checkbox'] {
      cursor: pointer;
    }
  }
`;

const UnderTable = styled.div`
  ${({ theme }) => theme.flex('flex-end')}
  margin-top: 10px;
`;
