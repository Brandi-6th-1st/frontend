import React from 'react';
import styled from 'styled-components';
import DataNotification from '../Data/DataNotification';
import { AiOutlineNotification } from 'react-icons/ai';

export default function Notice() {
  return (
    <StaticsBox>
      <StaticsStatus>
        <StaticsTitle>
          <AiOutlineNotification />
          <span>공지사항</span>
        </StaticsTitle>
        <StaticsContent>
          {DataNotification.map((question, idx) => {
            return (
              <CustomerQnA key={idx}>
                <NotiNum>{question.categoryNum}</NotiNum>
                <NotiCategory>{question.category}</NotiCategory>
                <NotiTitle>{question.categoryTitle}</NotiTitle>
                <NotiWriter>{question.writer}</NotiWriter>
                <NotiRegistDate>{question.registData}</NotiRegistDate>
              </CustomerQnA>
            );
          })}
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

const StaticsContent = styled.div`
  height: 100%;
  ul {
    display: flex;
    margin: 0px;
    padding: 0px;
  }
`;

const CustomerQnA = styled.ul`
  display: flex;
  margin: 0px;
  padding: 0px;
  border-top: 1px solid #dddddd;

  li {
    font-size: 13px;
  }
`;

const NotiNum = styled.li`
  text-align: center;
  padding: 8px;
  width: 10%;
`;

const NotiCategory = styled(NotiNum)`
  width: 24%;
`;

const NotiTitle = styled(NotiNum)`
  width: 24%;
`;

const NotiWriter = styled(NotiNum)`
  width: 18%;
`;

const NotiRegistDate = styled(NotiNum)`
  width: 24%;
`;
