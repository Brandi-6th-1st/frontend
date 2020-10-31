import React, { useState, Fragment } from 'react';
import styled from 'styled-components';

function ImgBox({
  boxWidth,
  boxHeight,
  imgWidth,
  imgHeight,
  handleChangeFile,
  // profileImgFile,
  // setProfileImgFile,
  // backgroundImgFile,
  // setBackgroundImgFile,
  // profileImgBase64,
  // setProfileImgBase64,
  // backgroundImgBase64,
  // setBackgroundImgBase64,
  imgBase64,
  setImgBase64,
  imgFile,
  setImgFile,
}) {
  // const [ImgBase64, setImgBase64] = useState(''); // 업로드 될 이미지
  // const [imgFile, setImgFile] = useState(null); // 파일 전송을 위한 state

  // const handleChangeFile = (event) => {
  //   let reader = new FileReader();

  //   reader.onloadend = (e) => {
  //     // 2. 읽기가 완료되면 아래코드가 실행됩니다.
  //     const base64 = reader.result;
  //     console.log(base64);
  //     if (base64) {
  //       setImgBase64(base64.toString()); // 파일 base 상태 업데이트
  //     }
  //   };
  //   if (event.target.files[0]) {
  //     reader.readAsDataURL(event.target.files[0]); // 1. 파일을 읽어 버퍼에 저장합니다.
  //     setImgFile(event.target.files[0]); // 파일 상태 업데이트
  //   }
  // };
  return (
    <Fragment>
      <form id='formEl'>
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
            <label htmlFor='imgFile'>이미지 선택</label>
            <input
              type='file'
              id='imgFile'
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
