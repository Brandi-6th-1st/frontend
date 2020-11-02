import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import regeneratorRuntime from 'regenerator-runtime';
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';
import { sellerNav, masterNav } from '../../Store/Reducer/sideNav';
import { saveNav } from '../../Store/Reducer/nav';
import { saveFilter } from '../../Store/Reducer/filter';
import { isMaster } from '../../Store/Reducer/userInfo';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import API from '../../config';
import LoginFooter from './LoginFooter';
export default function Login() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [inputValue, setInputValue] = useState({
    idValue: 'soojsooj',
    pwValue: 'PW1!soojsooj',
  });

  const { register, handleSubmit, errors } = useForm();

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
  //id:
  // soojsooj
  //pw:
  // PW1!soojsooj

  //seller
  // id: seller1
  //pw: PW1!seller1

  const userInfo = useSelector(({ userInfo }) => userInfo);

  // store에 있는 마스터 or 셀러 필터를 가져온다.
  const { filter_list } = useSelector(({ filter }) => ({
    filter_list: filter.filter_list,
    // filter_list: filter.filter_list,
  }));

  const { nav_list } = useSelector(({ nav }) => ({
    nav_list: nav.nav_list,
    // filter_list: filter.filter_list,
  }));

  const loggedIn = async (e) => {
    // e.preventDefault();
    console.log('클릭', userInfo);
    try {
      const result = await axios.post(
        `http://10.251.1.180:5000/account/signin`,
        { identification: idValue, password: pwValue },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const is_master = await result.data.success.is_master;
      const nav_list = await result.data.success.nav_list;
      const filter_list = await result.data.success.filter_list;
      // if (
      //   result.data.success.filter_list &&
      //   result.data.success.nav_list &&
      //   result.data.success.is_master
      // ) {
      //   dispatch(saveFilter(nav_list));
      //   dispatch(saveNav(filter_list));
      //   dispatch(isMaster(is_master));
      // }

      console.log('2', userInfo);
      console.log('2', filter_list);
      console.log('2', nav_list);

      if (result.data.success) {
        localStorage.setItem('token', result.data.success.Authorization);
        dispatch(saveFilter(nav_list));
        dispatch(saveNav(filter_list));
        dispatch(isMaster(is_master));
        history.push('/home');
      }
    } catch (err) {
      console.log(err);
    }
    // postData();
    // console.log(result);
    // dispatch(isMaster(true));
    // dispatch(saveNav());
    // dispatch(saveFilter());

    // const test = [1, 2, 3];

    // dispatch(saveNav(test));
    // console.log(nav);
    // const getNav = () => {
    //   dispatch(saveNav([1, 2, 3]));
    // };
    // getNav();
    // console.log(nav);

    // console.log(result);
    // try {
    //   fetch(`http://192.168.7.31:5000/account/signin`, {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //       identification: idValue,
    //       password: pwValue,
    //     }),
    //   })
    //     // .then((response) => console.log(response));
    //     .then((response) => response.json())
    //     .then((result) => console.log(result));
    // } catch (err) {
    //   console.log(err);
    // }
    // .then((response) => {
    //   if (response.token) {
    //     localStorage.setItem('wtw-token', response.token);
    //   }
    // });
    // .then((result) => console.log('result: ', result));
    // .then((result) => {
    //   if (result.data.Authorization) {
    //     localStorage.setItem('token', result.data.Authorization);
    //     alert('로그인 성공');
    //     // history.push('./');
    //   } else if (result.data.message === 'UNAUTHORIZED') {
    //     alert('아이디와 비밀번호를 확인해주세요');
    //   }
    // });
  };

  const sideNav = useSelector(({ sideNav }) => sideNav);

  console.log(sideNav);
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

            <Button onClick={loggedIn}>로그인</Button>
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
