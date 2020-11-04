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

export default function SellerInformation() {
  const [masterType, setMasterType] = useState();
  const [sellerInfo, setSellerInfo] = useState();
  const [sellerList, setSellerList] = useState();
  //쿼리스트링 관련 state
  const [filter, setFilter] = useState({
    limit: 10,
    offset: 0,
    id: null,
    identification: null,
    seller_name_en: null,
    seller_name_ko: null,
    manager_name: null,
    seller_status: null,
    manager_contact: null,
    manager_email: null,
    seller_attribute: null,
    start_date: null,
    end_date: null,
  });

  //테이블에서 페이지네이션을 위한 현재페이지 상태
  const [currentPage, setCurrentPage] = useState(1);

  //로그인할 때 받았던 master type 정보 확인
  const { is_master } = useSelector(({ userInfo }) => ({
    is_master: userInfo.is_master,
  }));

  //셀러 정보수정페이지
  const getData = () => {
    fetch('public/Data/SellerStatus.json')
      .then((response) => response.json())
      .then((result) => setSellerInfo(result.seller_status_record[0]));
  };

  //셀러 계정관리페이지 search 버튼 클릭 시 실행될 함수
  const handleSellerData = async (param) => {
    const result = await axios.get(
      `http://0.251.1.196:5000/account/sellerlist`,
      {
        params: param,
        timeout: 3000,
      },
      {
        headers: { Authorization: localStorage.getItem('token') },
      }
    );
    setSellerList(result.data);
  };
  // const handleSellerData = async (param) => {
  //   const result = await axios.get(`http://${API}/account`, {
  //     params: param,
  //     timeout: 3000,
  //   });
  // const {
  //   limit,
  //   offset,
  //   id,
  //   identification,
  //   seller_name_en,
  //   seller_name_ko,
  //   manager_name,
  //   seller_status,
  //   manager_contact,
  //   manager_email,
  //   seller_attribute,
  //   start_date,
  //   end_date,
  // } = filter;
  // const nextFilter = {
  //   ...filter,
  //   limit: limt != 10 ? limit : null,
  //   offset:
  //     (currentPage - 1) * limit !== 0 ? (currentPage - 1) * limit : null,
  //   id: id ? id : null,
  //   identification: identification,
  //   seller_name_en: seller_name_en,
  //   seller_name_ko: seller_name_ko,
  //   manager_name: manager_name,
  //   seller_status: seller_status,
  //   manager_contact: manager_contact,
  //   manager_email: manager_email,
  //   seller_attribute: seller_attribute,
  //   start_date: start_date,
  //   end_date: end_date,

  //   // .then((result)=>setSellerList(result.serller_list))
  // };

  // setFilter(nextFilter);
  // };

  //셀러 계정관리페이지
  const getSellerList = () => {
    fetch(`public/Data/SellerListData.json`)
      .then((response) => response.json())
      .then((result) => setSellerList(result.seller_list));
  };

  useEffect(() => {
    getData();
    getSellerList();
    setMasterType(is_master);
  }, []);

  // console.log(sellerInfo && sellerInfo[0].status_history[0].status);

  // useEffect(async () => {
  //   const fetchData = await axios.get(`public/Data/SellerListData.json`);
  //   // .then((response) => console.log(response));
  //   setSellerList(result.data);
  // }, []);

  //img upload
  const [imgBase64, setImgBase64] = useState(''); // 업로드 될 이미지
  const [imgFile, setImgFile] = useState(null); // 파일 전송을 위한 state
  const [profileImgBase64, setProfileImgBase64] = useState('');
  const [profileImgFile, setProfileImgFile] = useState(null);
  const [backgroundImgBase64, setBackgroundImgBase64] = useState('');
  const [backgroundImgFile, setBackgroundImgFile] = useState(null);

  const handleChangeFile = (event, setImgBase64, setImgFile) => {
    let reader = new FileReader();

    reader.onloadend = () => {
      // 2. 읽기가 완료되면 아래코드가 실행됩니다.
      const base64 = reader.result;
      // console.log(base64);
      if (base64) {
        setImgBase64(base64.toString()); // 파일 base 상태 업데이트
      }
    };
    if (event.target.files[0]) {
      reader.readAsDataURL(event.target.files[0]); // 1. 파일을 읽어 버퍼에 저장합니다.
      setImgFile(event.target.files[0]); // 파일 상태 업데이트
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
            // handleProfileImg={handleProfileImg}
            // profileImgBase64={profileImgBase64}
            // setProfileImgBase64={setProfileImgBase64}
            // profileImgFile={profileImgFile}
            // setProfileImgFile={setProfileImgFile}
            // handleBackgroundImg={handleBackgroundImg}
            // backgroundImgBase64={backgroundImgBase64}
            // setBackgroundImgBase64={setBackgroundImgBase64}
            // backgroundImgFile={backgroundImgFile}
            // setBackgroundImgFile={setBackgroundImgFile}
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
