import React, { useState } from 'react';
import styled from 'styled-components';
import BasicInfo from './BasicInfo';
import MoreInfo from './MoreInfo';
import { AiOutlineHome } from 'react-icons/ai';
import { FaUserAlt } from 'react-icons/fa';

function UserManagement() {
  return (
    <Container>
      <PageTitle>
        셀러정보 관리<small> 셀러 정보 조회 / 수정</small>
      </PageTitle>
      <PageBar>
        <AiOutlineHome />
        <p>회원관리 > 셀러정보 관리 > 셀러정보 조회 / 수정</p>
      </PageBar>
      <BasicInfo />
      <MoreInfo />
    </Container>
  );
}

export default UserManagement;

const Container = styled.div`
  width: 100%;
  margin-top: 50px;
  padding: 25px 20px 20px 20px;
  background-color: #fafafa;
  border-radius: 0 0 0 4px;
`;

const PageTitle = styled.h3`
  margin-bottom: 15px;
  color: #666;
  font-weight: 300;
`;

const PageBar = styled.div`
  ${({ theme }) => theme.flex(null, 'center')}
  margin: 0 -20px 10px -20px;
  padding-left: 20px;
  background-color: #eee;
  font-size: 13px;
  line-height: 1.5;
  p {
    margin-left: 5px;
  }
`;

const BasicInfoBox = styled.div`
  margin-bottom: 25px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const InfoTitle = styled.div`
  height: 38px;
  padding: 10px 10px 2px 10px;
  background-color: #eee;
  font-size: 13px;
`;

const InfoBody = styled.div`
  padding: 10px;
  span {
    color: red;
  }
  button {
    background-color: #c8302c;
    color: white;
  }
`;

const Table = styled.table`
  width: 100%;
  border: 1px solid #ddd;
  line-height: 1.5;
  border-collapse: collapse;
  font-size: 13px;
  tbody {
    vertical-align: middle;
  }
  tr {
    &:nth-child(odd) {
      background-color: #f9f9f9;
    }
  }
  th,
  td {
    border: 1px solid #ddd;
  }
  td {
    padding: 8px;
    vertical-align: middle;
    &:first-child {
      width: 252px;
    }
  }
`;

const ImgUpload = styled.div``;

const ImgPreview = styled.div`
  width: 130px;
  height: 100px;
  margin-bottom: 20px;
  vertical-align: middle;
  text-align: center;
  border: 1px solid #eee;
  background-color: #fff;
  img {
    width: 90px;
    height: 90px;
  }
`;

const BaseImg = styled.img`
  width: 90px;
  height: 90px;
`;

const ImgAdd = styled.div`
  margin-bottom: 10px;
  label {
    padding: 10px;
    border: 1px solid #eee;
    border-radius: 4px;
    background-color: #fff;
  }
  input {
    width: 1px;
    height: 1px;
    overflow: hidden;
  }
`;
