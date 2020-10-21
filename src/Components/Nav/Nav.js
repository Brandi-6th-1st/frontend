import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import NavList from './NavList';
import { KeyboardArrowLeft, KeyboardArrowDown } from '@styled-icons/material';
import SELLER_NAV from './DataSellerNav';
import MASTER_NAV from './DataMasterNav';

export default function Nav() {
  const [active, setActive] = useState(0);
  const [subActive, setSubActive] = useState(0);

  const handlePage = (category) => {
    console.log(category);
    setActive(category);
    // 페이지 이동 함수 추가
  };

  return (
    <NavContainer>
      <SideToggler>
        <KeyboardArrowLeft size={20} />
      </SideToggler>
      <NavBox>
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
          />
        ))}
      </NavBox>
    </NavContainer>
  );
}

const NavContainer = styled.div`
  width: 215px;
  height: 100vh;
  background: #35373a;
`;

const NavBox = styled.ul`
  padding-top: 53px;
`;

const SideToggler = styled.div`
  ${({ theme }) => theme.flex('center', 'center', '')}
  width: 24px;
  height: 23px;
  margin-top: 15px;
  background-color: #fcfcfc;
  border-radius: 4px 0 0 4px;
  float: right;
  cursor: pointer;
`;
