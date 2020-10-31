import React, { Fragment } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { FaUserAlt } from 'react-icons/fa';
import { AiOutlineWarning, AiOutlineMail } from 'react-icons/ai';
import { ImPhone } from 'react-icons/im';
import ImgBox from '../../Components/ImgBox/ImgBox';
// import IconInput from '../../Components/IconInput/IconInput';

function MoreInfo({
  sellerInfo,
  handleChangeFile,
  // ackgroundImgBase64,
  // setBackgroundImgBase64,
  // backgroundImgFile,
  // setBackgroundImgFile,
  imgBase64,
  setImgBase64,
  imgFile,
  setImgFile,
}) {
  const { register, errors, watch, handleSubmit } = useForm({ mode: 'submit' });
  const onSubmit = (data) => console.log(data);

  const {
    manager_name,
    manager_contact,
    manager_email,
    status_history,
  } = sellerInfo[0];

  return (
    <Fragment>
      <MoreInfoBox>
        <InfoTitle>
          <FaUserAlt />
          <p>상세정보</p>
        </InfoTitle>
        <InfoBody>
          <Table>
            <tbody>
              <tr>
                <td>셀러페이지 배경이미지</td>
                <td>
                  <ImgBox
                    boxWidth='130px'
                    boxHeight='100px'
                    imgWidth='90px'
                    imgHeight='90px'
                    handleChangeFile={handleChangeFile}
                    imgBase64={imgBase64}
                    setImgBase64={setImgBase64}
                    imgFile={imgFile}
                    setImgFile={setImgFile}
                    // backgroundImgBase64={backgroundImgBase64}
                    // setBackgroundImgBase64={setBackgroundImgBase64}
                    // backgroundImgFile={backgroundImgFile}
                    // setBackgroundImgFile={setBackgroundImgFile}
                  />
                  <ExtraInfo>
                    <AiOutlineWarning />
                    <p>
                      브랜디 앱과 웹 사이트의 셀러 페이지에 보여질
                      배경이미지입니다.
                    </p>
                  </ExtraInfo>
                  <ExtraInfo>
                    <AiOutlineWarning />
                    <p>
                      배경이미지는 <b>1200 * 850</b> 사이즈 이상으로
                      등록해주세요.
                    </p>
                  </ExtraInfo>
                  <ExtraInfo>
                    <AiOutlineWarning />
                    <p>
                      확장자는 <b>jpg, jpeg, png</b> 만 가능하며, 허용 가능한
                      최대 파일사이즈 크기는 <b>5MB</b> 입니다.
                    </p>
                  </ExtraInfo>
                </td>
              </tr>
              <tr>
                <td>
                  담당자 정보<span>*</span>
                </td>
                <td>
                  <IconInput className={errors.managerName && 'ErrorInput'}>
                    <FaUserAlt color={errors.managerName ? '#b94a48' : null} />
                    <input
                      readOnly
                      name='managerName'
                      type='text'
                      placeholder={manager_name}
                      ref={register({
                        required: '필수 입력항목 입니다. ',
                      })}
                    />
                  </IconInput>
                  <IconInput className={errors.managerPhone && 'ErrorInput'}>
                    <ImPhone color={errors.managerPhone ? '#b94a48' : null} />
                    <input
                      readOnly
                      name='managerPhone'
                      type='text'
                      placeholder={manager_contact}
                      ref={register({
                        required: '필수 입력항목 입니다. ',
                      })}
                    />
                  </IconInput>
                  <IconInput className={errors.managerEmail && 'ErrorInput'}>
                    <AiOutlineMail
                      color={errors.managerEmail ? '#b94a48' : null}
                    />
                    <input
                      readOnly
                      name='managerEmail'
                      type='text'
                      placeholder={manager_email}
                      ref={register({
                        required: '필수 입력항목 입니다. ',
                      })}
                    />
                  </IconInput>
                </td>
              </tr>
              <tr>
                <td>셀러 상태 변경 기록</td>
                <td>
                  <MiniTable>
                    <thead>
                      <tr>
                        <td>셀러상태 변경 적용일시</td>
                        <td>셀러상태</td>
                      </tr>
                      {sellerInfo &&
                        status_history.map((history, i) => {
                          return (
                            <tr key={i}>
                              <td>{history.changed_at}</td>
                              <td>{history.status}</td>
                            </tr>
                          );
                        })}
                    </thead>
                  </MiniTable>
                </td>
              </tr>
            </tbody>
          </Table>
        </InfoBody>
      </MoreInfoBox>
    </Fragment>
  );
}

export default MoreInfo;

const MoreInfoBox = styled.div`
  margin-bottom: 25px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const InfoTitle = styled.div`
  display: flex;
  height: 38px;
  padding: 10px 10px 2px 10px;
  background-color: #eee;
  font-size: 13px;
  svg {
    margin-right: 5px;
    width: 13px;
    height: 13px;
  }
`;

const InfoBody = styled.div`
  padding: 10px;
`;

const Table = styled.table`
  width: 100%;
  border: 1px solid #ddd;
  line-height: 1.5;
  border-collapse: collapse;
  font-size: 13px;
  span {
    margin-left: 5px;
    vertical-align: middle;
    color: red;
  }
  tbody {
    vertical-align: middle;
    background-color: #fff;
    tr {
      &:nth-child(even) {
        background-color: #f9f9f9;
      }
    }
    th,
    td {
      border: 1px solid #ddd;
    }
    td {
      padding: 8px;
      vertical-align: middle;
      &:first-child {
        width: 252px;
      }
    }
  }
  textarea {
    width: 41%;
    height: 100px;
    padding: 10px;
    border: 1px solid #e5e5e5;
    border-radius: 4px;
    font-size: 14px;
    line-height: 1.5;
  }
`;

const ExtraInfo = styled.div`
  ${({ theme }) => theme.flex(null, 'center')}
  color: #1e90ff;
  svg {
    margin-right: 5px;
  }
`;

const IconInput = styled.div`
  ${({ theme }) => theme.flex(null, 'center')}
  margin: 10px 0;
  padding: 13px 16px;
  width: 41%;
  background-color: #fff;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  svg {
    width: 15px;
    height: 15px;
    color: gray;
  }
  input {
    margin-left: 10px;
  }
  &.ErrorInput {
    border: 1px solid #b94a48;
  }
`;

const MiniTable = styled.table`
  width: 100%;
  border: 1px solid #ddd;
  /* thead {
    
    tr {
      &:nth-child(even) {
        background-color: #f9f9f9;
      }
    }
    td {
      padding: 8px;
      font-size: 13px;
      &:first-child {
        width: 65%;
      }
    }
  } */
`;
