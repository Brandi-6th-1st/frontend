import React, { Fragment } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import DataRefundStatus from './Data/DataRefundStatus';
import DataSalesStatus from './Data/DataSalesStatus';
import DataShippingStatus from './Data/DataShippingStatus';
import { GoGraph, GoListUnordered } from 'react-icons/go';
import { AiOutlineNotification } from 'react-icons/ai';

export default function Home() {
  return (
    <Fragment>
      <Header />
      <Main>
        <Nav />
        <Section>
          <SalesContainer>
            <SalesBox>
              <SalesStatus>
                {DataShippingStatus.map((Item) => {
                  return (
                    <SalesCategory>
                      <span>{Item.categoryTitle} : </span>
                      <span>{Item.number}건 </span>
                    </SalesCategory>
                  );
                })}
              </SalesStatus>
            </SalesBox>
            <SalesBox>
              <SalesStatus>
                {DataRefundStatus.map((Item) => {
                  return (
                    <SalesCategory>
                      <span>
                        {Item.categoryTitle}
                        {Item.categoryTitle.length > 0 && ':'}
                      </span>
                      <span>
                        {Item.number}
                        {Item.number.length > 0 && '건'}{' '}
                      </span>
                    </SalesCategory>
                  );
                })}
              </SalesStatus>
            </SalesBox>
            <SalesBox>
              <SalesStatus>
                {DataSalesStatus.map((Item) => {
                  return (
                    <SalesCategory>
                      <span>
                        {Item.categoryTitle}{' '}
                        {Item.categoryTitle.length > 0 && ':'}
                      </span>
                      <span>
                        {Item.number}
                        {Item.number.length > 0 && '건'}
                      </span>
                    </SalesCategory>
                  );
                })}
              </SalesStatus>
            </SalesBox>
          </SalesContainer>
          <StaticsContainer>
            <StaticsBox>
              <StaticsStatus>
                <StaticsTitle>
                  <GoGraph />
                  <span>
                    매출 통계[최근 30일간의 결제완료된 주문 건수의 합계]
                  </span>
                </StaticsTitle>
                <StaticsGraph></StaticsGraph>
              </StaticsStatus>
            </StaticsBox>
            <StaticsBox>
              <StaticsStatus>
                <StaticsTitle>
                  <GoGraph />
                  <span>
                    매출 통계[최근 30일간의 결제완료된 주문 건수의 합계]
                  </span>
                </StaticsTitle>
                <StaticsGraph></StaticsGraph>
              </StaticsStatus>
            </StaticsBox>
          </StaticsContainer>
          <StaticsContainer>
            <StaticsBox>
              <StaticsStatus>
                <StaticsTitle>
                  <GoListUnordered />
                  <span>Q&A 미답변</span>
                </StaticsTitle>
                <StaticsGraph></StaticsGraph>
              </StaticsStatus>
            </StaticsBox>
            <StaticsBox>
              <StaticsStatus>
                <StaticsTitle>
                  <AiOutlineNotification />
                  <span>공지사항</span>
                </StaticsTitle>
                <StaticsGraph></StaticsGraph>
              </StaticsStatus>
            </StaticsBox>
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

const SalesBox = styled.div`
  display: inline-block;
  width: 33.3%;
  padding-left: 15px;
  padding-right: 15px;
  margin-bottom: 22px;
`;

const SalesStatus = styled.div`
  background-color: #fff;
  padding: 15px 20px 0px 20px;
  border: 1px solid #dddddd;
  border-radius: 3px;
`;

const SalesCategory = styled.div`
  ${({ theme }) => theme.flex('space-between', '', '')}
  height:30px;

  span {
    font-size: 13px;
  }
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
