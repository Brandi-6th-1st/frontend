import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { ErrorMessage } from '@hookform/error-message';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import InputMask from 'react-input-mask';
import LoginFooter from '../Login/LoginFooter';
import {
  TiUserOutline,
  TiLockClosedOutline,
  TiPhoneOutline,
  TiInputCheckedOutline,
  TiSortAlphabeticallyOutline,
} from 'react-icons/ti';
import { AiOutlineWarning } from 'react-icons/ai';

export default function Signup() {
  const [signupForm, setSignrupForm] = useState({
    idValue: '',
    pwValue: '',
    accountTypeValue: 2,
    contactValue: '',
    attributeValue: '',
    koNameValue: '',
    enNameValue: '',
    csContactValue: '',
    statusValue: 1,
  });

  const history = useHistory();
  const { register, errors, watch, handleSubmit } = useForm({ mode: 'all' });
  const {
    idValue,
    pwValue,
    accountTypeValue,
    contactValue,
    attributeValue,
    koNameValue,
    enNameValue,
    csContactValue,
    statusValue,
  } = signupForm;

  const onSubmit = (data) => {
    console.log(data);
    if (confirm('입력하신 정보로 셀러신청을 하시겠습니까?') === true) {
      history.push('/');
    }
  };

  function handleCancelBtn() {
    if (confirm('브랜디 회원가입을 취소하시겠습니까?') === true) {
      history.push('/');
    } else {
      return false;
    }
  }

  const handleSignupForm = (e) => {
    const nextSignupForm = {
      ...signupForm,
      [e.target.name]: e.target.value,
    };
    setSignrupForm(nextSignupForm);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const result = axios.post(
      `http://10.58.7.141:5000/account/signin`,
      {
        identification: idValue,
        password: pwValue,
        account_type_id: accountTypeValue,
        contact: contactValue,
        attribute_id: attributeValue,
        korean_name: koNameValue,
        english_name: enNameValue,
        cs_contact: csContactValue,
        status_id: statusValue,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 3000,
      }
    );
  };

  // const onSubmitHandler = (e) => {
  //   e.preventDefault();
  //   if (
  //     id &&
  //     password &&
  //     phone &&
  //     sellerAttribute &&
  //     sellerEnName &&
  //     sellerKoName
  //   ) {
  //     let body = signupForm;
  //     dispatch(registerUser(body)).then((res) => {
  //       alert('가입이 정상적으로 완료되었습니다');
  //       props.history.push('/');
  //     });
  //   } else {
  //     alert('비밀번호가 일치하지 않습니다');
  //   }
  // };

  console.log(signupForm);
  return (
    <Container>
      <Content>
        <Logo alt='브랜디로고' src='/public/Images/logo2.png' />
        <Title>셀러 회원 가입</Title>
        <hr></hr>
        <SignupBox>
          <SubTitle>정보입력</SubTitle>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* <form> */}
            <InfoTitle>가입 정보</InfoTitle>
            {/*id를 입력하지 않거나 5글자 미만으로 입력한 경우, border에 색을 주기 위해 className 활용*/}
            <IconInput className={errors.id && 'ErrorInput'}>
              {/* id에 에러가 발생할 경우, */}
              <TiUserOutline color={errors.id ? '#b94a48' : null} />
              <input
                name='idValue'
                type='text'
                placeholder='아이디'
                ref={register({
                  required: '필수 입력항목 입니다. ',
                  minLength: {
                    value: 5,
                    message: '아이디의 최소 길이는 5글자 입니다.',
                  },
                })}
                onChange={handleSignupForm}
              />
            </IconInput>
            {errors.id && <p>{errors.id.message}</p>}
            <IconInput className={errors.password && 'ErrorInput'}>
              <TiLockClosedOutline color={errors.password ? '#b94a48' : null} />
              <input
                name='pwValue'
                type='password'
                placeholder='비밀번호'
                ref={register({
                  required: '필수 입력항목 입니다.',
                  //패스워드 최소 8글자 최대 20글자, 영문 대소문자, 특수문자
                  pattern: {
                    value: /^.*(?=^.{8,20}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/,
                    message:
                      '비밀번호는 8~20글자의 영문대소문자, 숫자, 특수문자를 조합해야 합니다.',
                  },
                })}
                onChange={handleSignupForm}
              />
            </IconInput>
            {errors.password && <p>{errors.password.message}</p>}
            <IconInput className={errors.rePw && 'ErrorInput'}>
              <TiInputCheckedOutline color={errors.rePw ? '#b94a48' : null} />
              <input
                name='rePw'
                type='password'
                placeholder='비밀번호 재입력'
                ref={register({
                  validate: (value) =>
                    value === watch('pwValue') ||
                    '비밀번호가 일치하지 않습니다',
                })}
                onChange={handleSignupForm}
              />
            </IconInput>
            {errors.rePw && <p>{errors.rePw.message}</p>}
            <InfoTitle>
              담당자 정보
              <ExtraInfo primary> (*실제 샵을 운영하시는 분)</ExtraInfo>
            </InfoTitle>
            <IconInput className={errors.phone && 'ErrorInput'}>
              <TiPhoneOutline color={errors.phone ? '#b94a48' : null} />
              <InputMask
                mask='999-9999-9999'
                name='contactValue'
                type='tel'
                placeholder='핸드폰번호'
                ref={register({
                  required: '필수 입력항목입니다.',
                })}
                onChange={handleSignupForm}
              />
            </IconInput>
            {errors.phone && <p>{errors.phone.message}</p>}
            <ExtraInfo>
              <AiOutlineWarning />
              입점 신청 후 브랜디 담당자가 연락을 드릴 수 있으니 정확한 정보를
              기입해주세요.
            </ExtraInfo>
            <InfoTitle>셀러 정보</InfoTitle>
            {/* <IntputRadio onClick={handleRadioValue}> */}
            <IntputRadio onChange={handleSignupForm}>
              <label>
                <input
                  name='attributeValue'
                  value='shoppingmall'
                  type='radio'
                  defaultChecked='checked'
                  ref={register()}
                />
                쇼핑몰
              </label>
              <label>
                <input
                  name='attributeValue'
                  value='market'
                  type='radio'
                  ref={register()}
                />
                마켓
              </label>
              <label>
                <input
                  name='attributeValue'
                  value='roadshop'
                  type='radio'
                  ref={register()}
                />
                로드샵
              </label>
              <label>
                <input
                  name='attributeValue'
                  value='designer'
                  type='radio'
                  ref={register()}
                />
                디자이너브랜드
              </label>
              <label>
                <input
                  name='attributeValue'
                  value='general'
                  type='radio'
                  ref={register()}
                />
                제너럴브랜드
              </label>
              <label>
                <input
                  name='attributeValue'
                  value='national'
                  type='radio'
                  ref={register()}
                />
                내셔널브랜드
              </label>
              <label>
                <input
                  name='attributeValue'
                  value='beauty'
                  type='radio'
                  ref={register()}
                />
                뷰티
              </label>
            </IntputRadio>
            <IconInput className={errors.sellerName && 'ErrorInput'}>
              <TiSortAlphabeticallyOutline
                color={errors.sellerName ? '#b94a48' : null}
              />
              <input
                name='koNameValue'
                placeholder='셀러명 (상호)'
                ref={register({
                  required: '필수 입력항목입니다.',
                  pattern: {
                    value: /^[가-힣a-zA-Z0-9+]+$/,
                    message: '한글,영문,숫자만 입력해주세요.',
                  },
                })}
                onChange={handleSignupForm}
              />
            </IconInput>
            {errors.sellerName && <p>{errors.sellerName.message}</p>}
            <IconInput className={errors.engSellerName && 'ErrorInput'}>
              <TiSortAlphabeticallyOutline
                color={errors.engSellerName ? '#b94a48' : null}
              />
              <input
                name='enNameValue'
                placeholder='영문 셀러명 (영문상호)'
                ref={register({
                  required: '필수 입력항목입니다.',
                  pattern: {
                    value: /^[A-Za-z0-9+]*$/,
                    message: '셀러 영문명은 소문자만 입력가능합니다.',
                  },
                })}
                onChange={handleSignupForm}
              />
            </IconInput>
            {errors.engSellerName && <p>{errors.engSellerName.message}</p>}
            <IconInput className={errors.customerContact && 'ErrorInput'}>
              <TiPhoneOutline
                color={errors.customerContact ? '#b94a48' : null}
              />
              <input
                name='csContactValue'
                placeholder='고객센터 전화번호'
                ref={register({
                  required: '필수 입력항목입니다.',
                })}
                onChange={handleSignupForm}
              />
            </IconInput>
            {errors.customerContact && <p>{errors.customerContact.message}</p>}
            <ButtonGroup>
              <Button primary onClick={onSubmitHandler} value='신청' />
              <Button readOnly value='취소' onClick={handleCancelBtn} />
            </ButtonGroup>
          </form>
        </SignupBox>
      </Content>
      <LoginFooter />
    </Container>
  );
}

