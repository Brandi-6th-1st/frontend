import React, { useState } from 'react';
import Validate from './Validate';
import styled, { css } from 'styled-components';
import LoginFooter from '../Login/LoginFooter';
import {
  TiUserOutline,
  TiLockClosedOutline,
  TiInputCheckedOutline,
  TiSortAlphabeticallyOutline,
} from 'react-icons/ti';
import { FiPhoneCall } from 'react-icons/fi';
import { AiOutlineWarning } from 'react-icons/ai';

export default function Signup2() {
  const [values, setValues] = useState({
    id: '',
    password: '',
    rePassword: '',
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  return (
    <Container>
      <Content>
        <Logo alt="브랜디로고" src="/public/Images/logo2.png" />
        <Title>셀러 회원 가입</Title>
        <hr></hr>
        <SignupBox>
          <SubTitle>정보입력</SubTitle>
          <form>
            <InfoTitle>가입 정보</InfoTitle>
            <IconInput>
              <TiUserOutline />
              <input
                name="id"
                value={values.id}
                placeholder="아이디"
                className={errors.id && 'errorInput'}
              />
              {errors.id && <span className="errorMessage">{errors.id}</span>}
            </IconInput>
            <IconInput>
              <TiLockClosedOutline />
              <input
                name="password"
                value={values.password}
                type="password"
                placeholder="비밀번호"
              />
            </IconInput>
            <IconInput>
              <TiInputCheckedOutline />
              <input
                name="rePassword"
                value={values.rePassword}
                type="password"
                placeholder="비밀번호 재입력"
              />
            </IconInput>

            <InfoTitle>
              담당자 정보
              <ExtraInfo primary>(*실제 샵을 운영하시는 분)</ExtraInfo>
            </InfoTitle>
            <IconInput>
              <FiPhoneCall />
              <input name="phone" type="tell" placeholder="핸드폰번호" />
            </IconInput>

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
            <IconInput>
              <TiSortAlphabeticallyOutline />
              <input name="sellerName" placeholder="셀러명 (상호)" />
            </IconInput>

            <IconInput>
              <TiSortAlphabeticallyOutline />
              <input
                name="engSellerName"
                placeholder="영문 셀러명 (영문상호)"
              />
            </IconInput>

            <IconInput>
              <FiPhoneCall />
              <input name="customerContact" placeholder="고객센터 전화번호" />
            </IconInput>

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
          </form>
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
        </SignupBox>
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
  ${({ theme }) => theme.flex('center', 'center', 'column')};
  width: 500px;
  margin: 0 auto;
  padding: 30px;
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
  input {
    margin-left: 10px;
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
  display: flex;
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
