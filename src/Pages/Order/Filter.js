import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import DateFilter from './DateFilter';

export default function Filter({ pagetext }) {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchOption, setSearchOption] = useState('');
  const [periodButton, setPeriodButton] = useState('3일');

  const handleChange = (e) => {
    setSearchKeyword(e.target.value);
  };

  const handleSelect = (e) => {
    setSearchOption(e.target.value);
  };

  const periodHandler = (e) => {
    setPeriodButton(e.target.value);
  };

  const searchHandler = () => {
    // 검색버튼 눌렀을때 검색유효성 검사
    // 검색어는 있는데 검색 항목을 선택하지 않았을 경우
    searchKeyword && !searchOption && alert('검색항목를 입력해주세요.');
  };

  useEffect(() => {
    console.log(searchOption);
  }, [searchOption]);

  return (
    <FilterContainer>
      <div>
        <Select onChange={handleSelect}>
          <option value="" selected>
            Select..
          </option>
          <option value="ORDER_DETAIL_NO">주문상세번호</option>
          <option value="ORDER_NO">주문번호</option>
          <option value="ORDRR_NAME">주문자명</option>
          <option value="ORDRR_HP">핸드폰번호</option>
          <option value="PRODUCT_NAME">상품명</option>
        </Select>
        <SearchInput
          onChange={handleChange}
          type="text"
          placeholder="검색어를 입력하세요."
        />
      </div>
      <div>
        <span>{pagetext.filter_date} :</span>
        <DateBtn
          type="button"
          value="전체"
          onClick={periodHandler}
          selected={periodButton === '전체'}
        />
        <DateBtn
          type="button"
          value="오늘"
          onClick={periodHandler}
          selected={periodButton === '오늘'}
        />
        <DateBtn
          type="button"
          value="3일"
          onClick={periodHandler}
          selected={periodButton === '3일'}
        />
        <DateBtn
          type="button"
          value="1주일"
          onClick={periodHandler}
          selected={periodButton === '1주일'}
        />
        <DateBtn
          type="button"
          value="1개월"
          onClick={periodHandler}
          selected={periodButton === '1개월'}
        />
        <DateBtn
          type="button"
          value="3개월"
          onClick={periodHandler}
          selected={periodButton === '3개월'}
        />
        <DateFilter />
      </div>

      <div>
        <Button search onClick={searchHandler}>
          검색
        </Button>
        <Button>초기화</Button>
      </div>
    </FilterContainer>
  );
}

const FilterContainer = styled.div`
  border: 3px solid #eee;
  padding-left: 5px;
  padding-bottom: 3px;
  margin-top: 15px;
  margin-bottom: 20px;
  div {
    ${({ theme }) => theme.flex('', 'center')}
    width: 100%;
    margin-top: 10px;
    margin-left: 20px;
    &:last-child {
      ${({ theme }) => theme.flex('center')}
    }
    span {
      width: 130px;
      font-size: 14px;
      color: #222;
    }
  }
`;

const Select = styled.select`
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
  width: 316px;
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
  background: ${({ selected }) => selected && '#428bca'};
  color: ${({ selected }) => selected && 'white'};
`;

const Button = styled.button`
  height: 34px;
  margin: 10px 2px;
  padding: 6px 50px;
  background: white;
  color: #333;
  border: 1px solid #e5e5e5;
  ${(props) =>
    props.search &&
    css`
      background: #428bca;
      border-color: #357ebd;
      color: white;
    `}
`;
