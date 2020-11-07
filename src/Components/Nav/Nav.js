import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import NavList from './NavList';
import { KeyboardArrowLeft } from '@styled-icons/material';

export default function Nav() {
  const history = useHistory();
  const [active, setActive] = useState([0, 0]);
  const [navData, setNavData] = useState([]);
  const [subActive, setSubActive] = useState(0);
  const [sidebarSmall, setSidebarSmall] = useState(false);

  // store에 있는 nav 정보를 가져온다.
  const { nav_list, filter_list } = useSelector(({ userInfo }) => ({
    nav_list: userInfo.nav_list,
  }));

  //nav가 변경되면 nav 데이터를 최신화
  useEffect(() => {
    // if (!nav_list[0]) {
    //   alert('다시 로그인 해주세요.');
    //   history.push('/');
    // }

    setNavData(nav_list);
  }, [nav_list]);

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
  @media only screen and (max-width: 934px) {
    display: none;
  }

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
