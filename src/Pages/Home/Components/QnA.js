import React from 'react';
import styled from 'styled-components';
import DataQnA from '../Data/DataQnA';
import { GoListUnordered } from 'react-icons/go';

export default function QnA() {
  return (
    <StaticsBox>
      <StaticsStatus>
        <StaticsTitle>
          <GoListUnordered />
          <span>Q&A 미답변</span>
        </StaticsTitle>
        <StaticsQnA>
          <ul>
            <li>전체</li>
            <li>미답변</li>
            <li>답변</li>
            <NullLi></NullLi>
          </ul>
        </StaticsQnA>
        <StaticsCategory>
          <ul>
            <QnANickName>회원 닉네임</QnANickName>
            <QnAQuestion>질문</QnAQuestion>
            <QnATitle>상품명</QnATitle>
            <QnARegist>등록일</QnARegist>
          </ul>
        </StaticsCategory>
        <StaticsContent>
          {DataQnA.map((question) => {
            return (
              <SellerNoti>
                <QnANickName>{question.nickname}</QnANickName>
                <QnAQuestion>{question.question}</QnAQuestion>
                <QnATitle>{question.itemTitle}</QnATitle>
                <QnARegist>{question.registration}</QnARegist>
              </SellerNoti>
            );
          })}
          {/* <CustomerQnA>
          <QnANickName>회원 닉네임</QnANickName>
          <QnAQuestion>질문</QnAQuestion>
          <QnATitle>상품명</QnATitle>
          <QnARegist>등록일</QnARegist>
        </CustomerQnA> */}
        </StaticsContent>
      </StaticsStatus>
    </StaticsBox>
  );
}

const StaticsBox = styled.div`
  display: inline-block;
  width: 50%;
  min-height: 1px;
  padding: 0px 10px;
`;

const StaticsStatus = styled.div`
  border: 1px solid #dddddd;
`;

const StaticsTitle = styled.div`
  padding: 10px 15px;
  background-color: #f5f5f5;
  border-bottom: 1px solid #dddddd;

  svg {
    vertical-align: bottom;
    color: gray;
  }

  span {
    padding-left: 5px;
    font-size: 13px;
    color: gray;
  }
`;

const StaticsQnA = styled.div`
  ul {
    display: flex;
    margin: 0px;
    padding: 0px;
    height: 100%;

    li {
      width: 18%;
      padding: 10px 15px;
      font-size: 13px;
      text-align: center;
      border-top: 1px solid #dddddd;
      border-right: 1px solid #dddddd;
      border-left: 1px solid #dddddd;
    }
  }
`;

const NullLi = styled.div`
  width: 100%;
  border-bottom: 1px solid #dddddd;
`;

const StaticsCategory = styled.div`
  ul {
    display: flex;
    margin: 0px;
    padding: 0px;
  }
`;

const StaticsContent = styled.div`
  height: 100%;
  ul {
    display: flex;
    margin: 0px;
    padding: 0px;
  }
`;

const SellerNoti = styled.ul`
  display: flex;
  margin: 0px;
  padding: 0px;
  border-top: 1px solid #dddddd;

  li {
    font-size: 13px;
  }
`;

const QnANickName = styled.li`
  text-align: center;
  padding: 8px;
  font-size: 13px;
  width: 20%;
`;

const QnAQuestion = styled(QnANickName)`
  width: 36%;
`;

const QnATitle = styled(QnANickName)`
  width: 20%;
`;

const QnARegist = styled(QnANickName)`
  width: 24%;
`;
