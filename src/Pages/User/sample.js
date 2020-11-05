import React, { Fragment, useState } from 'react';
import styled from 'styled-components';
import { AiOutlineRight } from 'react-icons/ai';

function PagenationPannel() {
  return (
    <Container>
      <p>Page</p>
      <PageButton>
        <AiOutlineLeft />
      </PageButton>
      <PageInput type='text' />
      <PageButton>
        <AiOutlineRight />
      </PageButton>
      <p>of 827 |</p>
      <ViewRecords>
        <p>View</p>
        <Select name=''>
          <option>10</option>
          <option>20</option>
          <option>50</option>
          <option>100</option>
          <option>150</option>
        </Select>
      </ViewRecords>
    </Container>
  );
}

export default PagenationPannel;

const Container = styled.div`
  ${({ theme }) => theme.flex(null, 'center')}
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

const PageInput = styled.input``;

const ViewRecords = styled.div``;

const Select = styled.select`
  padding: 2px 10px;
  height: 30px;
  line-height: 28px;
  vertical-align: middle;
`;
