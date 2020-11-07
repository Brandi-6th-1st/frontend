import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { useHistory } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import dateFormatChange from '../../Components/ChangeTimeFormat';
import { MdDateRange } from 'react-icons/md';
import { BiSearchAlt2 } from 'react-icons/bi';
import './react-datepicker.css';

function SellerTable({
  sellerList,
  filter,
  setFilter,
  handleSellerData,
  getSellerData,
}) {
  //필터 기간 정보 담을  state
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const history = useHistory();
  const {
    id,
    identification,
    english_name,
    korean_name,
    manager_name,
    status_name,
    contact,
    email,
    attribute,
    limit,
    offset,
    start_date,
    end_date,
  } = filter;

  //입점 상태 값을 filter state에 담아줄 함수
  const handleSellerStatus = (e) => {
    e.persist();
    const nextFilter = {
      ...filter,
      status_name: e.target.value,
    };
    setFilter(nextFilter);
  };

  //쇼핑몰 또는 마켓 정보를 filter state에 담아줄 함수
  const handleSellerAttribute = (e) => {
    e.persist();
    const nextFilter = {
      ...filter,
      attribute: e.target.value,
    };
    setFilter(nextFilter);
  };

  //번호, 셀러아이디, 영문이름, 한글이름,	담당자이름, 담당자연락처, 담당자이메일 값을 filter state에 담아줄 함수
  const handleInputChange = (e) => {
    e.persist();
    const nextFilter = {
      ...filter,
      [e.target.name]: e.target.value,
    };
    setFilter(nextFilter);
  };

  //시작~끝 날짜 정보를 filter state에 담아줄 함수
  const handleDate = () => {
    const nextFilter = {
      ...filter,
      start_date: dateFormatChange(startDate),
      end_date: dateFormatChange(endDate),
    };
    setFilter(nextFilter);
  };

  //시작 날짜, 끝 날짜가 변경될 때마다 handleDate함수가 실행되도록
  useEffect(() => {
    handleDate();
  }, [startDate, endDate]);

  //아이디 클릭시 상세페이지로 이동
  const goToDetail = () => {
    history.push('/userdetail');
  };

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
                name='english_name'
                type='text'
                onChange={handleInputChange}
              />
            </td>
            <td>
              <input
                name='korean_name'
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
              <select value={status_name || ''} onChange={handleSellerStatus}>
                <option value=''>Select</option>
                <option value='1'>입점대기</option>
                <option value='2'>입점</option>
                <option value='5'>퇴점</option>
                <option value='4'>퇴점대기</option>
                <option value='3'>휴점</option>
              </select>
            </td>
            <td>
              <input name='contact' type='tel' onChange={handleInputChange} />
            </td>
            <td>
              <input name='email' type='text' onChange={handleInputChange} />
            </td>
            <td>
              <select value={attribute || ''} onChange={handleSellerAttribute}>
                <option value='select'>Select</option>
                <option value='1'>쇼핑몰</option>
                <option value='2'>마켓</option>
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
                  <BiSearchAlt2 />
                  Serarch
                </Button>
                <Button primary onClick={getSellerData}>
                  Reset
                </Button>
              </ButtonGroup>
            </td>
          </tr>
        </thead>
        <tbody>
          {sellerList &&
            sellerList.map((seller, i) => {
              const {
                id,
                attribute_id,
                contact,
                created_at,
                email,
                english_name,
                identification,
                korean_name,
                manager_name,
                status_name,
                actions,
              } = seller;
              return (
                <tr key={i}>
                  <td>
                    <input type='checkbox' />
                  </td>
                  <td>{id}</td>
                  <td onClick={goToDetail}>{identification}</td>
                  <td>{english_name}</td>
                  <td>{korean_name}</td>
                  <td>{manager_name}</td>
                  <td>{status_name}</td>
                  <td>{contact}</td>
                  <td>{email}</td>
                  <td>{attribute_id}</td>
                  <td>{created_at}</td>
                  {/* 입점 상태에 따른 액션 버튼 개수(2개, 3개)가 달라서 map 함수 사용*/}
                  <td>
                    {actions &&
                      actions.map((action, i) => {
                        return (
                          <ActionButton
                            key={i}
                            actionName={action.action_name}
                            // 액션 타입에 따른 버튼 색 변경
                            bgColor={ACTIONS[action.action_name]}
                          >
                            {action.action_name}
                          </ActionButton>
                        );
                      })}
                  </td>
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
  ${({ theme }) => theme.flex('center', null, 'column')}
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

const ActionButton = styled.button`
  margin-right: 5px;
  padding: 1px 5px;
  border-radius: 3px;
  background-color: ${({ bgColor }) => bgColor};
  color: #fff;
`;

const ACTIONS = {
  '입점 승인': '#5bc0de',
  '입점 거절': '#d9534f',
  '휴점 신청': '#f0ad4e',
  '퇴점신청 처리': '#d9534f',
  '휴점 해제': '#5cb85c',
  '퇴점철회 처리': '#5cb85c',
  '퇴점확정 처리': '#d9534f',
};

//Reducer
// import React, { useReducer, useState, useEffect } from 'react';
// import styled, { css } from 'styled-components';
// import DatePicker from 'react-datepicker';
// import dateFormatChange from '../../Components/ChangeTimeFormat';
// import { MdDateRange } from 'react-icons/md';
// import './react-datepicker.css';

// function sellerFilter(state, action) {
//   switch (action.type) {
//     case 'setId':
//       return { ...state, id: action.id };
//     case 'setIdentification':
//       return { ...state, identification: action.identification };
//     case 'setEnglish_name':
//       return { ...state, english_name: action.english_name };
//     case 'setKorean_name':
//       return { ...state, korean_name: action.korean_name };
//     case 'setManager_name':
//       return { ...state, manager_name: action.manager_name };
//     case 'setStatus':
//       return { ...state, status: action.status };
//     case 'setContact':
//       return { ...state, contact: action.contact };
//     case 'setStatus':
//       return { ...state, status: action.status };
//     case 'setAttribute':
//       return { ...state, attribute: action.attribute };
//     case 'setStartDate':
//       return { ...state, start_date: action.start_date };
//     case 'setEndDate':
//       return { ...state, end_date: action.end_date };
//     case 'reset':
//       return INITIAL_STATE;
//     default:
//       return state;
//   }
// }
// const INITIAL_STATE = {
//   limit: null,
//   offset: null,
//   id: null,
//   identification: null,
//   english_name: null,
//   korean_name: null,
//   manager_name: null,
//   status: null,
//   contact: null,
//   email: null,
//   attribute: null,
//   start_date: null,
//   end_date: null,
// };

// function SellerTable({ sellerList }) {
//   const [startDate, setStartDate] = useState('');
//   const [endDate, setEndDate] = useState('');

//   const [state, dispatch] = useReducer(sellerFilter, INITIAL_STATE);

//   const handleDate = () => {
//     const nextFilter = {
//       ...filter,
//       start_date: dateFormatChange(startDate),
//       end_date: dateFormatChange(endDate),
//     };
//     setFilter(nextFilter);
//   };

//   useEffect(() => {
//     console.log('satate', state);
//   }, [state]);

//   return (
//     <Container>
//       <Table>
//         <thead>
//           <tr>
//             <th>
//               <input type='checkbox' />
//             </th>
//             <th>번호</th>
//             <th>셀러아이디</th>
//             <th>영문이름</th>
//             <th>한글이름</th>
//             <th>담당자이름</th>
//             <th>셀러상태</th>
//             <th>담당자연락처</th>
//             <th>담당자이메일</th>
//             <th>셀러속성</th>
//             <th>등록일시</th>
//             <th>Actions</th>
//           </tr>
//           <tr>
//             <td></td>
//             <td>
//               <input
//                 name='id'
//                 type='text'
//                 value={state.id}
//                 onChange={(e) =>
//                   dispatch({ type: 'setId', id: e.currentTarget.value })
//                 }
//               />
//             </td>
//             <td>
//               <input
//                 name='identification'
//                 type='text'
//                 value={state.identification}
//               />
//             </td>
//             <td>
//               <input
//                 name='english_name'
//                 type='text'
//                 value={state.english_name}
//               />
//             </td>
//             <td>
//               <input name='korean_name' type='text' value={state.korean_name} />
//             </td>
//             <td>
//               <input
//                 name='manager_name'
//                 type='text'
//                 value={state.manager_name}
//               />
//             </td>
//             <td>
//               <select value={state.status}>
//                 <option value=''>Select</option>
//                 <option value='1'>입점대기</option>
//                 <option value='2'>입점</option>
//                 <option value='5'>퇴점</option>
//                 <option value='4'>퇴점대기</option>
//                 <option value='3'>휴점</option>
//               </select>
//             </td>
//             <td>
//               <input name='contact' type='tel' value={state.contact} />
//             </td>
//             <td>
//               <input name='email' type='text' value={state.email} />
//             </td>
//             <td>
//               <select value={state.attirbute}>
//                 <option value=''>Select</option>
//                 <option value='1'>쇼핑몰</option>
//                 <option value='2'>로드샵</option>
//               </select>
//             </td>
//             <td>
//               <DateGroup>
//                 <StartDateGroup>
//                   <DatePicker
//                     className='datePickerStyle'
//                     selected={state.start_date}
//                     placeholderText='From'
//                     dateFormat='yyyy/MM/dd'
//                     onChange={(date) =>
//                       dispatch({
//                         type: 'setStartDate',
//                         start_date: date.currentTarget.selected,
//                       })
//                     }
//                   />
//                   <label htmlFor='startDatePicker'>
//                     <MdDateRange />
//                   </label>
//                 </StartDateGroup>
//                 <EndDateGroup>
//                   <DatePicker
//                     className='datePickerStyle'
//                     id='endDatePicker'
//                     name='end_date'
//                     selected={state.end_date}
//                     placeholderText='To'
//                     dateFormat='yyyy/MM/dd'
//                     onChange={(date) => setEndDate(date)}
//                   />
//                   <label htmlFor='endDatePicker'>
//                     <MdDateRange />
//                   </label>
//                 </EndDateGroup>
//               </DateGroup>
//             </td>
//             <td>
//               <ButtonGroup>
//                 <Button>Serarch</Button>
//                 <Button primary>Reset</Button>
//               </ButtonGroup>
//             </td>
//           </tr>
//         </thead>
//         <tbody>
//           {sellerList &&
//             sellerList.map((seller) => {
//               const {
//                 id,
//                 identification,
//                 english_name,
//                 korean_name,
//                 s_name,
//                 status,
//                 contact,
//                 email,
//                 at_name,
//                 created_at,
//               } = seller;
//               return (
//                 <tr key={id}>
//                   <td>
//                     <input type='checkbox' />
//                   </td>
//                   <td>{id}</td>
//                   <td>{identification}</td>
//                   <td>{english_name}</td>
//                   <td>{korean_name}</td>
//                   <td>{s_name}</td>
//                   <td>{status}</td>
//                   <td>{contact}</td>
//                   <td>{email}</td>
//                   <td>{at_name}</td>
//                   <td>{created_at}</td>
//                   <td></td>
//                 </tr>
//               );
//             })}
//         </tbody>
//       </Table>
//     </Container>
//   );
// }

// export default SellerTable;

// const Container = styled.div`
//   margin: 10px 0;
//   width: 100%;
//   overflow: auto;
//   border: 1px solid #ddd;
// `;

// const Table = styled.table`
//   width: 100%;
//   white-space: nowrap;
//   background-color: #eeeeee;
//   font-size: 14px;
//   text-align: left;

//   thead {
//     th {
//       padding: 8px;
//       background-color: #eeeeee;
//       font-size: 14px;
//       text-align: left;
//     }

//     input,
//     select {
//       padding: 6px 10px;
//       height: 30px;
//       background-color: #fff;
//       border: 1px solid #e5e5e5;
//       border-radius: 4px;
//       font-size: 13px;
//     }
//   }

//   tr {
//     &:nth-child(odd) {
//       background-color: #f9f9f9;
//     }

//     th,
//     td {
//       padding: 8px;
//       font-size: 13px;
//       border: 1px solid #ddd;
//     }
//   }
// `;

// const DateGroup = styled.div`
//   display: flex;
//   flex-direction: column;
//   position: relative;
// `;

// const StartDateGroup = styled.div`
//   svg {
//     position: absolute;
//     right: 4px;
//     top: 4px;
//     width: 20px;
//     height: 20px;
//   }
// `;

// const EndDateGroup = styled.div`
//   svg {
//     position: absolute;
//     right: 4px;
//     top: 34px;
//     width: 20px;
//     height: 20px;
//   }
// `;

// const ButtonGroup = styled.div`
//   ${({ theme }) => theme.flex(null, null, 'column')}
// `;
// const Button = styled.button`
//   margin-bottom: 5px;
//   padding: 5px 10px;
//   background-color: #f0ad4e;
//   border-radius: 3px;
//   color: #fff;
//   font-size: 12px;
//   font-weight: 400;
//   cursor: pointer;
//   ${(props) =>
//     props.primary &&
//     css`
//       background-color: #d9534f;
//     `};
// `;
