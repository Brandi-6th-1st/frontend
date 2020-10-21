import React from 'react';
import styled from 'styled-components';

export default function SubList({ subcategory, categoryIdx, handlePage }) {
  return (
    <SubContainer>
      {subcategory.map((el) => (
        <Subcategory key={el.id} onClick={() => handlePage(categoryIdx)}>
          {el.title}
        </Subcategory>
      ))}
    </SubContainer>
  );
}

const SubContainer = styled.ul`
  margin: 8px 0;
`;

const Subcategory = styled.li`
  ${({ theme }) => theme.flex('', 'center', '')}
  width: 215px;
  height: 30px;
  padding: 5px 0 5px 35px;
  color: #cecfd3;
  font-size: 14px;
  cursor: pointer;
  &:hover {
    color: white;
    background-color: #414247;
  }
`;
