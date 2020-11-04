import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import DatePicker from 'react-datepicker';
import { MdDateRange } from 'react-icons/md';
import './react-datepicker.css';
import dateFormatChange from '../../Components/ChangeTimeFormat';

function SellerTable({ sellerList, filter, setFilter, handleSellerData }) {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const {
    id,
    identification,
    seller_name_en,
    seller_name_ko,
    manager_name,
    seller_status,
    manager_contact,
    manager_email,
    seller_attribute,
    limit,
    offset,
    start_date,
    end_date,
  } = filter;

  const handleSellerStatus = (e) => {
    e.persist();
    const value = e.target.value;
    const nextFilter = {
      ...filter,
      seller_status: value,
    };
    setFilter(nextFilter);
  };

  const handleSellerAttribute = (e) => {
    e.persist();
    const value = e.target.value;
    const nextFilter = {
      ...filter,
      seller_attribute: value,
    };
    setFilter(nextFilter);
  };

  const handleInputChange = (e) => {
    e.persist();
    const nextFilter = {
      ...filter,
      [e.target.name]: e.target.value,
    };
    setFilter(nextFilter);
  };

  const handleDate = () => {
    const nextFilter = {
      ...filter,
      start_date: dateFormatChange(startDate),
      end_date: dateFormatChange(endDate),
    };
    setFilter(nextFilter);
  };

  // useEffect(() => {
  //   handleSellerStatus();
  //   handleSellerAttribute();
  //   handleInputChange();
  //   handleDate();
  // }, [filter]);

  // useEffect(() => {
  //   handleSellerStatus();
  // }, [seller_status]);

  // useEffect(() => {
  //   handleSellerAttribute();
  // }, [seller_attribute]);

  // useEffect(() => {
  //   handleInputChange();
  // }, []);

  useEffect(() => {
    handleDate();
  }, [startDate, endDate]);

  console.log('sellerTable_filter', filter);

  return (
    <Container>
      <Table>
        <thead>
          <tr>
            <th>
              <input type='checkbox' />
            </th>
            <th>번호</th>
            <th>셀러아이디</th>
            <th>영문이름</th>
            <th>한글이름</th>
            <th>담당자이름</th>
            <th>셀러상태</th>
            <th>담당자연락처</th>
            <th>담당자이메일</th>
            <th>셀러속성</th>
            <th>등록일시</th>
            <th>Actions</th>
          </tr>
          <tr>
            <td></td>
            <td>
              <input name='id' type='text' onChange={handleInputChange} />
            </td>
            <td>
              <input
                name='identification'
                type='text'
                onChange={handleInputChange}
              />
            </td>
            <td>
              <input
                name='seller_name_en'
                type='text'
                onChange={handleInputChange}
              />
            </td>
            <td>
              <input
                name='seller_name_ko'
                type='text'
                onChange={handleInputChange}
              />
            </td>
            <td>
              <input
                name='manager_name'
                type='text'
                onChange={handleInputChange}
              />
            </td>
            <td>
              <select value={seller_status || ''} onChange={handleSellerStatus}>
                <option value=''>Select</option>
                <option value='1'>입점대기</option>
                <option value='2'>입점</option>
                <option value='5'>퇴점</option>
                <option value='4'>퇴점대기</option>
                <option value='3'>휴점</option>
              </select>
            </td>
            <td>
              <input
                name='manager_contact'
                type='tel'
                onChange={handleInputChange}
              />
            </td>
            <td>
              <input
                name='manager_email'
                type='text'
                onChange={handleInputChange}
              />
            </td>
            <td>
              <select
                value={seller_attribute || ''}
                onChange={handleSellerAttribute}
              >
                <option value='select'>Select</option>
                <option value='1'>쇼핑몰</option>
                <option value='2'>로드샵</option>
              </select>
            </td>
            <td>
              <DateGroup>
                <StartDateGroup>
                  <DatePicker
                    className='datePickerStyle'
                    selected={startDate}
                    placeholderText='From'
                    dateFormat='yyyy/MM/dd'
                    onChange={(date) => setStartDate(date)}
                  />
                  <label htmlFor='startDatePicker'>
                    <MdDateRange />
                  </label>
                </StartDateGroup>
                <EndDateGroup>
                  <DatePicker
                    className='datePickerStyle'
                    id='endDatePicker'
                    name='end_date'
                    selected={endDate}
                    placeholderText='To'
                    dateFormat='yyyy/MM/dd'
                    onChange={(date) => setEndDate(date)}
                  />
                  <label htmlFor='endDatePicker'>
                    <MdDateRange />
                  </label>
                </EndDateGroup>
              </DateGroup>
            </td>
            <td>
              <ButtonGroup>
                <Button onClick={(filter) => handleSellerData(filter)}>
                  Serarch
                </Button>
                <Button primary>Reset</Button>
              </ButtonGroup>
            </td>
          </tr>
        </thead>
        <tbody>
          {sellerList &&
            sellerList.map((seller) => {
              const {
                id,
                identification,
                seller_name_en,
                seller_name_ko,
                seller_category,
                seller_id,
                manager_name,
                seller_status,
                manager_contact,
                manager_email,
                seller_attribute,
                number_of_product,
                url,
                created_at,
                actions,
              } = seller;
              return (
                <tr key={id}>
                  <td>
                    <input type='checkbox' />
                  </td>
                  <td></td>
                  <td>{identification}</td>
                  <td>{seller_name_en}</td>
                  <td>{seller_name_ko}</td>
                  <td>{manager_name}</td>
                  <td>{seller_status}</td>
                  <td>{manager_contact}</td>
                  <td>{manager_email}</td>
                  <td>{seller_attribute}</td>
                  <td>{created_at}</td>
                  <td>{actions}</td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </Container>
  );
}

export default SellerTable;

const Container = styled.div`
  margin: 10px 0;
  width: 100%;
  overflow: auto;
  border: 1px solid #ddd;
`;

const Table = styled.table`
  width: 100%;
  white-space: nowrap;
  background-color: #eeeeee;
  font-size: 14px;
  text-align: left;

  thead {
    th {
      padding: 8px;
      background-color: #eeeeee;
      font-size: 14px;
      text-align: left;
    }

    input,
    select {
      padding: 6px 10px;
      height: 30px;
      background-color: #fff;
      border: 1px solid #e5e5e5;
      border-radius: 4px;
      font-size: 13px;
    }
  }

  tr {
    &:nth-child(odd) {
      background-color: #f9f9f9;
    }

    th,
    td {
      padding: 8px;
      font-size: 13px;
      border: 1px solid #ddd;
    }
  }
`;

const DateGroup = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const StartDateGroup = styled.div`
  svg {
    position: absolute;
    right: 4px;
    top: 4px;
    width: 20px;
    height: 20px;
  }
`;

const EndDateGroup = styled.div`
  svg {
    position: absolute;
    right: 4px;
    top: 34px;
    width: 20px;
    height: 20px;
  }
`;

const ButtonGroup = styled.div`
  ${({ theme }) => theme.flex(null, null, 'column')}
`;
const Button = styled.button`
  margin-bottom: 5px;
  padding: 5px 10px;
  background-color: #f0ad4e;
  border-radius: 3px;
  color: #fff;
  font-size: 12px;
  font-weight: 400;
  cursor: pointer;
  ${(props) =>
    props.primary &&
    css`
      background-color: #d9534f;
    `};
`;
