import React from 'react';
import styled from 'styled-components';
import PageRecord from './PageRecord';
import SellerTable from './SellerTable';
import { AiOutlineUnorderedList } from 'react-icons/ai';

function SellerList({
  sellerList,
  setSellerList,
  filter,
  setFilter,
  currentPage,
  setCurrentPage,
  sellerPerPage,
  handleSellerData,
  handleRecordCount,
  getSellerData,
  handleActionInfo,
  handleNextPage,
  handlePrevPage,
}) {
  return (
    <ListBox>
      <Title>
        <AiOutlineUnorderedList />
        <p>셀러 회원 리스트</p>
      </Title>
      <Body>
        <PageRecord
          sellerList={sellerList}
          setSellerList={setSellerList}
          filter={filter}
          setFilter={setFilter}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          sellerPerPage={sellerPerPage}
          handleRecordCount={handleRecordCount}
          handleNextPage={handleNextPage}
          handlePrevPage={handlePrevPage}
        />
        <Table>
          <SellerTable
            sellerList={sellerList}
            filter={filter}
            setFilter={setFilter}
            handleSellerData={handleSellerData}
            getSellerData={getSellerData}
            handleActionInfo={handleActionInfo}
          />
        </Table>
        <PageRecord
          sellerList={sellerList}
          setSellerList={setSellerList}
          filter={filter}
          setFilter={setFilter}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          sellerPerPage={sellerPerPage}
          handleRecordCount={handleRecordCount}
          handleNextPage={handleNextPage}
          handlePrevPage={handlePrevPage}
        />
      </Body>
    </ListBox>
  );
}

export default SellerList;

const ListBox = styled.div`
  margin-bottom: 25px;
  width: 100%;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const Title = styled.div`
  display: flex;
  height: 38px;
  padding: 10px 10px 2px 10px;
  background-color: #eee;
  font-size: 13px;

  svg {
    margin-right: 5px;
    width: 13px;
    height: 13px;
  }
`;

const Body = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 10px;
`;

const Table = styled.div`
  width: 100%;
`;
