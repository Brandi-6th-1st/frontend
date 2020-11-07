import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled, { css } from 'styled-components';

export default function SubList({
  active,
  subTitle,
  categoryIdx,
  handlePage,
  sidebarSmall,
}) {
  const history = useHistory();
  const [subActive, setSubActive] = useState(
    active[0] === categoryIdx ? active[1] : 0
  );

  const goToMenu = (subIdx, link) => {
    handlePage(categoryIdx, subIdx);
    setSubActive(subIdx);

    // order 페이지로 이동해야되는 url에는 order를 붙여준다.
    if (
      link === 'prepareList' ||
      link === 'deliveryPrepareList' ||
      link === 'deliveryList' ||
      link === 'deliveryCompleteList' ||
      link === 'orderConfirmList'
    ) {
      return history.push('/order/' + link);
    }

    if (link === 'seller') {
      return history.push('/account/' + link);
    }
    // 여기에서 history push로 페이지 이동시켜주면 돼요!
    history.push(link);
  };

  return (
    <SubContainer sidebarSmall={sidebarSmall}>
      {subTitle.map((el, idx) => (
        <Subcategory
          index={idx + 1}
          subActive={subActive}
          key={el.sub_menu_id}
          onClick={() => goToMenu(idx + 1, el.sub_url)}
          sidebarSmall={sidebarSmall}
        >
          {el.sub_menu_title}
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
