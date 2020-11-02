import React, { Fragment, useState } from 'react';
import styled from 'styled-components';
import DaumPostcode from 'react-daum-postcode';

function PostCode() {
  const [address, setAddress] = useState('');
  const [zipCode, setZipcode] = useState('');
  const [fullAddress, setFullAddress] = useState('');
  const [isDaumPost, setIsDaumPost] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [register, setRigester] = useState([]);

  handleOpenPost = () => {
    setIsDaumPost(true);
  };

  const handleComplete = (data) => {
    let zoneCode = data.zonecode;
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddres += data.bname;
      }
      if (data.builidngName !== '') {
        extraAddress +=
          extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? `(${extraAddress}) ` : '';
    }
    console.log(fullAddress);
  };
  return (
    <Fragment>
      <DaumPostcode onComplete={handleComplete} autoClose />
      <div>
        <input type='text' id='postcode' placeholder='우편번호' />
        <input type='button' onClick={execDaumPostcode} value='우편번호 찾기' />
      </div>
      <div>
        <input type='text' id='address' placeholder='주소 (택배 수령지)' />
      </div>
      <div>
        <input
          type='text'
          id='detailAddress'
          placeholder='상세주소 (택배 수령지)'
        />
      </div>

      <Wrapper>
        <img
          src='//t1.daumcdn.net/postcode/resource/images/close.png'
          alt='closeBtn'
          onClick={foldDaumPostcode}
        />
      </Wrapper>
      <script src='https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js'></script>
    </Fragment>
  );
}

export default PostCode;

const Wrapper = styled.div`
  margin: 5px;
  width: 500px;
  height: 300px;
  display: none;
  border: 1px solid;

  img {
    position: absolute;
    right: 0px;
    top: -1px;
    cursor: pointer;
    z-index: 1;
  }
`;
