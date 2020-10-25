import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import styled from 'styled-components';
import './datepick.css';

export default function DateFilter() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  return (
    <div style={{ width: '300px' }}>
      <InquiryperiodBox>
        <SelectPeriod
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          dateFormat="yyyy-MM-dd"
          placeholderText="클릭해주세요."
          shouldCloseOnSelect={false}
        />
        <span>~</span>
        <SelectPeriod
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          dateFormat="yyyy-MM-dd"
          placeholderText="클릭해주세요."
          shouldCloseOnSelect={false}
        />
      </InquiryperiodBox>
    </div>
  );
}

const InquiryperiodBox = styled.div`
  display: table;
  border: 1px solid #e5e5e5;
  width: 25%;
  margin: 0 15px;
  span {
    display: table-cell;
    padding: 6px 12px;
    background: #e5e5e5;
  }
`;

const SelectPeriod = styled(DatePicker)`
  text-align: center;
  cursor: pointer;
`;
