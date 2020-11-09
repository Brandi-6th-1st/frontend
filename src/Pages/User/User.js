import React, { Fragment, useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useSelector } from 'react-redux';
import regeneratorRuntime from 'regenerator-runtime';
import Header from '../../Components/Header/Header';
import Nav from '../../Components/Nav/Nav';
import AccountManagementTitle from './Componenet/AccountManagementTitle';
import Footer from '../../Components/Footer/Footer';
import { API } from '../../config';

export default function User() {
  //마스터,셀러 여부 담을 state
  const [masterType, setMasterType] = useState();
  //계정 관리 페이지 data 담을 state
  const [sellerList, setSellerList] = useState();
  //계정 수정 페이지 data 담을 state
  const [sellerInfo, setSellerInfo] = useState();

  //쿼리스트링 관련 state
  const [filter, setFilter] = useState({
    limit: null,
    offset: null,
    id: null,
    identification: null,
    english_name: null,
    korean_name: null,
    manager_name: null,
    status: null,
    contact: null,
    email: null,
    attribute: null,
    start_date: null,
    end_date: null,
  });

  //테이블에서 페이지네이션을 위한 현재페이지 상태
  const [currentPage, setCurrentPage] = useState(1);
  const [sellerPerPage, setSellerPerPage] = useState(10);

  //로그인할 때 받았던 master type 정보 확인
  const { is_master } = useSelector(({ userInfo }) => ({
    is_master: userInfo.is_master,
  }));

  //셀러 계정 관리 페이지 초기 데이터
  const getSellerData = () => {
    fetch(`${API}5000/account/seller`, {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    })
      // fetch(`/public/Data/SellerList.json`)
      .then((response) => response.json())
      .then((result) => setSellerList(result));
  };

  //셀러 계정 관리 페이지 search 버튼 클릭 시 실행될 함수
  const handleSellerData = async () => {
    const {
      limit,
      offset,
      id,
      identification,
      english_name,
      korean_name,
      manager_name,
      contact,
      email,
    } = filter;
    const nextFilter = {
      ...filter,
      //input을 클릭했지만,값을 입력하지 않은 경우에는 빈 스트링으로 저장됨. 이 경우 값을 null로 바꿔주기

      // limit이 10인 경우 querystring 보내지 않음
      limit: limit ? limit : null,
      //1페이지의 경우 querystrign 보내지 않음
      offset: offset ? offset : null,
      id: id ? id : null,
      identification: identification ? identification : null,
      english_name: english_name ? english_name : null,
      korean_name: korean_name ? korean_name : null,
      manager_name: manager_name ? manager_name : null,
      contact: contact ? contact : null,
      email: email ? email : null,
    };
    setFilter(nextFilter);
    const result = await axios.get(
      `${API}5000/account/seller`,
      {
        params: filter,
      },
      {
        headers: { Authorization: localStorage.getItem('token') },
      }
    );
    setSellerList(result.data);
  };

  //계정 관리 페이지 record
  const handleRecordCount = (e) => {
    setSellerPerPage(e.target.value);
    const nextFilter = {
      ...filter,
      limit: e.target.value,
    };
    setFilter(nextFilter);
  };

  //셀러 정보수정페이지
  const getData = () => {
    fetch('/public/Data/SellerStatus.json')
      .then((response) => response.json())
      .then((result) => setSellerInfo(result.seller_status_record[0]));
  };

  useEffect(() => {
    getData();
    getSellerData();
    setMasterType(is_master);
  }, []);

  console.log(filter);
  return (
    <Fragment>
      <Header />
      <Container>
        <Nav />
        <AccountManagementTitle
          sellerList={sellerList}
          setSellerList={setSellerList}
          filter={filter}
          setFilter={setFilter}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          handleSellerData={handleSellerData}
          sellerPerPage={sellerPerPage}
          handleRecordCount={handleRecordCount}
          getSellerData={getSellerData}
        />
      </Container>
      <Footer />
    </Fragment>
  );
}

const Container = styled.div`
  width: 100%;
  display: flex;
`;
