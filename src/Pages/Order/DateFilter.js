import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import styled from 'styled-components';
import './datepick.css';

export default function DateFilter({ handleStartDate, handleEndDate }) {
  return (
    <InquiryperiodBox>
      <SelectPeriod
        selected={searchDate.startDate}
        onChange={(date) => handleStartDate(date)}
        dateFormat="yyyy-MM-dd"
        placeholderText="클릭해주세요."
        shouldCloseOnSelect={false}
      />
      <span>~</span>
      <SelectPeriod
        selected={searchDate.endDate}
        onChange={(date) => handleEndDate(date)}
        dateFormat="yyyy-MM-dd"
        placeholderText="클릭해주세요."
        shouldCloseOnSelect={false}
      />
    </InquiryperiodBox>
  );
}

const InquiryperiodBox = styled.div`
  ${({ theme }) => theme.flex('center', 'center')};
  display: table;
  width: 22%;
  height: 34px;
  margin: 0 15px;
  background: white;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  span {
    display: table-cell;
    padding: 8px 12px;
    background: #e5e5e5;
    text-align: center;
  }
`;

const SelectPeriod = styled(DatePicker)`
  text-align: center;
  font-size: 14px;
  cursor: pointer;
`;
