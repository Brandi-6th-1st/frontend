import React from 'react';
import styled from 'styled-components';
import Header from '../../Components/Header/Header';
import Nav from '../../Components/Nav/Nav';
import Footer from '../../Components/Footer/Footer';

export default function Main() {
  return (
    <div>
      <Header />
      <Section>
        <Nav />
        <Test>
          🌈 ✨ 🦾 🙌 🔥 <br />
          브랜디 1팀 짱!!!!
          <br /> 🥰 💚 👩‍💻 👨‍💻 💥
        </Test>
      </Section>
      <Footer />
    </div>
  );
}

const Section = styled.div`
  display: flex;
`;

const Test = styled.div`
  ${({ theme }) => theme.flex('center', 'center', '')}
  width: 100%;
  height: 100vh;
  padding-top: 45px;
  background: pink;
  border-radius: 0 0 0 14px;
  font-size: 70px;
  line-height: 1.5;
  text-align: center;
  color: white;
`;
