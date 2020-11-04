import React from 'react';
import styled from 'styled-components';
import SellerList from './SellerList';
import { AiOutlineHome } from 'react-icons/ai';
import { AiOutlineRight } from 'react-icons/ai';

function AccountManagementTitle({
  sellerList,
  filter,
  setFilter,
  currentPage,
  setCurrentPage,
  handleSellerData,
}) {
  return (
    <Container>
      <PageTitle>
        셀러 계정 관리<small> 셀러 회원 목록 / 관리</small>
      </PageTitle>
      <PageBar>
        <AiOutlineHome />
        <p>회원관리</p>
        <AiOutlineRight />
        <p>셀러 계정 관리</p>
        <AiOutlineRight />
        <p>셀러 회원 리스트</p>
      </PageBar>
      <ABC>
        <SellerList
          sellerList={sellerList}
          filter={filter}
          setFilter={setFilter}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          handleSellerData={handleSellerData}
        />
      </ABC>
    </Container>
  );
}

export default AccountManagementTitle;

const Container = styled.div`
  /* width: 100%; */
  margin-top: 50px;
  padding: 25px 20px 20px 20px;
  background-color: #fafafa;
  border-radius: 0 0 0 4px;
  flex: 1;
  width: calc(100% - 215px);
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

const ABC = styled.div`
  width: calc(100%-215px);
  flex: 1;
`;
