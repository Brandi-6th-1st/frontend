import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
// import axios from 'axios';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import LoginFooter from './LoginFooter';
export default function Login() {
  const [inputValue, setInputValue] = useState({
    idValue: '',
    pwValue: '',
  });

  const { register, handleSubmit, errors } = useForm();

  const history = useHistory();

  const onSubmit = (data) => {
    console.log(data);
  };

  // 구조화
  const { idValue, pwValue } = inputValue;

  //id, password 입력 값 저장
  const handleInput = (e) => {
    const nextInputValue = {
      ...inputValue,
      [e.target.name]: e.target.value,
    };
    setInputValue(nextInputValue);
    console.log('inputValue: ', inputValue);
    console.log('idValue: ', idValue);
  };

  //master
  //id:soojsooj
  //pw:PW1!soojsooj

  //seller
  // id: seller1
  //pw: PW1!seller1
  const goToHome = (e) => {
    e.preventDefault();
    fetch('http://10.251.1.180:5000/account/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        identification: idValue,
        password: pwValue,
      }),
    })
      .then((response) => response.json())
      // .then((result) => console.log(result));
      // .then((response) => {
      //   if (response.token) {
      //     localStorage.setItem('wtw-token', response.token);
      //   }
      // });
      // .then((result) => console.log('result: ', result));
      .then((result) => {
        if (result.data.Authorization) {
          localStorage.setItem('token', result.data.Authorization);
          alert('로그인 성공');
          // history.push('./');
        } else if (result.data.message === 'UNAUTHORIZED') {
          alert('아이디와 비밀번호를 확인해주세요');
        }
      });
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
              onChange={handleInput}
            />
            {/* id와 password가 입력되지 않았을 때 나타날 오류 */}
            {errors.idValue && errors.pwValue && <p>아이디를 입력해주세요</p>}
            <Input
              name='pwValue'
              // ref={register({ required: true, pattern: /^[A-Za-z]+$/i })}
              ref={register({ required: true })}
              placeholder='셀러 비밀번호'
              className={errors.pwValue && 'ErrorInput'}
              onChange={handleInput}
            />
            {/* id와 password가 입력되지 않았을 때 나타날 오류 */}
            {errors.pwValue && <p>비밀번호를 입력해주세요</p>}

            <Button onClick={goToHome}>로그인</Button>
            {/* <Button>로그인</Button> */}
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
  width: 130px;
  margin: 0 auto 40px auto;
`;

const LoginBox = styled.div`
  width: 380px;
  height: 380px;
  padding: 64px 30px 0 30px;
  background-color: #fff;
  border-radius: 20px;
`;

const LoginTitle = styled.h3`
  margin: 0 0 25px 0;
`;

const Input = styled.input`
  width: 100%;
  margin: 5px 0;
  padding: 13px 16px;
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
  width: 15px;
  height: 15px;
  margin-right: 5px;
  font-weight: 100;
`;

const Button = styled.button`
  width: 100%;
  margin-top: 20px;
  padding: 13px 0;
  background-color: black;
  border-radius: 8px;
  color: white;
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
