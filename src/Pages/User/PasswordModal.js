import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { CgClose } from 'react-icons/cg';

const VintageModal = ({ visible, onClose }) => {
  const onMaskClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose(e);
    }
  };

  const close = (e) => {
    if (onClose) {
      onClose(e);
    }
  };

  return (
    <Fragment>
      <ModalOverlay visible={visible} />
      <ModalWrapper visible={visible} onClick={onMaskClick}>
        <ModalInner>
          <CgClose onClick={close} />
        </ModalInner>
      </ModalWrapper>
    </Fragment>
  );
};

export default VintageModal;

VintageModal.propTypes = {
  visible: PropTypes.bool,
};

const ModalOverlay = styled.div`
  pointer-events: ${({ visible }) => (visible ? 'initial' : 'none')};
  opacity: ${({ visible }) => (visible ? 1 : 0)};
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
  pointer-events: ${({ visible }) => (visible ? 'initial' : 'none')};
  transform: translateY(${({ visible }) => (visible ? '0' : '700px')});
  opacity: ${({ visible }) => (visible ? 1 : 0)};
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
