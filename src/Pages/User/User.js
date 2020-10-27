import React, { Fragment } from 'react';
import styled from 'styled-components';
import Header from '../../Components/Header/Header';
import Nav from '../../Components/Nav/Nav';
import UserManagement from './UserManagement';
import Footer from '../../Components/Footer/Footer';

export default function User() {
  return (
    <Fragment>
      <Header />
      <Container>
        <Nav />
        <UserManagement />
      </Container>
      <Footer />
    </Fragment>
  );
}

const Container = styled.div`
  display: flex;
`;
