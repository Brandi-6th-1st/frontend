import React, { useState } from 'react';
import styled from 'styled-components';
import { AiOutlineUnorderedList } from 'react-icons/ai';
import { AiOutlineLeft } from 'react-icons/ai';
import { AiOutlineRight } from 'react-icons/ai';

function SellerList() {
  const [currentPage, setCurrentPage] = useState(1);
  return (
    <ListBox>
      <Title>
        <AiOutlineUnorderedList />
        <p>셀러 회원 리스트</p>
      </Title>
      <PageRow>
        <PagenationPannel>
          <p>Page</p>
          <PageButton>
            <AiOutlineLeft />
          </PageButton>
          <PageInput value={currentPage} />
          <PageButton>
            <AiOutlineRight />
          </PageButton>
          <p>of 827 | view</p>
        </PagenationPannel>
      </PageRow>
      <ListBody>
        <Table>
          <tbody></tbody>
        </Table>
      </ListBody>
    </ListBox>
  );
}

export default SellerList;

const ListBox = styled.div`
  margin-bottom: 25px;
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

const PageRow = styled.div`
  display: flex;
`;

const PagenationPannel = styled.div`
  display: flex;
  align-items: center;
  p {
    margin-right: 5px;
    font-size: 13px;
  }
`;

const PageButton = styled.div`
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
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  text-align: center;
`;

const ListBody = styled.div`
  padding: 10px;
`;

const Table = styled.table``;
