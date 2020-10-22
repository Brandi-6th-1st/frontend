import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';

export default function SubList({
  active,
  subcategory,
  categoryIdx,
  handlePage,
  sidebarSmall,
}) {
  const [subActive, setSubActive] = useState(
    active[0] === categoryIdx ? active[1] : 0
  );

  const goToMenu = (subIdx) => {
    handlePage(categoryIdx, subIdx);
    setSubActive(subIdx);
  };

  return (
    <SubContainer sidebarSmall={sidebarSmall}>
      {subcategory.map((el, idx) => (
        <Subcategory
          index={idx + 1}
          subActive={subActive}
          key={el.id}
          onClick={() => goToMenu(idx + 1)}
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
