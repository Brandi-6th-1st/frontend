import React from 'react';
import styled from 'styled-components';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { GoGraph } from 'react-icons/go';

export default function Chart({ highcharts, options }) {
  return (
    <StaticsBox>
      <StaticsStatus>
        <StaticsTitle>
          <GoGraph />
          <span>매출 통계[최근 30일간의 결제완료된 주문 건수의 합계]</span>
        </StaticsTitle>
        <StaticsGraph>
          <HighchartsReact highcharts={Highcharts} options={options} />
        </StaticsGraph>
      </StaticsStatus>
    </StaticsBox>
  );
}

const StaticsBox = styled.div`
  display: inline-block;
  width: 50%;
  min-height: 1px;
  padding: 0px 10px;

  @media only screen and (max-width: 750px) {
    width: 100%;
  }
`;

const StaticsStatus = styled.div`
  border: 1px solid #dddddd;
`;

const StaticsTitle = styled.div`
  padding: 10px 15px;
  background-color: #f5f5f5;
  border-bottom: 1px solid #dddddd;

  svg {
    vertical-align: bottom;
    color: gray;
  }

  span {
    padding-left: 5px;
    font-size: 13px;
    color: gray;
  }
`;

const StaticsGraph = styled.div`
  padding: 10px;
`;
