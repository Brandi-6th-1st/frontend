import React from 'react';
import styled from 'styled-components';
import TimePicker from 'react-time-picker';
import Nav from '../../Components/Nav/Nav';
import { AiOutlineHome } from 'react-icons/ai';

export default function User() {
  return (
    <Container>
      <Nav />
      <PageTitle>
        셀러정보관리 <small>셀러 정보 조회 / 수정</small>
      </PageTitle>
      <PageBar>
        <AiOutlineHome />
      </PageBar>
      <TimePicker />
    </Container>
  );
}

const Container = styled.div``;

const PageTitle = styled.div`
  color: #666;
`;

const PageBar = styled.div``;
