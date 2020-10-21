import React, { Fragment } from 'react';
import styled from 'styled-components';
import LoginFooter from '../Login/LoginFooter';
import {
  TiUserOutline,
  TiLockClosedOutline,
  TiInputCheckedOutline,
  TiSortAlphabeticallyOutline,
} from 'react-icons/ti';
import { FiPhoneCall } from 'react-icons/fi';

export default function Signup() {
  return (
    <Container>
      <Content>
        <Logo alt="브랜디로고" src="/public/Images/logo2.png" />
        <Title>셀러 회원 가입</Title>
        <SignupBox>
          <SubTitle>정보입력</SubTitle>
          <Form>
            {/* 가입정보, 담당자정보, 셀러정보 세 부분을 map함수 이용하여 구현 */}
            {SIGNUP_INFO_LIST.map((info) => {
              const { id, name, title, inputList } = info;
              return (
                <Fragment>
                  {/* 담당자 정보에만 있는 첨부메시지 처리  */}
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
                  {/* 담당자 정보에만 있는 첨부메시지 처리  */}
                  {id === 2 ? (
                    <ExtraInfo fontSize="12px">
                      입점 신청 후 브랜디 담당자가 연락을 드릴 수 있으니 정확한
                      정보를 기입해주세요.
                    </ExtraInfo>
                  ) : null}
                </Fragment>
              );
            })}
          </Form>
          <ButtonGroup>
            <Button backgroundColor="#5bc0de" topLeft="4px" bottomLeft="4px">
              신청
            </Button>
            <Button backgroundColor="#d9534f" topRight="4px" bottomRight="4px">
              취소
            </Button>
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
`;

const SignupBox = styled.div`
  ${({ theme }) => theme.flex('center', 'center', 'column')};
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

const Form = styled.form`
  width: 100%;
`;

const InfoTitle = styled.div`
  display: flex;
  margin: 20px 0;
`;

const ExtraInfo = styled.div`
  color: #1e90ff;
  font-size: ${(props) => props.fontSize};
`;

const IconInput = styled.div`
  ${({ theme }) => theme.flex(null, 'center')}
  margin: 10px 0;
  padding: 13px 16px;
  width: 100%;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
`;

const Input = styled.input`
  margin-left: 10px;
`;

const ButtonGroup = styled.div`
  display: flex;
`;

const Button = styled.button`
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

const SIGNUP_INFO_LIST = [
  {
    id: 1,
    title: '가입 정보',
    inputList: [
      {
        name: 'id',
        type: 'text',
        icon: <TiUserOutline />,
        placeholder: '아이디',
      },
      {
        name: 'password',
        type: 'password',
        icon: <TiLockClosedOutline />,
        placeholder: '비밀번호',
      },
      {
        name: 'rePasswrod',
        type: 'password',
        icon: <TiInputCheckedOutline />,
        placeholder: '비밀번호 재입력',
      },
    ],
  },
  {
    id: 2,
    title: '담당자 정보',
    inputList: [
      {
        name: 'phone',
        type: 'text',
        icon: <FiPhoneCall />,
        placeholder: '핸드폰번호',
      },
    ],
  },
  {
    id: 3,
    title: '셀러 정보',
    inputList: [
      {
        name: 'sellerName',
        type: 'text',
        icon: <TiSortAlphabeticallyOutline />,
        placeholder: '셀러명 (상호)',
      },
      {
        name: 'englishSellerName',
        type: 'text',
        icon: <TiSortAlphabeticallyOutline />,
        placeholder: '영문 셀러명 (영문상호)',
      },
      {
        name: 'customerCenterContact',
        type: 'text',
        icon: <FiPhoneCall />,
        placeholder: '고객센터 전화번호',
      },
    ],
  },
];
