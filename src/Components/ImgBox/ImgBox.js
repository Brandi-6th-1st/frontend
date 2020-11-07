import React, { useState, useEffect, Fragment } from 'react';
import styled from 'styled-components';

function ImgBox({
  boxWidth,
  boxHeight,
  imgWidth,
  imgHeight,
  handleChangeFile,
  imgBase64,
  imgId,
  setImgBase64,
  imgFile,
  setImgFile,
  handleProfileImg,
  handleBackgroundImg,
}) {
  useEffect(() => {
    console.log(imgBase64);
  }, [imgBase64]);

  return (
    <Fragment>
      <form>
        <ImgUpload>
          {/* props로 전달받을 박스 크기와 이미지 크기 */}
          <ImgPreview
            boxWidth={boxWidth}
            boxHeight={boxHeight}
            imgWidth={imgWidth}
            imgHeight={imgHeight}
          >
            {imgBase64 ? (
              <img src={imgBase64} />
            ) : (
              <BaseImg src='/public/Images/intern_seller_profile.jpeg' /> //이미지 업로드 되기 전 기본 이미지
            )}
          </ImgPreview>
          <ImgAdd>
            <label htmlFor={imgId}>이미지 선택</label>
            <input
              type='file'
              id={imgId}
              accept='image/jpg, image/jpeg, image/png'
              onChange={handleChangeFile}
            />
          </ImgAdd>
        </ImgUpload>
      </form>
    </Fragment>
  );
}

export default ImgBox;

const ImgUpload = styled.div``;

const ImgPreview = styled.div`
  ${({ theme }) => theme.flex('center', 'center')}
  width: ${(props) => props.boxWidth};
  height: ${(props) => props.boxHeight};
  background-color: #fff;
  vertical-align: middle;
  border: 1px solid #eee;
  text-align: center;
  img {
    width: ${(props) => props.imgWidth};
    height: ${(props) => props.imgHeight};
  }
`;

const BaseImg = styled.img`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
`;

const ImgAdd = styled.div`
  margin-bottom: 20px;
  label {
    padding: 10px;
    background-color: #fff;
    border: 1px solid #eee;
    border-radius: 4px;
  }
  input {
    width: 1px;
    height: 1px;
    margin-top: 15px;
    overflow: hidden;
  }
`;
