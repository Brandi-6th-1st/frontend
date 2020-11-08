import React, { Fragment, useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import regeneratorRuntime from 'regenerator-runtime';
import Highcharts, { error } from 'highcharts';
// import HighchartsReact from 'highcharts-react-official';
// import { GoGraph } from 'react-icons/go';
import ProductManage from './Components/ProductManage';
import RefundManage from './Components/RefundManage';
import Bookmark from './Components/Bookmark';
import QnA from './Components/QnA';
import Notice from './Components/Notice';
import Nav from '../../Components/Nav/Nav';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import Chart from './Components/Chart';
import { API } from '../../config';

export default function Home() {
  const history = useHistory();
  // axios시 받은 data를 data 상태로 관리한다.
  const [sellerStatus, setSellerStatus] = useState();

  // Test : json형식 mock-data 생성
  // axios get을 사용하여 데이터를 받아온다.
  const getData = async () => {
    const localToken = localStorage.getItem('token');

    try {
      // const result = await axios.get(`/public/Data/DataHomeSeller.json`);
      const result = await axios.get(`${API}/home`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: localToken,
        },
        timeout: 3000,
      });
      if (result.status === 200) {
        // 받아온 데이터를 비구조 할당하여 data에 저장한다.
        const DataHomeSeller = result.data.success;
        console.log(DataHomeSeller);
        setSellerStatus(DataHomeSeller);
      } else {
        alert(result.data.client_message);
        history.push('/');
      }
    } catch (err) {
      if (err.response) {
        if (err.response.statusText === 'CONFLICT') {
          alert(err.response.data.client_message);
          history.push('/');
        }
      } else if (error.request) {
        // 요청이 이루어 졌으나 응답을 받지 못했습니다.
        // `error.request`는 브라우저의 XMLHttpRequest 인스턴스 또는
        // Node.js의 http.ClientRequest 인스턴스입니다.
        console.log(err.request);
      } else {
        // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
        console.log('Error', error.message);
      }
    }
  };

  // 페이지 마운트시 fetch 하여 배송, 즐겨찾기, 차트 데이터 등을 받아온다.
  useEffect(() => {
    getData();
  }, []);

  // 매출 금액 차트에 들어가는 일별 Price
  const priceOfSales =
    sellerStatus &&
    sellerStatus.statistics.map((item) => {
      return item.sales;
    });

  // 매출 건수 차트에 들어가는 일별 건수
  const numOfSales =
    sellerStatus &&
    sellerStatus.statistics.map((item) => {
      return item.count;
    });

  // 매출 차트에 공통으로 사용되는 금액, 건수의 날짜
  const dateBySales =
    sellerStatus &&
    sellerStatus.statistics.map((item) => {
      return item.datetime;
    });

  // 매출 금액에 들어가는 차트 데이터
  const priceChart = () =>
    chartForm(priceOfSales, dateBySales, null, '결제 금액', '원');

  // 매출 건수에 들어가는 차트 데이터
  const numChart = () =>
    chartForm(numOfSales, dateBySales, '#AA4643', '결제 건수', '건');

  const chartForm = (series, date, color, tooltipTitle, tooltipUnit) => {
    const options = {
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
          color: color,
          // 차트에 표기되는 Data ( 매출 건수, 매출 금액)
          data: series,
          // 차트에 표기되는 Data 이름
          name: tooltipTitle,
          // 차트 하단에 표기되는 Name을 표시하지 않게 해줍니다.
          showInLegend: false,
        },
      ],
      // X축 관련 Format 및 data
      xAxis: {
        // X축에 표시되는 Data
        categories: date,
        labels: {
          // 차트에 월,일만 표기되도록 앞에 년도를 짤라서 출력 (데이터에 따른 수정 예정)
          formatter: function () {
            return this.value;
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
          var tooltipText = `${tooltipTitle} <br> <b> ${splitDate[0]}월  ${splitDate[1]}일 : ${this.y} ${tooltipUnit}</b>`;
          return tooltipText;
        },
      },
      showInLegend: true,
    };
    return options;
  };

  return (
    <Fragment>
      <Header />
      <Main>
        <Nav />
        <Section>
          <SalesContainer>
            {/* 상품, 배송 상태 차트 컴포넌트 */}
            <ProductManage sellerStatus={sellerStatus} />
            {/* 환불, 반품 상태 차트 컴포넌트 */}
            <RefundManage />
            {/* 즐겨찾기, 전체 상품수 등 상태 차트 컴포넌트 */}
            <Bookmark sellerStatus={sellerStatus} />
          </SalesContainer>
          <StaticsContainer>
            {/* 매출 통계 건수 차트 생성하여 컴포넌트 분리 예정 */}
            <Chart highcharts={Highcharts} options={numChart()} />
            <Chart highcharts={Highcharts} options={priceChart()} />
            {/* <StaticsBox>
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
                    options={numChart()}
                  />
                </StaticsGraph>
              </StaticsStatus>
            </StaticsBox>
             */}
            {/* 매출 통계 금액 차트 생성하여 컴포넌트 분리 예정 */}
            {/* <StaticsBox>
              <StaticsStatus>
                <StaticsTitle>
                  <GoGraph />
                  <span>
                    매출 통계[최근 30일간의 결제완료된 주문 금액의 합계]
                  </span>
                </StaticsTitle>
                <StaticsGraph>
                  <HighchartsReact
                    highcharts={Highcharts}
                    options={priceChart()}
                  />
                </StaticsGraph>
              </StaticsStatus>
            </StaticsBox>
           */}
          </StaticsContainer>
          <StaticsContainer>
            {/* Q&A 차트 컴포넌트 */}
            <QnA />
            {/* 공지사항 컴포넌트 */}
            <Notice />
          </StaticsContainer>
        </Section>
      </Main>
      <Footer />
    </Fragment>
  );
}

const Main = styled.div`
  display: flex;
  width: 100%;
`;

const Section = styled.div`
  width: 100%;
  padding: 20px;
  padding-top: 65px;
  border-radius: 0 0 0 4px;
  background-color: #fafafa;
`;

const SalesContainer = styled.div`
  display: flex;

  @media only screen and (max-width: 750px) {
    ${({ theme }) => theme.flex('', '', 'column')}
  }
`;

const StaticsContainer = styled.div`
  display: flex;
  margin-bottom: 22px;

  @media only screen and (max-width: 750px) {
    ${({ theme }) => theme.flex('', '', 'column')}
  }
`;

// const StaticsBox = styled.div`
//   display: inline-block;
//   width: 50%;
//   min-height: 1px;
//   padding: 0px 10px;

//   @media only screen and (max-width: 750px) {
//     width: 100%;
//   }
// `;

// const StaticsStatus = styled.div`
//   border: 1px solid #dddddd;
// `;

// const StaticsTitle = styled.div`
//   padding: 10px 15px;
//   background-color: #f5f5f5;
//   border-bottom: 1px solid #dddddd;

//   svg {
//     vertical-align: bottom;
//     color: gray;
//   }

//   span {
//     padding-left: 5px;
//     font-size: 13px;
//     color: gray;
//   }
// `;

// const StaticsGraph = styled.div`
//   padding: 10px;
// `;
