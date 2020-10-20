import React from 'react';
import styled from 'styled-components';

export default function Signup() {
  return (
    <Container>
      <Content>
        <Logo alt="브랜디로고" src="/public/Images/logo2.png" />
        <Title>
          셀러 회원 가입
          <hr />
        </Title>

        <SignupBox>
          <SubTitle>정보입력</SubTitle>
        </SignupBox>
      </Content>
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  background-color: #fafafa;
`;

const Content = styled.div`
  ${({ theme }) => theme.flex('center', 'center', 'column')}
  width: 500px;
  margin: 0 auto;
  padding: 30px;
  background-color: #fff;
`;

const Logo = styled.img`
  margin: 0 auto 40px auto;
  width: 130px;
`;

const Title = styled.h3`
  width: 100%;
  margin-top: 20px;
  margin-bottom: 10px;
  text-align: center;
  font-size: 24px;
  font-weight: 100;
  hr {
    margin-top: 30px;
    color: #e0dfdf;
  }
`;

const SignupBox = styled.div`
  ${({ theme }) => theme.flex('center', 'center', 'column')}
  width: 100%;
`;

const SubTitle = styled.div`
  width: 408px;
  height: 45px;
  padding-top: 10px;
  background-color: #353535;
  color: white;
  font-size: 20px;
  text-align: center;
`;
