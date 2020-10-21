import React from 'react';
import styled from 'styled-components';
import { KeyboardArrowUp } from '@styled-icons/material';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <FooterContainer>
      <div>
        {' '}
        | 상호 : (주)브랜디 | 주소 : (06223) 서울특별시 강남구 테헤란로 32길 26
        청송빌딩 | 사업자등록번호 : 220-88-93187 | 통신판매업신고 :
        2016-서울강남-00359호 | 이메일 : help@brandi.co.kr
        <br />
        2018 © brandi inc.
      </div>
      <div onClick={() => scrollToTop()}>
        <span>
          <KeyboardArrowUp size={25} />
        </span>
      </div>
    </FooterContainer>
  );
}

const FooterContainer = styled.div`
  ${({ theme }) => theme.flex('space-between', '', '')}
  width: 100vw;
  height: 50px;
  padding: 10px 20px 5px 20px;
  background: #35373a;
  div {
    color: #999ba2;
    line-height: 1.5;
    font-size: 12px;
  }
  span {
    display: block;
    width: 25px;
    height: 25px;
    background-color: #4d4f55;
    border-radius: 20px;
    cursor: pointer;
  }
`;
