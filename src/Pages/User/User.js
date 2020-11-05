import React, { Fragment, useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import regeneratorRuntime from 'regenerator-runtime';
import Header from '../../Components/Header/Header';
import Nav from '../../Components/Nav/Nav';
import AccountManagementTitle from './AccountManagementTitle';
import SellerInfoManagement from './SellerInfoManagement';
import Footer from '../../Components/Footer/Footer';
import API from '../../config';

export default function User() {
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
    // fetch(`http://10.251.1.196:5000/account/sellerlist`)
    fetch(`/public/Data/SellerList.json`)
      .then((response) => response.json())
      .then((result) => setSellerList(result.seller_list));
  };

  //셀러 계정관리페이지 search 버튼 클릭 시 실행될 함수
  const handleSellerData = async () => {
    const result = await axios.get(
      `http://10.251.1.196:5000/account/sellerlist`,
      {
        params: filter,
        timeout: 3000,
      },
      {
        headers: { Authorization: localStorage.getItem('token') },
      }
    );
    setSellerList(result.data);
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

  //img upload
  const [imgBase64, setImgBase64] = useState(''); // 업로드 될 이미지
  const [imgFile, setImgFile] = useState(null); // 파일 전송을 위한 state

  const handleChangeFile = (event) => {
    let reader = new FileReader();

    reader.onloadend = (e) => {
      // 2. 읽기가 완료되면 아래 코드 실행
      const base64 = reader.result;
      if (base64) {
        // 파일 base64 상태 업데이트
        setImgBase64(base64.toString());
      }
    };
    if (event.target.files[0]) {
      // 1. 파일을 읽어 버퍼에 저장
      reader.readAsDataURL(event.target.files[0]);
      // 파일 상태 업데이트
      setImgFile(event.target.files[0]);
      console.log(imgFile);
    }
  };

  return (
    <Fragment>
      <Header />
      <Container>
        <Nav />
        {is_master ? (
          <AccountManagementTitle
            sellerList={sellerList}
            filter={filter}
            setFilter={setFilter}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            handleSellerData={handleSellerData}
            sellerPerPage={sellerPerPage}
          />
        ) : (
          <SellerInfoManagement
            sellerInfo={sellerInfo}
            setSellerInfo={setSellerInfo}
            handleChangeFile={handleChangeFile}
            imgBase64={imgBase64}
            setImgBase64={setImgBase64}
            imgFile={imgFile}
            setImgFile={setImgFile}
          />
        )}
      </Container>
      <Footer />
    </Fragment>
  );
}

const Container = styled.div`
  width: 100%;
  display: flex;
`;
