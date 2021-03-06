import React, { Fragment, useState, useEffect } from 'react';
import regeneratorRuntime from 'regenerator-runtime';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import Filter from './Filter';
import OrderList from './OrderList';
import dateFormatChange from '../../Components/ChangeTimeFormat';
import COMPONENT_ORDER from './DataOrderComponent';
import { API } from '../../config';

export default function OrderManagement() {
  // 여러번 렌더되는 것을 막기위한 상태값
  const [isMounted, setIsMounted] = useState(false);
  // 히스토리 선언
  const history = useHistory();
  // 주소에 있는 id 파라미터로 동일한 컴포넌트에서 다른 데이터를 사용하여 각 주문 상태에 따른 내용을 가져옵니다.
  const match = useParams();
  // 해당 주소가 담겨 오면 숫자로 리턴한다.
  const categoryId = () => {
    if (match.id === 'prepareList') {
      return 1;
    }
    if (match.id === 'deliveryList') {
      return 2;
    }
    if (match.id === 'deliveryPrepareList') {
      return 2;
    }
    if (match.id === 'deliveryCompleteList') {
      return 3;
    }
    if (match.id === 'orderConfirmList') {
      return 4;
    }
    if (match.id === 'allOrderList') {
      return 4;
    }
    return match.id;
  };

  const pagetext = COMPONENT_ORDER[categoryId() - 1];

  // 현재 시간을 newData에 할당
  const newDate = new Date();

  // 몇일전, 몇달전으로 리턴하는 함수
  const changeDate = (dayAgo, monthAgo) => {
    const year = newDate.getFullYear();
    const month = newDate.getMonth() - monthAgo;
    const day = newDate.getDate() - dayAgo;
    return new Date(year, month, day);
  };

  // datePicker에서 현재 가지고 있는 상태
  const [currentDate, setCurrentDate] = useState({
    startDate: changeDate(3, 0),
    endDate: new Date(),
  });

  // 검색버튼 클릭시 보낼 데이터 관리
  const [params, setParams] = useState({
    startDate: null,
    endDate: null,
    searchKeyword: null,
    searchOption: null,
  });

  // axios.get 시 주문 항목 관리
  const [orderList, setOrderList] = useState();

  // 현재 클릭되어 있는 날짜 상태
  const [selectDate, setSelectDate] = useState([
    false,
    false,
    true,
    false,
    false,
    false,
  ]);

  const handleEndDate = (date) => {
    setCurrentDate({ ...currentDate, endDate: date });
  };

  // DatePicker 라이브러리에서 지원하는 form과 관리하는 form이 달라서 따로 관리해주었다.
  const handleStartDate = (date) => {
    setCurrentDate({ ...currentDate, startDate: date });
  };

  const filterReset = () => {
    setCurrentDate({
      startDate: changeDate(3, 0),
      endDate: new Date(),
    });
    setParams({
      startDate: null,
      endDate: null,
      searchKeyword: null,
      searchOption: null,
    });
    setSelectDate([false, false, true, false, false, false]);
  };

  // axios.get 하게되는 함수이다. params를 따로 인자로 빼어 params만 넣어서 언제든 실행 가능
  const getProductInfo = async (params) => {
    try {
      const url = () => {
        if (categoryId() === 1) {
          return `${API}/order/prepareList`;
          // return `/public/Data/DataProductPreManage.json`;
        }
        if (categoryId() === 2) {
          return `${API}/order/deliveryPrepareList`;
          // return `/public/Data/DataShippingMansge.json`;
        }
        if (categoryId() === 3) {
          return `${API}/order/deliveryList`;
          // return `/public/Data/DataDeliveryComplitedManage.json`;
        }
        if (categoryId() === 4) {
          return `${API}/order/deliveryCompleteList`;
          // return `/public/Data/DataConfirmPurchase.json`;
        }
        if (categoryId() === 5) {
          return `${API}/order/prepareList`;
          // return `/public/Data/DataConfirmPurchase.json`;
        }
      };
      console.log(url());
      const result = await axios.get(url(), {
        params: params,
        timeout: 3000, //3초
      });
      if (result.status === 200) {
        // setOrderList(result.data.data.success.productItem);
        setOrderList(result.data.success);
      } else {
        if (result.statusText === 'CONFLICT') {
          alert(result.data.client_message);
          history.push('/');
        }
      }
    } catch (err) {
      console.log(err);
      if (err.response) {
        if (err.response.statusText === 'UNAUTHORIZED') {
          alert(err.response.data.client_message);
          history.push('/');
        }
      } else if (err.request) {
        history.push('/');
        return alert('서버에서 응답이 없습니다.', err.request);
      }
    }
  };

  // 언마운트시 axios.get
  useEffect(() => {
    setIsMounted(true);
    getProductInfo();
  }, []);

  // 언마운트 완료 후
  useEffect(() => {
    if (isMounted) {
      getProductInfo();
      filterReset();
    }
  }, [categoryId()]);

  // 현재 클릭된 버튼에 따라 동작한다.
  const handleDate = (value, i) => {
    setSelectDate(
      selectDate && selectDate.map((el, idx) => (idx === i ? true : false))
    );

    if (value === '전체') {
      setParams({ ...params, startDate: null, endDate: null });
      setCurrentDate({ startDate: null, endDate: null });
    } else if (value === '오늘') {
      setParams({
        ...params,
        startDate: dateFormatChange(newDate),
        endDate: dateFormatChange(newDate),
      });
      setCurrentDate({
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
      setCurrentDate({
        startDate: changeDate(3, 0),
        endDate: new Date(),
      });
    } else if (value === '1주일') {
      setParams({
        ...params,
        startDate: dateFormatChange(changeDate(7, 0)),
        endDate: dateFormatChange(newDate),
      });
      setCurrentDate({
        startDate: changeDate(7, 0),
        endDate: new Date(),
      });
    } else if (value === '1개월') {
      setParams({
        ...params,
        startDate: dateFormatChange(changeDate(0, 1)),
        endDate: dateFormatChange(newDate),
      });
      setCurrentDate({
        startDate: changeDate(0, 1),
        endDate: new Date(),
      });
    } else if (value === '3개월') {
      setParams({
        ...params,
        startDate: dateFormatChange(changeDate(0, 3)),
        endDate: dateFormatChange(newDate),
      });
      setCurrentDate({
        startDate: changeDate(0, 3),
        endDate: new Date(),
      });
    }
  };

  // 검색버튼 클릭시 파람스에 객체를 넣어 해당 쿼리로 get
  const sendQuery = () => {
    const changeParams = {
      ...params,
      [`${params.searchOption}`]: params.searchKeyword,
      searchOption: null,
      searchKeyword: null,
    };
    console.log('전송될', changeParams);
    getProductInfo(changeParams);
  };

  // 현재 날짜가 변경되면 params도 최신화 시킨다.
  useEffect(() => {
    setParams({
      ...params,
      startDate: dateFormatChange(currentDate.startDate),
      endDate: dateFormatChange(currentDate.endDate),
    });
  }, [currentDate]);

  return (
    <ManagementContainer>
      <Title>
        <h3>주문 관리</h3>
        <span>{pagetext.title} 관리</span>
        <div>
          {pagetext.description &&
            pagetext.description.map((el, index) => <p key={index}>{el}</p>)}
        </div>
      </Title>
      <Filter
        handleStartDate={handleStartDate}
        handleEndDate={handleEndDate}
        pagetext={pagetext}
        currentDate={currentDate}
        setCurrentDate={setCurrentDate}
        handleDate={handleDate}
        selectDate={selectDate}
        params={params}
        setParams={setParams}
        sendQuery={sendQuery}
        filterReset={filterReset}
      />
      <OrderList
        pagetext={pagetext}
        orderList={orderList}
        setOrderList={setOrderList}
        setOrderList={setOrderList}
      />
    </ManagementContainer>
  );
}

const ManagementContainer = styled.div`
  width: 100%;
  min-height: 875px;
  padding: 72px 20px 20px 20px;
  background: #fafafa;
  border-radius: 0 0 0 4px;
`;

const Title = styled.div`
  h3 {
    display: inline-block;
    margin-right: 6px;
    color: #666;
    font-size: 26px;
    font-weight: 400;
    letter-spacing: -1px;
  }
  span {
    font-size: 14px;
    font-weight: 300;
    color: #888;
  }
  div {
    margin-top: 12px;
    p {
      font-size: 14px;
      font-weight: 400;
      color: #888;
      margin-bottom: 5px;
      line-height: 1.5;
    }
  }
`;
