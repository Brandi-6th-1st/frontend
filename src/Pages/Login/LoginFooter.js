import React from 'react';
import styled from 'styled-components';

export default function LoginFooter() {
  return (
    <Footer>
      <FooterInner>
        <CompanyInfo>
          회사명 : (주)브랜디 | 주소 : (06223) 서울특별시 강남구 테헤란로 32길
          26 청송빌딩 | 사업자등록번호 : 220-88-93187 I 통신판매업신고 :
          2016-서울강남-00359호
        </CompanyInfo>
        <CompanyInfo>
          이메일 : help@brandi.co.kr | 2018 © brandi inc.
        </CompanyInfo>
        <Policy>
          <a>이용약관</a> | <a>개인정보처리방침</a>
        </Policy>
      </FooterInner>
    </Footer>
  );
}

const Footer = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px 0;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  background-color: #212121;
`;

const FooterInner = styled.div`
  width: 720px;
  font-size: 11px;
  color: #999ba2;
  a {
    margin-top: 2px;
    color: #fff;
  }
`;

const CompanyInfo = styled.p`
  line-height: 1.5;
`;

const Policy = styled.div`
  margin-top: 10px;
`;
