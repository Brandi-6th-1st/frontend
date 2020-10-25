import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styled, { css } from 'styled-components';

export default function SubList({
  active,
  subcategory,
  categoryIdx,
  handlePage,
  sidebarSmall,
}) {
  const history = useHistory();
  const [subActive, setSubActive] = useState(
    active[0] === categoryIdx ? active[1] : 0
  );

  const goToMenu = (subIdx, link) => {
    // 두번째 인자 추가하기!
    handlePage(categoryIdx, subIdx);
    setSubActive(subIdx);
    // 여기에서 history push로 페이지 이동시켜주면 돼요!
    history.push(link);
  };

  return (
    <SubContainer sidebarSmall={sidebarSmall}>
      {subcategory.map((el, idx) => (
        <Subcategory
          index={idx + 1}
          subActive={subActive}
          key={el.id}
          onClick={() => goToMenu(idx + 1, el.link)} // goToMenu의 두번째 인자로 map 돌릴때 이동할 백에서 nav 데이터에 포함해준 주소를 넣어주면 되겠죠! ex) /order/orderlist, /product/register
          sidebarSmall={sidebarSmall}
        >
          {el.title}
        </Subcategory>
      ))}
    </SubContainer>
  );
}

const SubContainer = styled.ul`
  margin: 8px 0;
  ${({ sidebarSmall }) =>
    sidebarSmall &&
    css`
      background: #35373a;
      position: absolute;
      top: 20px;
      left: 11px;
      width: 173px;
    `}
`;

const Subcategory = styled.li`
  ${({ theme }) => theme.flex('', 'center', '')}
  width: 215px;
  height: 30px;
  padding: 5px 0 5px 35px;
  color: #cecfd3;
  font-size: 14px;
  cursor: pointer;
  &:hover {
    color: white;
    background-color: #414247;
  }
  ${({ index, subActive }) =>
    index === subActive &&
    css`
      color: white;
      background-color: #414247;
    `}
  ${({ sidebarSmall }) =>
    sidebarSmall &&
    css`
      width: 173px;
      padding-left: 15px;
    `}
`;
