import React from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import '../../src/Styles/datepick.css';
import { ko } from 'date-fns/esm/locale';

export default function CallendarManage({
  currentDate,
  handleStartDate,
  handleEndDate,
}) {
  return (
    <InquiryperiodBox>
      <SelectPeriod
        selected={currentDate.startDate || ''}
        locale={ko}
        dateFormat="yyyy-MM-dd"
        onChange={(date) => {
          handleStartDate(date);
        }}
        placeholderText="클릭해주세요."
        shouldCloseOnSelect={false}
      />
      <span>~</span>
      <SelectPeriod
        selected={currentDate.endDate || ''}
        locale={ko}
        dateFormat="yyyy-MM-dd"
        onChange={(date) => handleEndDate(date)}
        placeholderText="클릭해주세요."
        shouldCloseOnSelect={false}
      />
    </InquiryperiodBox>
  );
}
const InquiryperiodBox = styled.div`
  display: table;
  border: 1px solid #e5e5e5;
  width: 25%;
  margin: 0 15px;

  @media only screen and (max-width: 934px) {
    width: 100%;
  }

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
