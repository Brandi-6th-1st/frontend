import React, { Fragment, useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import ProductManage from './Components/ProductManage';
import RefundManage from './Components/RefundManage';
import Bookmark from './Components/Bookmark';
import QnA from './Components/QnA';
import Notice from './Components/Notice';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import regeneratorRuntime from 'regenerator-runtime';
import { GoGraph } from 'react-icons/go';

export default function Home() {
  // axios시 받은 data를 data 상태로 관리한다.
  const [data, setData] = useState();

  // Test : json형식 mock-data 생성
  // axios get을 사용하여 데이터를 받아온다.
  const getData = async () => {
    try {
      const result = await axios.get(`/public/Data/DataHomeSeller.json`);
      // 받아온 데이터를 비구조 할당하여 data에 저장한다.
      const { DataHomeSeller } = result.data;
      setData(DataHomeSeller);
    } catch (err) {
      console.log(err);
    }
  };

  // 페이지 마운트시 fetch 하여 배송, 즐겨찾기, 차트 데이터 등을 받아온다.
  useEffect(() => {
    getData();
  }, []);

  // 매출 금액 차트에 들어가는 일별 Price
  const priceOfSales =
    data &&
    data.chart_data.map((item) => {
      return item.price;
    });

  // 매출 건수 차트에 들어가는 일별 건수
  const numOfSales =
    data &&
    data.chart_data.map((item) => {
      return item.num;
    });

  // 매출 차트에 공통으로 사용되는 금액, 건수의 날짜
  const dateBySales =
    data &&
    data.chart_data.map((item) => {
      return item.date;
    });

  // 매출 건수 차트에 들어가는 Data 및 차트 Format
  const numOfOptions = {
    title: {
      // 차트에 표기되는 메인 Title을 보이지 않게 Null로 변경
      text: null,
    },

    credits: {
      // 차트에 표기되는 highchart 제거
      enabled: false,
    },
    // 차트에 표시되는 선의 종류
    series: [
      {
        // 차트에 표시되는 선의 색깔
        color: '#AA4643',
        // 차트에 표기되는 Data ( 매출 건수 )
        data: numOfSales,
        // 차트에 표기되는 Data 이름
        name: '결제 건수',
        // 차트 하단에 표기되는 Name을 표시하지 않게 해줍니다.
        showInLegend: false,
      },
    ],
    // X축 관련 Format 및 data
    xAxis: {
      // X축에 표시되는 Data
      categories: dateBySales,
      labels: {
        // 차트에 월,일만 표기되도록 앞에 년도를 짤라서 출력 (데이터에 따른 수정 예정)
        formatter: function () {
          return this.value.substring(3);
        },
      },
    },
    // Y축 관련 Format 및 data
    yAxis: {
      // Y축 왼쪽에 표시되는 Title을 보이지 않게 null로 설정
      title: {
        text: null,
      },
      // Y축 표시도는 data format을 1 000단위로 설정
      labels: {
        format: '{value:,.0f} ',
      },
    },
    // 차트에 hover 하였을때 출력되는 툴팁
    tooltip: {
      formatter: function () {
        // axios에서 넘겨받은 날짜를 xx년 xx월 xx일 형식으로 바꾸기 위해서 split
        const splitDate = this.x.split('/');
        // 위에서 split한 Data를 각 Format에 맞게 넣어 출력한다.
        var tooltipText = `결제 건수 <br> <b> ${splitDate[0]}년 ${splitDate[1]}월  ${splitDate[2]}일 : ${this.y} 건</b>`;
        return tooltipText;
      },
    },
  };

  // 매출 금액 차트에 들어가는 Data 및 차트 Format
  const priceOfOptions = {
    title: {
      // 차트에 표기되는 메인 Title을 보이지 않게 Null로 변경
      text: null,
    },
    credits: {
      // 차트에 표기되는 highchart 제거
      enabled: false,
    },
    // 차트에 표시되는 선의 종류
    series: [
      {
        // 차트에 표기되는 Data ( 매출 건수 )
        data: priceOfSales,
        // 차트에 표기되는 Data 이름
        name: '결제 금액',
        // 차트 하단에 표기되는 Name을 표시하지 않게 해줍니다.
        showInLegend: false,
      },
    ],
    // X축 관련 Format 및 data
    xAxis: {
      // X축에 표시되는 Data
      categories: dateBySales,
      labels: {
        // 차트에 월,일만 표기되도록 앞에 년도를 짤라서 출력 (데이터에 따른 수정 예정)
        formatter: function () {
          return this.value.substring(3);
        },
      },
    },
    // Y축 관련 Format 및 data
    yAxis: {
      // Y축 왼쪽에 표시되는 Title을 보이지 않게 null로 설정
      title: {
        text: null,
      },
      // Y축 표시도는 data format을 1 000단위로 설정
      labels: {
        format: '{value:,.0f} ',
      },
    },
    // 차트에 hover 하였을때 출력되는 툴팁
    tooltip: {
      formatter: function () {
        // axios에서 넘겨받은 날짜를 xx년 xx월 xx일 형식으로 바꾸기 위해서 split
        const splitDate = this.x.split('/');
        // 위에서 split한 Data를 각 Format에 맞게 넣어 출력한다.
        var tooltipText = `결제 금액 <br> <b> ${splitDate[0]}년 ${splitDate[1]}월  ${splitDate[2]}일 : ${this.y} 원</b>`;
        return tooltipText;
      },
    },
  };

  return (
    <Fragment>
      <Header />
      <Main>
        <Nav />
        <Section>
          <SalesContainer>
            {/* 상품, 배송 상태 차트 컴포넌트 */}
            <ProductManage data={data} />
            {/* 환불, 반품 상태 차트 컴포넌트 */}
            <RefundManage />
            {/* 즐겨찾기, 전체 상품수 등 상태 차트 컴포넌트 */}
            <Bookmark data={data} />
          </SalesContainer>
          <StaticsContainer>
            {/* 매출 통계 건수 차트 생성하여 컴포넌트 분리 예정 */}
            <StaticsBox>
              <StaticsStatus>
                <StaticsTitle>
                  <GoGraph />
                  <span>
                    매출 통계[최근 30일간의 결제완료된 주문 건수의 합계]
                  </span>
                </StaticsTitle>
                <StaticsGraph>
                  <HighchartsReact
                    highcharts={Highcharts}
                    options={numOfOptions}
                  />
                </StaticsGraph>
              </StaticsStatus>
            </StaticsBox>
            {/* 매출 통계 금액 차트 생성하여 컴포넌트 분리 예정 */}
            <StaticsBox>
              <StaticsStatus>
                <StaticsTitle>
                  <GoGraph />
                  <span>
                    매출 통계[최근 30일간의 결제완료된 주문 건수의 합계]
                  </span>
                </StaticsTitle>
                <StaticsGraph>
                  <HighchartsReact
                    highcharts={Highcharts}
                    options={priceOfOptions}
                  />
                </StaticsGraph>
              </StaticsStatus>
            </StaticsBox>
          </StaticsContainer>
          <StaticsContainer>
            {/* Q&A 차트 컴포넌트 */}
            <QnA />
            {/* 공지사항 컴포넌트 */}
            <Notice />
          </StaticsContainer>
        </Section>
      </Main>
    </Fragment>
  );
}

const Header = styled.div`
  /* position: fixed; */
  width: 100%;
  height: 45px;
  top: 0;
  background-color: rgb(135, 59, 83);
`;

const Main = styled.div`
  display: flex;
  background-color: #fafafa;
`;

const Nav = styled.div`
  width: 215px;
  height: 850px;
  background-color: black;
`;

const Section = styled.div`
  width: 100%;
  padding: 20px 20px;
`;

const SalesContainer = styled.div`
  display: flex;
`;

const StaticsContainer = styled.div`
  display: flex;
  margin-bottom: 22px;
`;

const StaticsBox = styled.div`
  display: inline-block;
  width: 50%;
  min-height: 1px;
  padding: 0px 10px;
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
  padding: 10px 10px;
`;
