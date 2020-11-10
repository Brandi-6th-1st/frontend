import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled, { css } from 'styled-components';
import regeneratorRuntime from 'regenerator-runtime';
import axios from 'axios';
import { API } from '../../config';
// import ORDER_EXAMPLE from './DataOrder';

export default function Table({ pagetext, orderList, setOrderList }) {
  const history = useHistory();

  // 전체 버튼의 클릭 상태
  const [allCheck, setAllCheck] = useState(false);

  // 현재 클릭된 주문 항목의 id
  const [checkOrder, setCheckOrder] = useState([]);

  // 현재 클릭된 배열의 상태
  const [isSelected, setIsSelected] = useState(
    new Array(orderList && orderList.length).fill(false)
  );

  const [changeId, setChangeId] = useState();

  // 전체 주문 리스트가 변경하게 되면 배열 새로 생성
  useEffect(() => {
    setIsSelected(new Array(orderList && orderList.length).fill(false));
    setAllCheck(false);
  }, [orderList]);

  // 전체 버튼을 클릭했을 경우 실행
  const handleClickAll = () => {
    if (allCheck) {
      setAllCheck(!allCheck);
      setIsSelected(new Array(orderList.length).fill(!allCheck));
      setCheckOrder([]);
    } else {
      setAllCheck(!allCheck);
      setIsSelected(new Array(orderList.length).fill(!allCheck));
      setCheckOrder(orderList.map((el) => String(el.id)));
    }
  };

  //개별 버튼을 클릭했을 경우 실행
  const selectProduct = (e, idx, orderId) => {
    const { checked, id } = e.target;
    const newSelceted = isSelected.map((el, i) => (idx === i ? !el : el));
    setChangeId(orderId);
    setIsSelected(newSelceted);

    // 모든 버튼이 눌렸을 경우
    if (newSelceted.every((item) => item)) {
      setAllCheck(true);
    } else {
      setAllCheck(false);
    }

    // 체크된 상품의 id를 저장한다.
    if (!!checked) {
      setCheckOrder(checkOrder.concat(id));
    } else {
      setCheckOrder(checkOrder.filter((el) => el !== id));
    }
  };

  const sendChangeProduct = async (changeData) => {
    const localToken = localStorage.getItem('token');

    try {
      const result = await axios.post(
        `${API}/order/change`,
        { ...changeData },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: localToken,
          },
          timeout: 3000,
        }
      );
    } catch (err) {
      if (err.response) {
        // 토큰의 정보가 바뀌었다면, 백엔드에서 받은 message 팝업창 출력
        if (err.response.statusText === 'UNAUTHORIZED') {
          alert(err.response.data.client_message);
          history.push('/');
        }
      } else if (err.request) {
        alert('서버에서 응답이 없습니다.', err.request);
      } else {
        alert('메세지 에러', err.message);
      }
    }
  };

  const goToProductDetail = (code) => {
    history.push(`/order/prepareList/${code}`);
  };

  const changedApply = (e) => {
    // 상품이 하나도 체크되지 않았을 경우
    if (!checkOrder.length) {
      console.log(checkOrder);
      return alert('상품을 선택하세요');
    }

    // 전체버튼이 체크되지 않는 경우
    if (!!checkOrder.length) {
      // 상품의 진열여부, 판매여부를 변경한다.
      setOrderList(
        orderList.map((el) => {
          if (checkOrder.includes(String(el.id))) {
            return { ...el, order_status: pagetext.button };
          } else {
            return el;
          }
        })
      );

      const changeQuery = {
        id: checkOrder.map((el) => Number(el)),
        status_id: changeId,
      };
      sendChangeProduct(changeQuery);
      // 적용 후 모든 상태를 초기화시킨다.
      setAllCheck(false);
      setCheckOrder([]);
    }
  };
  return (
    <div>
      <UpperTable>
        <div>
          <Total>
            전체 조회건 수: <b>0</b> 건
          </Total>
          {pagetext.button && (
            <Button blue onClick={(e) => changedApply(e)}>
              {pagetext.button}
            </Button>
          )}
        </div>
        <div>
          <Button>전체주문 엑셀다운로드</Button>
          <Button>선택주문 엑셀다운로드</Button>
        </div>
      </UpperTable>
      <TableContainer>
        <table>
          <thead>
            <tr>
              <th className="checkbox">
                <input
                  type="checkbox"
                  checked={allCheck ? 'checked' : ''}
                  onChange={handleClickAll}
                  defaultValue=""
                />
              </th>
              {pagetext.table_header &&
                pagetext.table_header.map((el, index) => (
                  <th key={index}>{el}</th>
                ))}
            </tr>
          </thead>
          <tbody>
            {orderList &&
              orderList.map((order, index) => (
                <tr key={index}>
                  <td className="checkbox">
                    <input
                      type="checkbox"
                      id={order.id}
                      checked={isSelected[index] ? 'checked' : ''}
                      onChange={(e) =>
                        selectProduct(e, index, order.order_status_id)
                      }
                    />
                  </td>
                  {Object.values(order).map((el, index) =>
                    order.c_detail_order_id === el ? (
                      <td
                        key={index}
                        onClick={(el) =>
                          goToProductDetail(order.c_detail_order_id)
                        }
                      >
                        {el}
                      </td>
                    ) : (
                      order.order_status_id !== el && <td key={index}>{el}</td>
                    )
                  )}
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
  overflow-x: scroll;
  white-space: nowrap;
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
      overflow-x: hidden;
      white-space: nowrap;
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
      overflow-x: hidden;
      white-space: nowrap;
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
