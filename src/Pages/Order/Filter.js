import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import axios from 'axios';
import DateFilter from './DateFilter';
import dateFormatChange from '../../Components/ChangeTimeFormat';
import { TimeAgo } from '@n1ru4l/react-time-ago';

export default function Filter({ pagetext }) {
  const [searchDate, setSearchDate] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });
  const [params, setParams] = useState({
    startDate: null,
    endDate: null,
    searchKeyword: null,
    searchOption: null,
  });

  const [selectDate, setSelectDate] = useState([
    true,
    false,
    false,
    false,
    false,
    false,
  ]);

  const searchHandler = () => {
    // 검색버튼 눌렀을때 검색유효성 검사
    // 검색어는 있는데 검색 항목을 선택하지 않았을 경우
    params.searchKeyword &&
      !params.searchOption &&
      alert('검색항목를 입력해주세요.');
  };

  const handleDate = (value, i) => {
    setSelectDate(
      selectDate && selectDate.map((el, idx) => (idx === i ? true : false))
    );
    const newDate = new Date();

    const changeDate = (dayAgo, monthAgo) => {
      const year = newDate.getFullYear();
      const month = newDate.getMonth() - monthAgo;
      const day = newDate.getDate() - dayAgo;
      return new Date(year, month, day);
    };

    if (value === '전체') {
      setParams({ ...params, startDate: null, endDate: null });
      setSearchDate({ startDate: null, endDate: null });
    } else if (value === '오늘') {
      setParams({
        ...params,
        startDate: dateFormatChange(newDate),
        endDate: dateFormatChange(newDate),
      });
      setSearchDate({
        startDate: new Date(),
        endDate: new Date(),
      });
    } else if (value === '3일') {
      // const dayAgo = new Date().getTime() - oneDay * 3;
      setParams({
        ...params,
        startDate: dateFormatChange(changeDate(3, 0)),
        endDate: dateFormatChange(newDate),
      });
      setSearchDate({
        startDate: changeDate(3, 0),
        endDate: new Date(),
      });
    } else if (value === '1주일') {
      setParams({
        ...params,
        startDate: dateFormatChange(changeDate(7, 0)),
        endDate: dateFormatChange(newDate),
      });
      setSearchDate({
        startDate: changeDate(7, 0),
        endDate: new Date(),
      });
    } else if (value === '1개월') {
      setParams({
        ...params,
        startDate: dateFormatChange(changeDate(0, 1)),
        endDate: dateFormatChange(newDate),
      });
      setSearchDate({
        startDate: changeDate(0, 1),
        endDate: new Date(),
      });
    } else if (value === '3개월') {
      setParams({
        ...params,
        startDate: dateFormatChange(changeDate(0, 3)),
        endDate: dateFormatChange(newDate),
      });
      setSearchDate({
        startDate: changeDate(0, 3),
        endDate: new Date(),
      });
    }
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
  // console.log(searchDate);
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
            idx={0}
            selectDate={selectDate}
            type="button"
            value="전체"
            onClick={(e) => handleDate(e.target.value, 0)}
            selected={params.periodButton === '전체'}
          />
          <DateBtn
            idx={1}
            selectDate={selectDate}
            type="button"
            value="오늘"
            onClick={(e) => handleDate(e.target.value, 1)}
            selected={params.periodButton === '오늘'}
          />
          <DateBtn
            idx={2}
            selectDate={selectDate}
            type="button"
            value="3일"
            onClick={(e) => handleDate(e.target.value, 2)}
            selected={params.periodButton === '3일'}
          />
          <DateBtn
            idx={3}
            selectDate={selectDate}
            type="button"
            value="1주일"
            onClick={(e) => handleDate(e.target.value, 3)}
            selected={params.periodButton === '1주일'}
          />
          <DateBtn
            idx={4}
            selectDate={selectDate}
            type="button"
            value="1개월"
            onClick={(e) => handleDate(e.target.value, 4)}
            selected={params.periodButton === '1개월'}
          />
          <DateBtn
            idx={5}
            selectDate={selectDate}
            type="button"
            value="3개월"
            onClick={(e) => handleDate(e.target.value, 5)}
            selected={params.periodButton === '3개월'}
          />
        </FilterBox>
        <DateFilter searchDate={searchDate} setSearchDate={setSearchDate} />
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
