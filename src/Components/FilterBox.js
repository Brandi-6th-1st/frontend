import React, { Fragment } from 'react';
import styled from 'styled-components';

export default function FilterBox({ cate, i, changeFilter, filterStatus }) {
  return (
    <SelectFilterCategory cate={cate.category.length} key={i}>
      <SelectFilterTitle>{cate.filterTitle} :</SelectFilterTitle>
      <FilterBtnBox>
        {cate.category.map((sub, idx) => {
          return (
            <SelectBtn
              key={idx}
              onClick={() =>
                changeFilter(sub.category_id, idx, cate.filterTitle, cate.id)
              }
              idx={idx}
              filterStatus={filterStatus}
              name={cate.filterTitle}
            >
              {sub.category_title}
            </SelectBtn>
          );
        })}
      </FilterBtnBox>
    </SelectFilterCategory>
  );
}
const SelectFilterCategory = styled.div`
  display: inline-flex;
  width: ${({ cate }) => (cate > 5 ? '100%' : '50%')};
  margin-top: 10px;
  margin-bottom: 5px;
  padding-right: 15px;

  select {
    ${({ theme }) => theme.flex('', 'center')}
    width: 100px;
    height: 30px;
    margin-left: 15px;
    border: 1px solid #e5e5e5;
  }

  @media only screen and (max-width: 940px) {
    width: 100%;
  }
`;

const SelectFilterTitle = styled.div`
  display: inline-flex;
  width: 100px;
  height: 25px;
  padding-left: 15px;
  color: #222222;
  text-overflow: hidden;
  white-space: nowrap;
`;

const FilterBtnBox = styled.div`
  margin: 0px 15px;
`;

const SelectBtn = styled.button`
  background-color: ${({ name, filterStatus, idx }) =>
    name &&
    filterStatus &&
    filterStatus.map((el) => !!el[name] && el[name][idx] && '#428bca')};

  &:hover {
    background-color: ${({ name, filterStatus, idx }) =>
      name &&
      filterStatus &&
      filterStatus.map((el) => !!el[name] && el[name][idx] && '#3071a9')};

    background-color: ${({ name, filterStatus, idx }) =>
      name &&
      filterStatus &&
      filterStatus.map((el) => !!el[name] && !el[name][idx] && '#e6e6e6')};
  }

  color: ${({ name, filterStatus, idx }) =>
    name &&
    filterStatus &&
    filterStatus.map((el) => !!el[name] && el[name][idx] && 'white')};

  margin-right: 3px;
  padding: 6px 12px;
  border: 1px solid #adadad;
  border-radius: 4px;
  cursor: pointer;
`;
