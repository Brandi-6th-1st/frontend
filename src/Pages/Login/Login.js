import React, { useState } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import LoginFooter from './LoginFooter';
import { Link } from 'react-router-dom';

export default function Login() {
  const [validInput, setValidInput] = useState('');
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };

  //id 5글자 이상, password 5글자 이상일 경우에만 로그인 가능하도록 추가기능 구현 예정
  const handleLoginButton = () => {
    if (idValue.length < 5 || pwValue.length < 5) {
      setValidInput(false);
    }
  };

  return (
    <Container>
      <Content>
        <Logo alt='브랜디로고' src='/public/Images/logo2.png' />
        <LoginBox>
          <LoginTitle>브랜디 어드민 로그인</LoginTitle>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              name='idValue'
              ref={register({ required: true })}
              placeholder='셀러 아이디'
              className={errors.idValue && 'ErrorInput'}
            />
            {/* id와 password가 입력되지 않았을 때 나타날 오류 */}
            {errors.idValue && errors.pwValue && <p>아이디를 입력해주세요</p>}
            <Input
              name='pwValue'
              ref={register({ required: true, pattern: /^[A-Za-z]+$/i })}
              placeholder='셀러 비밀번호'
              className={errors.pwValue && 'ErrorInput'}
            />
            {/* id와 password가 입력되지 않았을 때 나타날 오류 */}
            {errors.pwValue && <p>비밀번호를 입력해주세요</p>}

            <Button onClick={handleLoginButton}>로그인</Button>
            <Join>
              <p>아직 셀러가 아니신가요?</p>
              <p>
                <Link to='/Signup'>회원가입하기</Link>
              </p>
            </Join>
          </form>
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
  height: 100vh;
  padding: 65px 0 50px;
  p {
    margin-top: 5px;
    font-size: 12px;
    font-weight: bold;
  }
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
  &.ErrorInput {
    border: 1px solid #b94a48;
  }
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
    margin-right: 5px;
    font-size: 12px;
    font-weight: 100;
    :nth-child(2) {
      color: #3c72ff;
      font-weight: bold;
    }
  }
`;
