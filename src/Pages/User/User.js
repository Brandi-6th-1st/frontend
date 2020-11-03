import React, { Fragment, useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import regeneratorRuntime from 'regenerator-runtime';
import Header from '../../Components/Header/Header';
import Nav from '../../Components/Nav/Nav';
import AccountManagementTitle from './AccountManagementTitle';
import SellerInfoManagement from './SellerInfoManagement';
import Footer from '../../Components/Footer/Footer';

export default function SellerInformation() {
  const [sellerInfo, setSellerInfo] = useState();
  const [sellerList, setSellerList] = useState();

  const getSellerData = () => {
    fetch('public/Data/SellerStatus.json')
      .then((response) => response.json())
      // .then((result) =>
      //   console.log(result.seller_status_record[0].status_history[0].status)
      // );
      .then((result) => setSellerInfo(result.seller_status_record[0]));
  };

  const getSellerList = () => {
    fetch(`public/Data/SellerListData.json`)
      .then((response) => response.json())
      .then((result) => setSellerList(result.seller_list));
  };
  useEffect(() => {
    getSellerData();
    getSellerList();
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
        <AccountManagementTitle sellerList={sellerList} />
        {/* <SellerInfoManagement
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
        /> */}
      </Container>
      <Footer />
    </Fragment>
  );
}

const Container = styled.div`
  width: 100%;
  display: flex;
`;
