import React, { useState } from 'react';
import styled from 'styled-components';

function ImgBox() {
  const [ImgBase, setImgBase] = useState(''); // 업로드 될 이미지
  const [imgFile, setImgFile] = useState(null); // 파일 전송을 위한 state
  const handleChangeFile = (event) => {
    let reader = new FileReader();

    reader.onloadend = (e) => {
      // 2. 읽기가 완료되면 아래코드가 실행됩니다.
      const base = reader.result;
      if (base) {
        setImgBase(base.toString()); // 파일 base 상태 업데이트
      }
    };
    if (event.target.files[0]) {
      reader.readAsDataURL(event.target.files[0]); // 1. 파일을 읽어 버퍼에 저장합니다.
      setImgFile(event.target.files[0]); // 파일 상태 업데이트
    }
  };
  return (
    <div>
      <ImgUpload>
        <ImgPreview
          width='130px'
          height='100px'
          imgWidth='90px'
          imgHeight='90px'
        >
          {ImgBase ? (
            <img src={ImgBase} />
          ) : (
            <BaseImg src='/public/Images/intern_seller_profile.jpeg' /> //이미지 업로드 되기 전 기본 이미지
          )}
        </ImgPreview>
        <ImgAdd>
          <label htmlFor='ex_file'>이미지 선택</label>
          <input type='file' id='ex_file' onChange={handleChangeFile} />
        </ImgAdd>
      </ImgUpload>
    </div>
  );
}

export default ImgBox;

const ImgUpload = styled.div``;

const ImgPreview = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  vertical-align: middle;
  text-align: center;
  border: 1px solid #eee;
  background-color: #fff;
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
    border: 1px solid #eee;
    border-radius: 4px;
    background-color: #fff;
  }
  input {
    margin-top: 15px;
    width: 1px;
    height: 1px;
    overflow: hidden;
  }
`;
