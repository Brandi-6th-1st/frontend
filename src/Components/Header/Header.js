import React from 'react';
import styled from 'styled-components';
import { KeyboardArrowDown } from '@styled-icons/material';

export default function Header() {
  return (
    <HeaderContainer>
      <Contents>
        <div>
          <img src='/public/Images/logo.png' />
          <KeyboardArrowDown size='16' color='#CCC' />
        </div>
      </Contents>
      <StatusBtn>
        <LogoutBox>{is_master ? 'intern_master' : 'intern_seller'}</LogoutBox>
        <KeyboardArrowDown size='15' color='#999ba2' />
        <div>
          <LogoutText onClick={logOut}>
            <GoSignOut />
            Log Out
          </LogoutText>
        </div>
      </StatusBtn>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.div`
  ${({ theme }) => theme.flex('space-between', 'center', 'row')}
  position: fixed;
  width: 100vw;
  height: 45px;
  background: #873b53;
  z-index: 100;
  div {
    ${({ theme }) => theme.flex('', 'center', 'row')}
  }
  img {
    width: 100px;
    margin-right: 3px;
  }
  span {
    color: white;
    font-size: 13px;
    font-weight: 400;
    margin: 0 0 2px 10px;
  }
`;

const Contents = styled.div`
  ${({ theme }) => theme.flex('', 'center', 'row')}
  margin: 0 20px;
`;

const StatusBtn = styled.div`
  ${({ theme }) => theme.flex('', 'center', 'row')}
  width: 130px;
  height: 45px;
  margin-right: 20px;
  border-left: 1px solid white;
  span {
    color: #cecfd3;
    margin-right: 3px;
    margin-left: 16px;
  }
`;
