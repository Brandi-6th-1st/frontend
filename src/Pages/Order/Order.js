import React from 'react';
import styled from 'styled-components';
import Header from '../../Components/Header/Header';
import Nav from '../../Components/Nav/Nav';
import Footer from '../../Components/Footer/Footer';
import OrderManagement from './OrderManagement';

export default function Order() {
  return (
    <div>
      <Header />
      <Section>
        <Nav />
        <OrderManagement />
      </Section>
      <Footer />
    </div>
  );
}

const Section = styled.div`
  display: flex;
`;
