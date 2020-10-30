import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import NavList from './NavList';
import { KeyboardArrowLeft } from '@styled-icons/material';
import SELLER_NAV from './DataSellerNav';
import MASTER_NAV from './DataMasterNav';

export default function Nav() {
  const [active, setActive] = useState([0, 0]);
  const [subActive, setSubActive] = useState(0);
  const [sidebarSmall, setSidebarSmall] = useState(false);

  const handlePage = (category, subcategory) => {
    setActive([category, subcategory]);
    // 페이지 이동 함수 추가
  };

  return (
    <NavContainer sidebarSmall={sidebarSmall}>
      <SideToggler
        sizeToggle={sidebarSmall}
        onClick={() => setSidebarSmall(!sidebarSmall)}
      >
        <KeyboardArrowLeft size={20} />
      </SideToggler>
      <NavBox>
        {/* 백에서 보내주는 Nav 데이터를 넣어주기만 하면 아이콘 알아서 반영됩니다! */}
        {SELLER_NAV.map((el, idx) => (
          <NavList
            setSubActive={(e) => setSubActive(e)}
            active={active}
            subActive={subActive}
            key={idx}
            index={idx + 1}
            category={el.category}
            subcategory={el.subcategory}
            handlePage={handlePage}
            sidebarSmall={sidebarSmall}
            link={el.link}
          />
        ))}
      </NavBox>
    </NavContainer>
  );
}

const NavContainer = styled.div`
  width: 215px;
  height: 100vh;
  padding-top: 45px;
  background: #35373a;
  z-index: 10;
  ${({ sidebarSmall }) =>
    sidebarSmall &&
    css`
      width: 40px;
    `}
  @media only screen and (max-width: 934px) {
    display: none;
  }
`;

const NavBox = styled.ul`
  padding-top: 53px;
`;

const SideToggler = styled.div`
  ${({ theme }) => theme.flex('center', 'center')}
  width: 23px;
  height: 23px;
  margin-top: 15px;
  background-color: #fcfcfc;
  border-radius: 4px 0 0 4px;
  float: right;
  cursor: pointer;
  ${({ sizeToggle }) =>
    sizeToggle &&
    css`
      transform: rotate(180deg);
      border-radius: 0 4px 4px 0;
    `};
`;