const Container = styled.div`
  height: 100%;
  background-color: #fafafa;
`;

const Content = styled.div`
  ${({ theme }) => theme.flex('center', 'center', 'column')};
  width: 500px;
  height: auto;
  margin: 0 auto;
  padding: 30px;
  background-color: #fff;
  overflow: auto;

  hr {
    width: 100%;
    margin-bottom: 20px;
    border: 1px solid #e0dfdf;
  }
`;

const Logo = styled.img`
  width: 130px;
  margin: 0 auto 40px auto;
`;

const Title = styled.h3`
  width: 100%;
  margin-top: 20px;
  margin-bottom: 20px;
  text-align: center;
  font-size: 24px;
  font-weight: 100;
`;

const SignupBox = styled.div`
  ${({ theme }) => theme.flex('center', 'center', 'column')};
  width: 100%;

  p {
    margin-left: 5px;
    margin-bottom: 10px;
    font-size: 12px;
    font-weight: bold;
    color: #b94a48;
  }
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

const InfoTitle = styled.div`
  ${({ theme }) => theme.flex(null, 'center')};
  margin: 30px 0 5px 0;
  font-size: 18px;

  span {
    color: #1e90ff;
    font-size: 14px;
    vertical-align: center;
  }
`;

const ExtraInfo = styled.div`
  display: flex;
  margin-left: 5px;
  color: #1e90ff;
  font-size: 12px;
  ${(props) =>
    props.primary &&
    css`
      font-size: 14px;
    `};
