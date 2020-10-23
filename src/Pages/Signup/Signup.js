import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { ErrorMessage } from '@hookform/error-message';
import { useForm } from 'react-hook-form';
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
  const { register, errors, watch, handleSubmit } = useForm({ mode: 'all' });
  const onSubmit = (data) => console.log(data);

  return (
    <Container>
      <Content>
        <Logo alt="브랜디로고" src="/public/Images/logo2.png" />
        <Title>셀러 회원 가입</Title>
        <hr></hr>
        <SignupBox>
          <SubTitle>정보입력</SubTitle>
          <form onSubmit={handleSubmit(onSubmit)}>
            <InfoTitle>가입 정보</InfoTitle>
            <IconInput className={errors.id && 'ErrorInput'}>
              <TiUserOutline color={errors.id ? '#b94a48' : null} />
              <input
                name="id"
                type="text"
                placeholder="아이디"
                ref={register({
                  required: '필수 입력항목 입니다. ',
                  minLength: {
                    value: 5,
                    message: '아이디의 최소 길이는 5글자 입니다.',
                  },
                })}
              />
            </IconInput>
            {errors.id && <p>{errors.id.message}</p>}
            <IconInput className={errors.password && 'ErrorInput'}>
              <TiLockClosedOutline color={errors.password ? '#b94a48' : null} />
              <input
                name="password"
                type="password"
                placeholder="비밀번호"
                ref={register({
                  required: '필수 입력항목 입니다.',
                  pattern: {
                    value: /^.*(?=^.{8,20}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/,
                    message:
                      '비밀번호는 8~20글자의 영문대소문자, 숫자, 특수문자를 조합해야 합니다.',
                  },
                })}
              />
            </IconInput>
            {errors.password && <p>{errors.password.message}</p>}
            <IconInput className={errors.rePw && 'ErrorInput'}>
              <TiInputCheckedOutline color={errors.rePw ? '#b94a48' : null} />
              <input
                name="rePw"
                type="password"
                placeholder="비밀번호 재입력"
                ref={register({
                  validate: (value) =>
                    value === watch('password') ||
                    '비밀번호가 일치하지 않습니다',
                })}
              />
            </IconInput>
            {errors.rePw && <p>{errors.rePw.message}</p>}
            <InfoTitle>
              담당자 정보
              <ExtraInfo primary> (*실제 샵을 운영하시는 분)</ExtraInfo>
            </InfoTitle>
            <IconInput className={errors.phone && 'ErrorInput'}>
              <TiPhoneOutline color={errors.phone ? '#b94a48' : null} />
              <input
                name="phone"
                type="tell"
                placeholder="핸드폰번호"
                ref={register({
                  required: '필수 입력항목입니다.',
                })}
              />
            </IconInput>
            {errors.phone && <p>{errors.phone.message}</p>}
            <ExtraInfo>
              <AiOutlineWarning />
              입점 신청 후 브랜디 담당자가 연락을 드릴 수 있으니 정확한 정보를
              기입해주세요.
            </ExtraInfo>
            <InfoTitle>셀러 정보</InfoTitle>
            <IntputRadio>
              <label>
                <input name="seller" value="shoppingmall" type="radio" />
                쇼핑몰
              </label>
              <label>
                <input name="seller" value="market" type="radio" />
                마켓
              </label>
              <label>
                <input name="seller" value="roadshop" type="radio" />
                로드샵
              </label>
              <label>
                <input name="seller" value="designer" type="radio" />
                디자이너브랜드
              </label>
              <label>
                <input name="seller" value="general" type="radio" />
                제너럴브랜드
              </label>
              <label>
                <input name="seller" value="national" type="radio" />
                내셔널브랜드
              </label>
              <label>
                <input name="seller" value="beauty" type="radio" />
                뷰티
              </label>
            </IntputRadio>
            <IconInput className={errors.sellerName && 'ErrorInput'}>
              <TiSortAlphabeticallyOutline
                color={errors.sellerName ? '#b94a48' : null}
              />
              <input
                name="sellerName"
                placeholder="셀러명 (상호)"
                ref={register({
                  required: '필수 입력항목입니다.',
                })}
              />
            </IconInput>
            {errors.sellerName && <p>{errors.sellerName.message}</p>}
            <IconInput className={errors.engSellerName && 'ErrorInput'}>
              <TiSortAlphabeticallyOutline
                color={errors.engSellerName ? '#b94a48' : null}
              />
              <input
                name="engSellerName"
                placeholder="영문 셀러명 (영문상호)"
                ref={register({
                  required: '필수 입력항목입니다.',
                })}
              />
            </IconInput>
            {errors.engSellerName && <p>{errors.engSellerName.message}</p>}
            <IconInput className={errors.customerContact && 'ErrorInput'}>
              <TiPhoneOutline
                color={errors.customerContact ? '#b94a48' : null}
              />
              <input
                name="customerContact"
                placeholder="고객센터 전화번호"
                ref={register({
                  required: '필수 입력항목입니다.',
                })}
              />
            </IconInput>
            {errors.customerContact && <p>{errors.customerContact.message}</p>}
            {/*             
            {SIGNUP_INFO_LIST.map((info) => {
              const { id, name, title, inputList } = info;
              return (
                <Fragment>
                  {id === 2 ? (
                    <InfoTitle>
                      {title}
                      <ExtraInfo fontSize="14px">
                        (*실제 샵을 운영하시는 분)
                      </ExtraInfo>
                    </InfoTitle>
                  ) : (
                    <InfoTitle>{title}</InfoTitle>
                  )}
                  {inputList.map((input, i) => {
                    const { icon, type, placeholder } = input;
                    return (
                      <IconInput>
                        {icon}
                        <Input
                          name={name}
                          type={type}
                          placeholder={placeholder}
                        />
                      </IconInput>
                    );
                  })}
                  {id === 2 ? (
                    <ExtraInfo fontSize="12px">
                      입점 신청 후 브랜디 담당자가 연락을 드릴 수 있으니 정확한
                      정보를 기입해주세요.hsa
                    </ExtraInfo>
                  ) : null}
                </Fragment>
              );
            })} */}
            <ButtonGroup>
              <Button
                type="submit"
                value="신청"
                backgroundColor="#5bc0de"
                topLeft="4px"
                bottomLeft="4px"
              />

              <Button
                type="submit"
                value="취소"
                backgroundColor="#d9534f"
                topRight="4px"
                bottomRight="4px"
              />
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
  overflow: auto;
  background-color: #fff;
  hr {
    width: 100%;
    margin-bottom: 20px;
    border: 1px solid #e0dfdf;
  }
`;

const Logo = styled.img`
  margin: 0 auto 40px auto;
  width: 130px;
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
  display: flex;
  margin: 30px 0 5px 0;
  font-size: 18px;
  span {
    color: #1e90ff;
    font-size: 14px;
    vertical-align: center;
  }
`;

const ExtraInfo = styled.div`
  margin-top: 5px;
  display: flex;
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
  margin: 10px 0;
  padding: 13px 16px;
  width: 100%;
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
  display: flex;
  align-items: center;
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
  background-color: ${(props) => props.backgroundColor};
  border-top-left-radius: ${(props) => props.topLeft || 0};
  border-bottom-left-radius: ${(props) => props.bottomLeft || 0};
  border-top-right-radius: ${(props) => props.topRight || 0};
  border-bottom-right-radius: ${(props) => props.bottomRight || 0};
  font-size: 14px;
  text-align: center;
  color: #fff;
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
