import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import axios from 'axios';
import DateFilter from './DateFilter';
import dateFormatChange from '../../Components/ChangeTimeFormat';

export default function Filter({ pagetext }) {
  const [params, setParams] = useState({
    startDate: new Date(),
    endDate: new Date(),
    searchKeyword: '',
    searchOption: '',
    periodButton: '',
  });

  const searchHandler = () => {
    // 검색버튼 눌렀을때 검색유효성 검사
    // 검색어는 있는데 검색 항목을 선택하지 않았을 경우
    params.searchKeyword &&
      !params.searchOption &&
      alert('검색항목를 입력해주세요.');
  };

  // const searchFilterd = async () => {
  //   const changeForm = {
  //     ...params,
  //     startDate: dateFormatChange(params.startDate),
  //     endDate: dateFormatChange(params.endDate),
  //   };
  //   const getData = await axios.get(``, {
  //     params: changeForm,
  //   });
  // };

  useEffect(() => {
    console.log(params.searchOption);
  }, [params.searchOption]);

  console.log(params);
  return (
    <FilterContainer>
      <Div>
        <Select
          onChange={(e) =>
            setParams({ ...params, searchOption: e.target.value })
          }
        >
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
          onChange={(e) =>
            setParams({ ...params, searchKeyword: e.target.value })
          }
          type="text"
          placeholder="검색어를 입력하세요."
        />
      </Div>
      <Divs>
        <FilterBox>
          <span>{pagetext.filter_date} :</span>
          <DateBtn
            type="button"
            value="전체"
            onClick={(e) =>
              setParams({ ...params, periodButton: e.target.value })
            }
            selected={params.periodButton === '전체'}
          />
          <DateBtn
            type="button"
            value="오늘"
            onClick={(e) =>
              setParams({ ...params, periodButton: e.target.value })
            }
            selected={params.periodButton === '오늘'}
          />
          <DateBtn
            type="button"
            value="3일"
            onClick={(e) =>
              setParams({ ...params, periodButton: e.target.value })
            }
            selected={params.periodButton === '3일'}
          />
          <DateBtn
            type="button"
            value="1주일"
            onClick={(e) =>
              setParams({ ...params, periodButton: e.target.value })
            }
            selected={params.periodButton === '1주일'}
          />
          <DateBtn
            type="button"
            value="1개월"
            onClick={(e) =>
              setParams({ ...params, periodButton: e.target.value })
            }
            selected={params.periodButton === '1개월'}
          />
          <DateBtn
            type="button"
            value="3개월"
            onClick={(e) =>
              setParams({ ...params, periodButton: e.target.value })
            }
            selected={params.periodButton === '3개월'}
          />
        </FilterBox>

        <DateFilter params={params} setParams={setParams} />
      </Divs>
      <Div>
        <Button search onClick={searchHandler}>
          검색
        </Button>
        <Button>초기화</Button>
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
    width: 90px;
    margin-right: 35px;
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
  ${({ selected }) =>
    selected &&
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