`;

const IconInput = styled.div`
  ${({ theme }) => theme.flex(null, 'center')}
  width: 100%;
  margin: 10px 0;
  padding: 13px 16px;
  border: 1px solid #e5e5e5;
  border-radius: 8px;

  svg {
    width: 18px;
    height: 18px;
  }

  input {
    margin-left: 10px;
  }
  &.ErrorInput {
    border: 1px solid #b94a48;
  }
`;

const IntputRadio = styled.div`
  ${({ theme }) => theme.flex(null, 'center')}
  flex-wrap: wrap;
  font-size: 13px;
  line-height: 1.4;
  label {
    margin-right: 8px;
    input {
      margin-right: 5px;
    }
  }
`;

const ButtonGroup = styled.div`
  ${({ theme }) => theme.flex('center')}
  margin-top: 20px;
`;

const Button = styled.input`
  padding: 6px 12px;
  width: 49px;
  background-color: #d9534f;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  font-size: 14px;
  text-align: center;
  color: #fff;
  ${(props) =>
    props.primary &&
    css`
      background-color: #5bc0de;
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    `};
`;

const SIGNUP_SELLER_LIST = [
  '쇼핑몰',
  '마켓',
  '로드샵',
  '디자이너브랜드',
  '제너럴브랜드',
  '내셔널브랜드',
  '뷰티',
];

// const SIGNUP_INFO_LIST = [
//   {
//     id: 1,
//     title: '가입 정보',
//     inputList: [
//       {
//         name: 'id',
//         type: 'text',
//         icon: <TiUserOutline />,
//         placeholder: '아이디',
//       },
//       {
//         name: 'password',
//         type: 'password',
//         icon: <TiLockClosedOutline />,
//         placeholder: '비밀번호',
//       },
//       {
//         name: 'rePasswrod',
//         type: 'password',
//         icon: <TiInputCheckedOutline />,
//         placeholder: '비밀번호 재입력',
//       },
//     ],
//   },
//   {
//     id: 2,
//     title: '담당자 정보',
//     inputList: [
//       {
//         name: 'phone',
//         type: 'text',
//         icon: <FiPhoneCall />,
//         placeholder: '핸드폰번호',
//       },
//     ],
//   },
//   {
//     id: 3,
//     title: '셀러 정보',
//     inputList: [
//       {
//         name: 'sellerName',
//         type: 'text',
//         icon: <TiSortAlphabeticallyOutline />,
//         placeholder: '셀러명 (상호)',
//       },
//       {
//         name: 'englishSellerName',
//         type: 'text',
//         icon: <TiSortAlphabeticallyOutline />,
//         placeholder: '영문 셀러명 (영문상호)',
//       },
//       {
//         name: 'customerCenterContact',
//         type: 'text',
//         icon: <FiPhoneCall />,
//         placeholder: '고객센터 전화번호',
//       },
//     ],
//   },
// ];
