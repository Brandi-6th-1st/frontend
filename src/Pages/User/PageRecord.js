import React from 'react';
import styled from 'styled-components';
import { AiOutlineLeft } from 'react-icons/ai';
import { AiOutlineRight } from 'react-icons/ai';

function PageRecord() {
  return (
    <Container>
      <Page>
        <span>Page</span>
        <PageButton>
          <AiOutlineLeft />
        </PageButton>
        <PageInput type='text' defaultValue='1' />
        <PageButton>
          <AiOutlineRight />
        </PageButton>
        <span>of 55</span>
      </Page>
      <ViewRecords>
        <span>View</span>
        <Select>
          <option selected>10</option>
          <option>20</option>
          <option>50</option>
          <option>100</option>
          <option>150</option>
        </Select>
        <span>records</span>
      </ViewRecords>
      <FoundRecords>
        <span>Found Total</span>
        <span>8,219</span>
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
