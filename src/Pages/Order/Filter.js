import React from 'react';
import styled, { css } from 'styled-components';
import CallendarManage from '../../Components/CallendarManage';

export default function Filter({
  pagetext,
  currentDate,
  setCurrentDate,
  handleDate,
  selectDate,
  params,
  setParams,
  sendQuery,
  filterReset,
  handleStartDate,
  handleEndDate,
}) {
  return (
    <FilterContainer>
      <Div>
        <Select
          value={params.searchOption || ''}
          onChange={(e) =>
            setParams({ ...params, searchOption: e.target.value })
          }
        >
          <option value="">Select..</option>
          <option value="ORDER_DETAIL_NO">주문상세번호</option>
          <option value="ORDER_NO">주문번호</option>
          <option value="ORDRR_NAME">주문자명</option>
          <option value="ORDRR_HP">핸드폰번호</option>
          <option value="PRODUCT_NAME">상품명</option>
        </Select>
        <SearchInput
          onChange={(e) =>
            setParams({ ...params, searchKeyword: e.target.value })
          }
          value={params.searchKeyword ? params.searchKeyword : ''}
          type="text"
          placeholder="검색어를 입력하세요."
        />
      </Div>
      <Divs>
        <FilterBox>
          <span>{pagetext.filter_date} :</span>
          <DateBtn
            idx={0}
            selectDate={selectDate}
            type="button"
            value="전체"
            onClick={(e) => handleDate(e.target.value, 0)}
          />
          <DateBtn
            idx={1}
            selectDate={selectDate}
            type="button"
            value="오늘"
            onClick={(e) => handleDate(e.target.value, 1)}
          />
          <DateBtn
            idx={2}
            selectDate={selectDate}
            type="button"
            value="3일"
            onClick={(e) => handleDate(e.target.value, 2)}
          />
          <DateBtn
            idx={3}
            selectDate={selectDate}
            type="button"
            value="1주일"
            onClick={(e) => handleDate(e.target.value, 3)}
          />
          <DateBtn
            idx={4}
            selectDate={selectDate}
            type="button"
            value="1개월"
            onClick={(e) => handleDate(e.target.value, 4)}
          />
          <DateBtn
            idx={5}
            selectDate={selectDate}
            type="button"
            value="3개월"
            onClick={(e) => handleDate(e.target.value, 5)}
          />
        </FilterBox>
        <CallendarManage
          currentDate={currentDate}
          setCurrentDate={setCurrentDate}
          handleStartDate={handleStartDate}
          handleEndDate={handleEndDate}
        />
      </Divs>
      <Div>
        <Button search onClick={() => sendQuery()}>
          검색
        </Button>
        <Button onClick={filterReset}>초기화</Button>
      </Div>
    </FilterContainer>
  );
}

const FilterContainer = styled.div`
  border: 3px solid #eee;
  padding-left: 5px;
  padding-bottom: 3px;
  margin-top: 15px;
  margin-bottom: 20px;
`;

const Div = styled.div`
  ${({ theme }) => theme.flex('', 'center')}
  width: 100%;
  margin-top: 10px;
  margin-left: 20px;
  &:last-child {
    ${({ theme }) => theme.flex('center')}
    padding-right: 100px;
  }
  span {
    margin-right: 35px;
    text-align: center;
    font-size: 14px;
    color: #222;
  }
`;

const Divs = styled(Div)`
  @media only screen and (max-width: 1067px) {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
`;

const FilterBox = styled.div`
  @media only screen and (max-width: 1067px) {
    margin-bottom: 10px;
  }

  span {
    margin-left: 15px;
  }
`;

const Select = styled.select`
  margin-left: 15px;
  height: 30px;
  width: 120px;
  margin-right: 5px;
  padding: 2px 10px;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  line-height: 28px;
  color: #666;
`;

const SearchInput = styled.input`
  height: 30px;
  width: 35%;
  padding: 6px 10px;
  background: white;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  font-size: 13px;
`;

const DateBtn = styled.input`
  height: 32px;
  margin-right: 3px;
  padding: 6px 12px;
  background: #fff;
  color: #333;
  font-size: 14px;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  &:hover {
    background: #e6e6e6;
    border-color: #adadad;
  }
  ${({ selectDate, idx }) =>
    selectDate &&
    selectDate[idx] &&
    css`
      background: #428bca;
      color: white;
      &:hover {
        background: #428bca;
      }
    `}
`;

const Button = styled.button`
  height: 34px;
  margin: 10px 2px;
  padding: 6px 50px;
  background: white;
  color: #333;
  border: 1px solid #e5e5e5;
  cursor: pointer;
  &:hover {
    background: #e6e6e6;
    border-color: #adadad;
  }
  ${(props) =>
    props.search &&
    css`
      background: #428bca;
      border-color: #357ebd;
      color: white;
      &:hover {
        background: #3071a9;
        border-color: #285e8e;
      }
    `}
`;
