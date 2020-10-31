import React, { Fragment } from 'react';
import styled from 'styled-components';

export default function Purchase({ showModal, setShowModal }) {
  return (
    <Fragment>
      <ModalOverlay showModal={showModal} />
      <ModalWrapper showModal={showModal} onClick={() => setShowModal(false)}>
        <ModalInner>123123123</ModalInner>
      </ModalWrapper>
    </Fragment>
  );
}

const ModalOverlay = styled.div`
  pointer-events: ${({ showModal }) => (showModal ? 'initial' : 'none')};
  opacity: ${({ showModal }) => (showModal ? 1 : 0)};
  transition: all 0.25s ease-in;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 999;
`;
const ModalWrapper = styled.div`
  pointer-events: ${({ showModal }) => (showModal ? 'initial' : 'none')};
  transform: translateY(${({ showModal }) => (showModal ? '0' : '700px')});
  opacity: ${({ showModal }) => (showModal ? 1 : 0)};
  transition: all 0.25s ease-in;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  outline: 0;
  z-index: 1000;
`;
const ModalInner = styled.div`
  ${({ theme }) => theme.flex(null, null, 'column')};
  box-sizing: border-box;
  position: relative;
  box-shadow: 0 0 6px #ebebeb;
  background-color: white;
  border-radius: 10px;
  width: 70%;
  top: 50%;
  transform: translateY(-50%);
  margin: 0 auto;
  padding: 20px;
  height: 90vh;
`;
