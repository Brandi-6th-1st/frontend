import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { AiOutlineLeft } from 'react-icons/ai';
import { AiOutlineRight } from 'react-icons/ai';

function PageRecord({
  filter,
  setFilter,
  sellerList,
  currentPage,
  setCurrentPage,
  sellerPerPage,
  handleRecordCount,
}) {
  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
    if (currentPage <= 1) {
      setCurrentPage(1);
    }
  };

  const hanleOffset = () => {
    if (currentPage !== 1) {
      const nextFilter = {
        ...filter,
        offset: currentPage * sellerPerPage,
      };
      setFilter(nextFilter);
    }
  };

  useEffect(() => {
    hanleOffset();
  }, [currentPage, sellerPerPage]);

  return (
    <Container>
      <Page>
        <span>Page</span>
        <PageButton onClick={handlePrevPage}>
          <AiOutlineLeft />
        </PageButton>
        <PageInput
          type='text'
          value={currentPage ? currentPage : 1}
          min='1'
          readOnly
        />
        <PageButton onClick={handleNextPage}>
          <AiOutlineRight />
        </PageButton>
        <p>
          of
          <span>
            {/* limit에 따른 보여질 페이지 수  */}
            {sellerList && Math.floor(sellerList.length / filter.limit)}
          </span>
        </p>
      </Page>
      <ViewRecords>
        <span>View</span>
        <Select value={sellerPerPage} onChange={handleRecordCount}>
          <option value='10'>10</option>
          <option value='20'>20</option>
          <option value='50'>50</option>
          <option value='100'>100</option>
          <option value='150'>150</option>
        </Select>
        <span>records</span>
      </ViewRecords>
      <FoundRecords>
        <span>Found Total</span>
        {/*total 계산*/}
        <span>{sellerList && sellerList.length}</span>
        <span>records</span>
      </FoundRecords>
    </Container>
  );
}

export default PageRecord;

const Container = styled.div`
  ${({ theme }) => theme.flex(null, 'center')}

  p {
    margin-right: 5px;
    font-size: 13px;
  }
`;

const Page = styled.div`
  display: flex;
  align-items: center;

  span {
    font-size: 13px;
    margin-right: 5px;
  }

  &:after {
    margin-right: 5px;
    content: '|';
  }
`;

const ViewRecords = styled.div`
  display: flex;
  align-items: center;

  span {
    font-size: 13px;
    margin-right: 5px;
  }

  &:after {
    margin-right: 5px;
    content: '|';
  }
`;

const PageButton = styled.button`
  margin-right: 5px;
  padding: 5px 10px;
  width: 27px;
  height: 30px;
  background-color: #fff;
  border: 1px solid #e5e5e5;
  border-radius: 3px;
  font-size: 12px;
`;

const PageInput = styled.input`
  margin: 0 5px;
  padding: 6px 10px;
  width: 45px;
  height: 30px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 13px;
  vertical-align: middle;
  align-items: center;
`;

const Select = styled.select`
  margin: 0 5px;
  padding: 2 10px;
  height: 30px;
  width: 80px;
  vertical-align: middle;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const FoundRecords = styled.div`
  display: flex;
  align-items: center;
  font-size: 13px;

  span {
    margin-right: 4px;
  }
`;
