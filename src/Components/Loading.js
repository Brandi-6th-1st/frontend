import React from 'react';
import styled from 'styled-components';

export default function Order({ isLoading }) {
  return (
    <Loading isLoading={isLoading}>
      <img src="/public/Images/ico_brandi_loading.png" />
    </Loading>
  );
}

const Loading = styled.div`
  opacity: ${({ isLoading }) => (isLoading ? 1 : 0)};
  z-index: ${({ isLoading }) => (isLoading ? 1 : -1)};
  transition: all 0.25s ease-in;
  position: absolute;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.6);

  img {
    width: 100px;
    height: 125px;
    margin-top: 120px;
  }
`;
