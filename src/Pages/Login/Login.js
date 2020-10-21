import React from 'react';
import styled from 'styled-components';
import LoginFooter from './LoginFooter';

export default function Login() {
  return (
    <Container>
      <Content>
        <Logo alt="브랜디로고" src="/public/Images/logo2.png" />
        <LoginBox>
          <LoginTitle>브랜디 어드민 로그인</LoginTitle>
          <Input placeholder="셀러 아이디" />
          <Input placeholder="셀러 비밀번호" />
          <Check>
            <Label fontWeight="100">
              <Checkbox type="checkbox" />
              아이디/비밀번호 기억하기
            </Label>
            <Label color="red">비밀번호를 잊으셨나요?</Label>
          </Check>
          <Button>로그인</Button>
          <Join>
            <p>아직 셀러가 아니신가요?</p>
            <JoinButton> 회원가입하기</JoinButton>
          </Join>
        </LoginBox>
      </Content>
      <LoginFooter />
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  background-color: #fafafa;
`;

const Content = styled.div`
  ${({ theme }) => theme.flex('center', 'center', 'column')}
  padding: 65px 0 50px;
  height: 100vh;
`;

const Logo = styled.img`
  margin: 0 auto 40px auto;
  width: 130px;
`;

const LoginBox = styled.div`
  width: 380px;
  height: 380px;
  padding: 64px 30px 0 30px;
  background: #fff;
  border-radius: 20px;
`;

const LoginTitle = styled.h3`
  margin: 0 0 25px 0;
`;

const Input = styled.input`
  margin: 5px 0;
  padding: 13px 16px;
  width: 100%;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
`;

const Check = styled.div`
  ${({ theme }) => theme.flex('space-between', 'center')}
  margin-top: 20px;
`;

const Label = styled.label`
  ${({ theme }) => theme.flex(null, 'center')}
  color: ${(props) => props.color};
  font-weight: ${(props) => props.fontWeight};
  font-size: 12px;
`;

const Checkbox = styled.input`
  margin-right: 5px;
  width: 15px;
  height: 15px;
  font-weight: 100;
`;

const Button = styled.button`
  width: 100%;
  margin-top: 20px;
  padding: 13px 0;
  background-color: black;
  color: white;
  border-radius: 8px;
  text-align: center;
`;

const Join = styled.div`
  ${({ theme }) => theme.flex('center', 'center')}
  margin-top: 20px;
  p {
    font-size: 12px;
    font-weight: 100;
  }
`;

const JoinButton = styled.button`
  color: #3c72ff;
  font-size: 12px;
`;
