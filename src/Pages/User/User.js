import React, { Fragment, useState, useEffect } from 'react';
import styled from 'styled-components';
import Header from '../../Components/Header/Header';
import Nav from '../../Components/Nav/Nav';
import SellerInfoManagement from './SellerInfoManagement';
import Footer from '../../Components/Footer/Footer';

export default function SellerInformation() {
  const [sellerInfo, setSellerInfo] = useState();

  const getSellerData = () => {
    fetch('public/Data/SellerStatus.json')
      .then((response) => response.json())
      // .then((result) =>
      //   console.log(result.seller_status_record[0].status_history[0].status)
      // );
      .then((result) => setSellerInfo(result.seller_status_record));
  };

  useEffect(() => {
    getSellerData();
  }, []);
  // console.log(sellerInfo && sellerInfo[0].status_history[0].status);

  return (
    <Fragment>
      <Header />
      <Container>
        <Nav />
        <SellerInfoManagement sellerInfo={sellerInfo} />
      </Container>
      <Footer />
    </Fragment>
  );
}

const Container = styled.div`
  display: flex;
`;
