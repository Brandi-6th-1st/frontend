import React, { Fragment } from 'react';
import styled, { css } from 'styled-components';
import { useForm } from 'react-hook-form';
import BasicInfo from './BasicInfo';
import MoreInfo from './MoreInfo';
import { AiOutlineHome } from 'react-icons/ai';
import { FaUserAlt } from 'react-icons/fa';

function SellerInfoMangement({
  sellerInfo,
  setSellerInfo,
  handleChangeFile,
  handleProfileImg,
  handleBackgroundImg,
  profileImgBase64,
  setProfileImgBase64,
  profileImgFile,
  setProfileImgFile,
  backgroundImgBase64,
  setBackgroundImgBase64,
  backgroundImgFile,
  setBackgroundImgFile,
  imgBase64,
  setImgBase64,
  imgFile,
  setImgFile,
}) {
  const onSubmit = (data) => console.log(data);

  const handleClick = () => {
    console.log('dddddd');
  };

  return (
    <Fragment>
      {sellerInfo && (
        <Container>
          <PageTitle>
            셀러정보 관리<small> 셀러 정보 조회 / 수정</small>
          </PageTitle>
          <PageBar>
            <AiOutlineHome />
            <p>회원관리 > 셀러정보 관리 > 셀러정보 조회 / 수정</p>
          </PageBar>
          <form onClick={handleClick}>
            <BasicInfo
              sellerInfo={sellerInfo}
              // handleChangeFile={handleChangeFile}
              // imgBase64={imgBase64}
              // setImgBase64={setImgBase64}
              // imgFile={imgFile}
              // setImgFile={setImgFile}
              // handleProfileImg={handleProfileImg}
              profileImgBase64={profileImgBase64}
              setProfileImgBase64={setProfileImgBase64}
              profileImgFile={profileImgFile}
              setProfileImgFile={setProfileImgFile}
            />
            <MoreInfo
              sellerInfo={sellerInfo}
              setSellerInfo={setSellerInfo}
              // handleChangeFile={handleChangeFile}
              // imgBase64={imgBase64}
              // setImgBase64={setImgBase64}
              // imgFile={imgFile}
              // setImgFile={setImgFile}
              // handleBackgroundImg={handleBackgroundImg}
              backgroundImgBase64={backgroundImgBase64}
              setBackgroundImgBase64={setBackgroundImgBase64}
              backgroundImgFile={backgroundImgFile}
              setBackgroundImgFile={setBackgroundImgFile}
            />
            <ButtonGroup>
              <Button primary type='submit' value='수정' />
              <Button type='button' value='취소' />
            </ButtonGroup>
          </form>
        </Container>
      )}
    </Fragment>
  );
}

export default SellerInfoMangement;

const Container = styled.div`
  width: 100%;
  margin-top: 50px;
  padding: 25px 20px 20px 20px;
  background-color: #fafafa;
  border-radius: 0 0 0 4px;
`;

const PageTitle = styled.h3`
  margin-bottom: 15px;
  color: #666;
  font-weight: 300;
`;

const PageBar = styled.div`
  ${({ theme }) => theme.flex(null, 'center')}
  margin: 0 -20px 10px -20px;
  padding-left: 20px;
  background-color: #eee;
  font-size: 13px;
  line-height: 1.5;
  p {
    margin-left: 5px;
  }
`;

const ButtonGroup = styled.div`
  ${({ theme }) => theme.flex('center')}
  margin-top: 20px;
`;

const Button = styled.input`
  padding: 6px 12px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  text-align: center;
  ${(props) =>
    props.primary &&
    css`
      margin-right: 5px;
      background-color: #5cb85c;
      border: none;
      color: #fff;
    `};
`;
