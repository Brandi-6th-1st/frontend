import React from 'react';
import styled from 'styled-components';
import NavList from './NavList';
import SELLER_NAV from './DataSellerNav';
import MASTER_NAV from './DataMasterNav';

export default function Nav() {
  return (
    <NavContainer>
      <ul>
        {SELLER_NAV.map((el, idx) => (
          <NavList key={idx} category={el.category} />
        ))}
      </ul>
    </NavContainer>
  );
}

const NavContainer = styled.div`
  width: 215px;
  height: 100vh;
  background: #35373a;
  ul {
    padding-top: 53px;
  }
`;
