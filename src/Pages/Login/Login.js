import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import regeneratorRuntime from 'regenerator-runtime';
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';
// import { saveNav } from '../../Store/Reducer/nav';
// import { saveFilter } from '../../Store/Reducer/filter';
import { isMaster, saveNav, saveFilter } from '../../Store/Reducer/userInfo';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import LoginFooter from './LoginFooter';
import { API } from '../../config';

export default function Login() {
  const [inputValue, setInputValue] = useState({
    // idValue: 'soojsooj',
    // pwValue: 'PW1!soojsooj',
    idValue: 'lovemono',
    pwValue: 'PW1!lovemono',
  });
  // 구조화
  const { idValue, pwValue } = inputValue;
  const { register, handleSubmit, errors } = useForm();
  const dispatch = useDispatch();
  const history = useHistory();

  //로그인 버튼 클릭시 입력된 데이터 출력
  const onSubmit = (data) => {
    console.log('로그인 data', data);
  };

  //id, password 입력 값 저장
  const handleInput = (e) => {
    const nextInputValue = {
      ...inputValue,
      [e.target.name]: e.target.value,
    };
    setInputValue(nextInputValue);
  };

  //master
  //id:
  // soojsooj
  //pw:
  // PW1!soojsooj

  // lovemono
  // PW1!lovemono

  //seller
  // id: seller1
  //pw: PW1!seller1

  const { is_master, filter_list, nav_list } = useSelector(({ userInfo }) => ({
    is_master: userInfo.is_master,
    filter_list: userInfo.filter_list,
    nav_list: userInfo.nav_list,
  }));

  const loggedIn = async (e) => {
    console.log(API + '/account/signin');
    e.preventDefault();
    try {
      const result = await axios.post(
        `${API}/account/signin`,
        { identification: idValue, password: pwValue },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          timeout: 3000,
        }
      );
      console.log('결과', result);
      console.log(result.data.success);

      if (result.status === 200) {
        const getIsMaster = await result.data.success.is_master;
        const getNavList = await result.data.success.nav_list;
        const getFilterList = await result.data.success.filter_list;

        if (!!result.data.success.Authorization) {
          localStorage.setItem('token', result.data.success.Authorization);
          dispatch(saveFilter(getFilterList));
          dispatch(saveNav(getNavList));
          dispatch(isMaster(getIsMaster));
          history.push('/home');
        }
      } else {
        return alert(result.data.client_message);
      }
    } catch (err) {
      console.log('erer', err);
      if (err.response) {
        if (err.response.statusText === 'UNAUTHORIZED') {
          alert(err.response.data.client_message);
        }
      } else if (error.request) {
        alert('서버에서 응답이 없습니다.', err.request);
        console.log('서버 응답 실패');
        console.log(error.request);
      } else {
        alert('메세지 에러', err.message);
        console.log(error.message);
        if (error.message === '[INVILD_MESSAGE]') {
          alert('무슨 응답을 받았습니다.', error.message);
        }
      }
    }
  };

  return (
    <Container>
      <Content>
        <Logo alt="브랜디로고" src="/public/Images/logo2.png" />
        <LoginBox>
          <LoginTitle>브랜디 어드민 로그인</LoginTitle>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              name="idValue"
              ref={register({ required: true })}
              placeholder="셀러 아이디"
              className={errors.idValue && 'ErrorInput'}
              onChange={handleInput}
            />
            {/* id와 password가 입력되지 않았을 때 나타날 오류 */}
            {errors.idValue && errors.pwValue && <p>아이디를 입력해주세요</p>}
            <Input
              name="pwValue"
              ref={register({ required: true })}
              placeholder="셀러 비밀번호"
              className={errors.pwValue && 'ErrorInput'}
              onChange={handleInput}
            />
            {/* id와 password가 입력되지 않았을 때 나타날 오류 */}
            {errors.pwValue && <p>비밀번호를 입력해주세요</p>}

            <Button onClick={loggedIn}>로그인</Button>
            <Join>
              <p>아직 셀러가 아니신가요?</p>
              <p>
                <Link to="/Signup">회원가입하기</Link>
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
