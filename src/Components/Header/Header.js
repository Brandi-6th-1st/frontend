import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { isClear } from '../../Store/Reducer/userInfo';
import styled from 'styled-components';
import { KeyboardArrowDown } from '@styled-icons/material';
import { GoSignOut } from 'react-icons/go';

export default function Header() {
  const history = useHistory();
  const dispatch = useDispatch();

  const { is_master } = useSelector(({ userInfo }) => ({
    is_master: userInfo.is_master,
  }));

  const logOut = () => {
    history.push('/');
    localStorage.removeItem('token');
    dispatch(isClear());
  };
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
    /* color: white; */
    font-size: 13px;
    font-weight: 400;
    margin: 0 0 2px 10px;
  }
`;

const LogoutBox = styled.span`
  color: #cecfd3;
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
    /* color: #cecfd3; */
    margin-right: 3px;
    margin-left: 16px;
  }
  div {
    display: none;
    svg {
      vertical-align: middle;
    }
  }
  &:hover {
    background-color: #414247;
    div {
      display: block;
      background-color: white;
      position: absolute;
      top: 45px;
      right: 6px;
      width: 160px;
      height: 30px;
      border: 1px solid gray;
      text-align: center;
      color: black;
      cursor: pointer;
      span {
        color: black;
        display: block;
        margin-top: 7px;
      }
      &:hover {
        background-color: #eee;
        cursor: pointer;
      }
    }
  }
`;

const LogoutText = styled.span`
  color: black;
  display: block;
  margin-top: 7px;
`;
