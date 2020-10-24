import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import styled from 'styled-components';

export default function DateFilter() {
  const [startDate, setStartDate] = useState(new Date());

  return (
    <DateContainer>
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
      />
    </DateContainer>
  );
}

const DateContainer = styled.div`
  width: 60px;
  margin: 0;
  display: inline-block;
  background: #fff;
  border: 1px solid #eee;
  border-radius: 4px;
`;
