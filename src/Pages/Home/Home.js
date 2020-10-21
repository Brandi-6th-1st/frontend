import React, { Fragment } from 'react';
import styled from 'styled-components';
import ProductManage from './Components/ProductManage';
import RefundManage from './Components/RefundManage';
import Bookmark from './Components/Bookmark';
import QnA from './Components/QnA';
import Notice from './Components/Notice';
import { GoGraph } from 'react-icons/go';

export default function Home() {
  return (
    <Fragment>
      <Header />
      <Main>
        <Nav />
        <Section>
          <SalesContainer>
            {/* 상품, 배송 상태 차트 컴포넌트 */}
            <ProductManage />
            {/* 환불, 반품 상태 차트 컴포넌트 */}
            <RefundManage />
            {/* 즐겨찾기, 전체 상품수 등 상태 차트 컴포넌트 */}
            <Bookmark />
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
                  <canvas></canvas>
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
                  <canvas></canvas>
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

// const SellerNoti = styled.ul`
//   display: flex;
//   margin: 0px;
//   padding: 0px;
//   border-top: 1px solid #dddddd;

//   li {
//     font-size: 13px;
//   }
// `;
