import React from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { FaUserAlt } from 'react-icons/fa';
import { AiOutlineWarning, AiOutlineMail } from 'react-icons/ai';
import { ImPhone } from 'react-icons/im';
// import ImgBox from '../../Components/ImgBox/ImgBox';

function MoreInfo() {
  const { register, errors, watch, handleSubmit } = useForm({ mode: 'submit' });
  const onSubmit = (data) => console.log(data);

  return (
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
                {/* <ImgBox /> */}
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
                    배경이미지는 <b>1200 * 850</b> 사이즈 이상으로 등록해주세요.
                  </p>
                </ExtraInfo>
                <ExtraInfo>
                  <AiOutlineWarning />
                  <p>
                    확장자는 <b>jpg, jpeg, png</b> 만 가능하며, 허용 가능한 최대
                    파일사이즈 크기는 <b>5MB</b> 입니다.
                  </p>
                </ExtraInfo>
              </td>
            </tr>
            <tr>
              <td>
                셀러 한 줄 소개<span>*</span>
              </td>
              <td>
                <IconInput
                  className={errors.sellerIntroduction && 'ErrorInput'}
                >
                  <FaUserAlt
                    color={errors.sellerIntroduction ? '#b94a48' : null}
                  />
                  <input
                    name='sellerIntroduction'
                    type='text'
                    placeholder='셀러 한 줄 소개'
                    ref={register({
                      required: '필수 입력항목 입니다. ',
                    })}
                  />
                </IconInput>
                {errors.sellerIntroduction && (
                  <p>{errors.sellerIntroduction.message}</p>
                )}
              </td>
            </tr>
            <tr>
              <td>셀러 상세 소개</td>
              <td>
                <textarea placeholder='셀러 상세 소개' />
                <ExtraInfo>
                  <AiOutlineWarning />
                  <p>셀러 상세 소개 글은 최소10자 이상 입니다.</p>
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
                    name='managerName'
                    type='text'
                    placeholder='담당자명'
                    ref={register({
                      required: '필수 입력항목 입니다. ',
                    })}
                  />
                </IconInput>
                <IconInput className={errors.managerPhone && 'ErrorInput'}>
                  <ImPhone color={errors.managerPhone ? '#b94a48' : null} />
                  <input
                    name='managerPhone'
                    type='text'
                    placeholder='담당자 핸드폰 번호'
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
                    name='managerEmail'
                    type='text'
                    placeholder='담당자 이메일'
                    ref={register({
                      required: '필수 입력항목 입니다. ',
                    })}
                  />
                </IconInput>
              </td>
            </tr>
            <tr>
              <td>
                고객센터<span>*</span>
              </td>
              <td>
                <IconInput
                  className={errors.customerCenterPhone && 'ErrorInput'}
                >
                  <ImPhone
                    color={errors.customerCenterPhone ? '#b94a48' : null}
                  />
                  <input
                    name='customerCenterPhone'
                    type='text'
                    placeholder='고객센터 전화번호'
                    ref={register({
                      required: '필수 입력항목 입니다. ',
                    })}
                  />
                </IconInput>
              </td>
            </tr>
            <tr>
              <td>
                택배 주소 <span>*</span>
              </td>
            </tr>
          </tbody>
        </Table>
      </InfoBody>
    </MoreInfoBox>
  );
}

export default MoreInfo;

const MoreInfoBox = styled.div`
  margin-bottom: 25px;
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
  }
  tr {
    &:nth-child(odd) {
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
