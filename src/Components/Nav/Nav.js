import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { useSelector } from 'react-redux';
import NavList from './NavList';
import { KeyboardArrowLeft } from '@styled-icons/material';
// import SELLER_NAV from './DataSellerNav';
// import MASTER_NAV from './DataMasterNav';

export default function Nav() {
  const [active, setActive] = useState([0, 0]);
  const [navData, setNavData] = useState([]);
  const [subActive, setSubActive] = useState(0);
  const [sidebarSmall, setSidebarSmall] = useState(false);

  // store에 있는 nav 정보를 가져온다.
  const { nav } = useSelector(({ nav }) => ({
    nav: nav.nav_list,
    // filter_list: filter.filter_list,
  }));

  //nav가 변경되면 nav 데이터를 최신화
  useEffect(() => {
    setNavData(nav);
  }, [nav]);

  // 네브가 눌렸을때, 페이지 이동 함수
  const handlePage = (menuTitle, subTitle) => {
    setActive([menuTitle, subTitle]);
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
        {navData &&
          navData.map((el, idx) => (
            <NavList
              setSubActive={(e) => setSubActive(e)}
              active={active}
              subActive={subActive}
              key={idx}
              index={idx + 1}
              menuTitle={el.menu_title}
              subTitle={el.sub_menus}
              handlePage={handlePage}
              sidebarSmall={sidebarSmall}
              link={el.main_url}
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
